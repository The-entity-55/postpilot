const UserService = require('../../services/userService.js');
const jwt = require('jsonwebtoken');

const requireUser = (req, res, next) => {
  console.log('Auth middleware - headers:', req.headers);
  console.log('[AUTH] Checking authorization:', {
    header: req.headers.authorization,
    user: req.user
  });

  if (!req.headers.authorization) {
    console.log('Auth middleware - No authorization header');
    console.log('[AUTH] No authorization header');
    return res.status(403).json({ error: 'No authorization token' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('[AUTH] Authorization result:', {
      success: !!req.user,
      user: req.user
    });
    next();
  } catch (err) {
    console.log('[AUTH] Error verifying token:', {
      error: err.message,
      stack: err.stack
    });
    return res.status(403).json({ error: 'Authentication required' });
  }
};

module.exports = {
  requireUser,
};