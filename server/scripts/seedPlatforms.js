require('dotenv').config();
const mongoose = require('mongoose');
const Platform = require('../models/Platform');
const { connectDB } = require('../config/database');
const { encrypt } = require('../utils/tokenManager');

const platforms = [
  {
    name: 'instagram',
    displayName: 'Instagram',
    enabled: true,
    config: {
      clientId: process.env.INSTAGRAM_CLIENT_ID || 'mock-instagram-client-id',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || 'mock-instagram-client-secret',
      redirectUri: process.env.INSTAGRAM_REDIRECT_URI || 'http://localhost:3000/api/auth/instagram/callback',
      authUrl: 'https://api.instagram.com/oauth/authorize',
      tokenUrl: 'https://api.instagram.com/oauth/access_token',
      apiBaseUrl: 'https://graph.instagram.com',
      scope: ['user_profile', 'user_media']
    },
    tokens: {
      accessToken: process.env.INSTAGRAM_ACCESS_TOKEN ?
        encrypt(process.env.INSTAGRAM_ACCESS_TOKEN) :
        null,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
    }
  },
  // ... Facebook and Twitter configurations remain the same ...
];

const seedPlatforms = async () => {
  try {
    await connectDB();
    await Platform.deleteMany({});
    console.log('Cleared existing platforms');

    for (const platformData of platforms) {
      const platform = new Platform(platformData);
      await platform.save();
      console.log(`Created platform: ${platformData.displayName}`);
    }

    console.log('Platform seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding platforms:', error);
    process.exit(1);
  }
};

seedPlatforms();