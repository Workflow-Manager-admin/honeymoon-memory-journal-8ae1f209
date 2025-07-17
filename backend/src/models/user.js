//
// User model - in-memory for this template, adapt to database as needed
//
const { v4: uuidv4 } = require('uuid');

class UserStore {
  constructor() {
    this.users = new Map();
  }

  // PUBLIC_INTERFACE
  createUser({ email, password, name, avatarUrl }) {
    /** Create and store a new user. Passwords should be hashed in production. */
    const id = uuidv4();
    const user = {
      id,
      email,
      password, // TODO: hash in production
      name,
      avatarUrl: avatarUrl || '',
      createdAt: new Date(),
      profile: {
        bio: '',
        favorites: [],
        whatWeLearned: '',
      },
      settings: {},
    };
    this.users.set(id, user);
    return { ...user, password: undefined };
  }

  // PUBLIC_INTERFACE
  getUserByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) return { ...user, password: undefined };
    }
    return null;
  }

  // PUBLIC_INTERFACE
  getUserById(userId) {
    const user = this.users.get(userId);
    if (!user) return null;
    return { ...user, password: undefined };
  }

  // PUBLIC_INTERFACE
  verifyUser(email, password) {
    for (const user of this.users.values()) {
      // Danger: No hash - for POC only
      if (user.email === email && user.password === password) {
        return { ...user, password: undefined };
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  updateUserProfile(userId, profile) {
    const user = this.users.get(userId);
    if (!user) return null;
    user.profile = { ...user.profile, ...profile };
    return { ...user, password: undefined };
  }
}

module.exports = new UserStore();
