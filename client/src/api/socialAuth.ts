import api from './api';

// Default platforms supported by the application
const DEFAULT_PLATFORMS = ['instagram', 'facebook', 'twitter'];

// Description: Get connected social media accounts
// Endpoint: GET /api/social/connections
// Request: {}
// Response: { connections: Array<{ platform: string, connected: boolean, username?: string }> }
export const getSocialConnections = async () => {
  try {
    console.log("[socialAuth] Starting to fetch connections");
    console.log("[socialAuth] Using default platforms:", DEFAULT_PLATFORMS);
    console.log("[socialAuth] Making API request to fetch social connections");
    const response = await api.get('/social/connections');
    console.log("[socialAuth] Received API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("[socialAuth] Error occurred:", error);
    throw error;
  }
};

// Description: Connect social media account
// Endpoint: POST /api/social/connect
// Request: { platform: string, credentials: { username: string, accessToken: string } }
// Response: { success: boolean, message: string, connection: { platform: string, connected: boolean, username: string } }
export const connectSocialAccount = (platform: string, credentials: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Successfully connected ${platform} account`,
        connection: {
          platform,
          connected: true,
          username: credentials.username
        }
      });
    }, 500);
  });
};

// Description: Disconnect social media account
// Endpoint: POST /api/social/disconnect
// Request: { platform: string }
// Response: { success: boolean, message: string }
export const disconnectSocialAccount = (platform: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Successfully disconnected ${platform} account`
      });
    }, 500);
  });
};