import api from './api';

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  timezone: string;
}

// Description: Get user settings
// Endpoint: GET /api/settings
// Request: {}
// Response: { settings: UserSettings }
export const getUserSettings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        settings: {
          notifications: {
            email: true,
            push: true,
            desktop: false,
          },
          theme: 'system',
          timezone: 'UTC',
        },
      });
    }, 500);
  });
};

// Description: Update user settings
// Endpoint: PUT /api/settings
// Request: { settings: Partial<UserSettings> }
// Response: { success: boolean, message: string }
export const updateUserSettings = (settings: Partial<UserSettings>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Settings updated successfully',
      });
    }, 500);
  });
};