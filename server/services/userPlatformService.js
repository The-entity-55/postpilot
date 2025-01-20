const UserPlatform = require('../models/UserPlatform');
const Platform = require('../models/Platform');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

class UserPlatformService {
  static async getUserConnections(userId) {
    try {
      logger.info(`Getting connected platforms for user ${userId}`);
      
      console.log('Database connection state:', mongoose.connection.readyState);
      console.log('Querying platforms for userId:', userId);

      // Get all platforms first
      const platforms = await Platform.find({ enabled: true });
      logger.debug(`Found ${platforms.length} enabled platforms`);

      // Get user's connected platforms
      const userConnections = await UserPlatform.find({ userId });
      logger.debug(`Found ${userConnections.length} connections for user ${userId}`);

      // Map platforms to include connection status
      const connectedPlatforms = platforms.map(platform => {
        const connection = userConnections.find(
          conn => conn.platformId.toString() === platform._id.toString()
        );

        return {
          platform: platform.name,
          connected: !!connection,
          username: connection?.username || undefined
        };
      });

      logger.info(`Successfully retrieved platform connections for user ${userId}`);
      return connectedPlatforms;

    } catch (error) {
      logger.error('Error getting user connections:', {
        userId,
        error: error.stack
      });
      throw new Error(`Error getting user connections: ${error.message}`);
    }
  }
}

module.exports = UserPlatformService;