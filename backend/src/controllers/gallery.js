const galleryModel = require('../models/gallery');
const path = require('path');

/**
 * PUBLIC_INTERFACE
 * Handles gallery (uploads)
 */
class GalleryController {
  async upload(req, res) {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const saved = galleryModel.saveFile({
      userId: req.user.id,
      originalName: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    return res.status(201).json({ file: saved });
  }

  async list(req, res) {
    const files = galleryModel.listFiles(req.user.id);
    return res.status(200).json({ files });
  }

  async get(req, res) {
    const file = galleryModel.getFile(req.params.id, req.user.id);
    if (!file) return res.status(404).json({ error: 'File not found or unauthorized' });
    res.sendFile(path.resolve(file.path));
  }
}

module.exports = new GalleryController();
