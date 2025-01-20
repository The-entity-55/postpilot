require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { connectDB } = require('../config/database');

const users = [
  {
    email: 'admin@postpilot.com',
    password: 'Admin123!',
    role: 'admin',
    name: 'Admin User',
    permissions: ['manage_users', 'view_analytics', 'manage_social', 'manage_settings']
  },
  {
    email: 'demo@postpilot.com',
    password: 'Demo123!',
    role: 'user',
    name: 'Demo User',
    permissions: ['view_analytics', 'manage_social']
  }
];

const seedUsers = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create new users
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${userData.email}`);
    }

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();