//
// Diary entry model - in-memory for demo, migrate to real DB for production
//
const { v4: uuidv4 } = require('uuid');

class EntryStore {
  constructor() {
    this.entries = new Map();
  }

  // PUBLIC_INTERFACE
  createEntry({ userId, title, content, photos, videos, date, location, isPublic, whatWeLearned }) {
    /** Create a new diary entry */
    const id = uuidv4();
    const entry = {
      id,
      userId,
      title,
      content: content || '',
      photos: photos || [],
      videos: videos || [],
      date: date || new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: !!isPublic,
      whatWeLearned: whatWeLearned || '',
      location: location || null,
      favorite: false,
      sharedToken: null,
    };
    this.entries.set(id, entry);
    return { ...entry };
  }

  // PUBLIC_INTERFACE
  updateEntry(entryId, userId, update) {
    const entry = this.entries.get(entryId);
    if (!entry || entry.userId !== userId) return null;
    Object.assign(entry, update, { updatedAt: new Date() });
    return { ...entry };
  }

  // PUBLIC_INTERFACE
  getEntry(entryId, userId) {
    const entry = this.entries.get(entryId);
    if (!entry) return null;
    if (!entry.isPublic && entry.userId !== userId) return null;
    return { ...entry };
  }

  // PUBLIC_INTERFACE
  listEntriesByUser(userId, opts = {}) {
    let entries = [...this.entries.values()].filter(e => e.userId === userId);
    if (opts.filterDate) {
      entries = entries.filter(e => e.date && e.date.startsWith(opts.filterDate));
    }
    if (typeof opts.favorite === 'boolean') {
      entries = entries.filter(e => !!e.favorite === !!opts.favorite);
    }
    // Add more filters as needed
    return entries.map(e => ({ ...e }));
  }

  // PUBLIC_INTERFACE
  deleteEntry(entryId, userId) {
    const entry = this.entries.get(entryId);
    if (!entry || entry.userId !== userId) return false;
    this.entries.delete(entryId);
    return true;
  }

  // PUBLIC_INTERFACE
  searchEntries(userId, { text, from, to, favorite }) {
    let entries = [...this.entries.values()].filter(e => e.userId === userId);
    if (text) {
      const q = text.toLowerCase();
      entries = entries.filter(e => (e.title + e.content).toLowerCase().includes(q));
    }
    if (from) entries = entries.filter(e => new Date(e.date) >= new Date(from));
    if (to) entries = entries.filter(e => new Date(e.date) <= new Date(to));
    if (typeof favorite === 'boolean') entries = entries.filter(e => !!e.favorite === !!favorite);
    return entries.map(e => ({ ...e }));
  }

  // PUBLIC_INTERFACE
  getSharedEntry(sharedToken) {
    for (const entry of this.entries.values()) {
      if (entry.sharedToken === sharedToken && entry.isPublic) return { ...entry };
    }
    return null;
  }
}

module.exports = new EntryStore();
