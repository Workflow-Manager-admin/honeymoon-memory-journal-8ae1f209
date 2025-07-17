const userModel = require('../models/user');

/**
 * PUBLIC_INTERFACE
 * User registration, login, and profile
 */
class UserController {
  async register(req, res) {
    const { email, password, name, avatarUrl } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    if (userModel.getUserByEmail(email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const user = userModel.createUser({ email, password, name, avatarUrl });
    return res.status(201).json({ user });
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = userModel.verifyUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // In production, return JWT.
    return res.status(200).json({ user, token: user.id });
  }

  async logout(req, res) {
    /** 
     * PUBLIC_INTERFACE
     * Log out user - for stateless demo, this is a client-side removal, but route exists for completeness.
     */
    // In a stateless system, to "logout", client just deletes their token. You might blacklist on backend if using JWT.
    // Here just respond ok.
    return res.status(204).send();
  }

  async profile(req, res) {
    return res.status(200).json({ user: req.user });
  }

  async updateProfile(req, res) {
    const { profile } = req.body;
    if (!profile) return res.status(400).json({ error: 'Profile update payload required' });
    const updated = userModel.updateUserProfile(req.user.id, profile);
    return res.status(200).json({ user: updated });
  }
}

module.exports = new UserController();
