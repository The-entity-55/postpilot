const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['instagram', 'facebook', 'twitter']
  },
  displayName: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  config: {
    clientId: String,
    clientSecret: String,
    redirectUri: String,
    authUrl: String,
    tokenUrl: String,
    apiBaseUrl: String,
    scope: [String]
  },
  // Added token management fields
  tokens: {
    accessToken: {
      type: String,
      select: false // This ensures the token isn't included in queries by default
    },
    refreshToken: {
      type: String,
      select: false
    },
    expiresAt: Date
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

// Update the updatedAt timestamp before saving
platformSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to safely get platform config without sensitive data
platformSchema.methods.getPublicConfig = function() {
  const publicData = this.toObject();
  delete publicData.config.clientSecret;
  delete publicData.tokens;
  return publicData;
};

const Platform = mongoose.model('Platform', platformSchema);

module.exports = Platform;