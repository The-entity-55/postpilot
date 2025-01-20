const express = require('express');
const router = express.Router();
const { requireUser } = require('./middleware/auth');
const UserPlatformService = require('../services/userPlatformService');

console.log('[socialRoutes] Initializing social routes...');
console.log("[socialRoutes] Routes being initialized");

// Get user's social media connections
router.get('/connections', requireUser, async (req, res) => {
  console.log("[socialRoutes] Received request for connections");

  try {
    console.log(`[SOCIAL] Getting connections - User:`, {
      userId: req.user?.id,
      headers: req.headers
    });
    const connections = await UserPlatformService.getUserConnections(req.user.id);
    console.log(`[SOCIAL] Found connections:`, connections);
    res.json({ connections });
  } catch (error) {
    console.error('[SOCIAL] Error getting connections:', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;