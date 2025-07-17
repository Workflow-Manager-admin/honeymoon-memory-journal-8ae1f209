const userModel = require('../models/user');

/**
 * PUBLIC_INTERFACE
 * Express middleware to require authenticated user via a simple bearer token for this demo.
 * In production, use JWT or session.
 */
function requireAuth(req, res, next) {
  // Authorization: Bearer <user-id>
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid auth header' });
  }
  const token = authHeader.slice('Bearer '.length);

  const user = userModel.getUserById(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  req.user = user;
  next();
}

module.exports = { requireAuth };
