const mongoose = require('mongoose');

const userPlatformSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platformId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Platform',
    required: true
  },
  connected: {
    type: Boolean,
    default: true
  },
  username: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true,
    select: false // Don't include in regular queries
  },
  refreshToken: {
    type: String,
    select: false
  },
  tokenExpiresAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
userPlatformSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const UserPlatform = mongoose.model('UserPlatform', userPlatformSchema);

module.exports = UserPlatform;