//
// Gallery/Multimedia store (uploaded files) - in-memory placeholder for demo
//
const { v4: uuidv4 } = require('uuid');

class GalleryStore {
  constructor() {
    this.files = new Map();
  }

  // PUBLIC_INTERFACE
  saveFile({ userId, originalName, path, mimetype, size }) {
    const id = uuidv4();
    const file = {
      id,
      userId,
      originalName,
      path,
      mimetype,
      size,
      uploadedAt: new Date(),
    };
    this.files.set(id, file);
    return { ...file };
  }

  // PUBLIC_INTERFACE
  getFile(fileId, userId) {
    const file = this.files.get(fileId);
    if (!file || file.userId !== userId) return null;
    return { ...file };
  }

  // PUBLIC_INTERFACE
  listFiles(userId) {
    return [...this.files.values()].filter(f => f.userId === userId).map(f => ({ ...f }));
  }
}

module.exports = new GalleryStore();
