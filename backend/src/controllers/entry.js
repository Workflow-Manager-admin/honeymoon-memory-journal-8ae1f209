const entryModel = require('../models/entry');
const { v4: uuidv4 } = require('uuid');

/**
 * PUBLIC_INTERFACE
 * Diary Entry CRUD, search/filter, sharing, privacy, favorites and map.
 */
class EntryController {
  async create(req, res) {
    const { title, content, photos, videos, date, location, isPublic, whatWeLearned } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    const entry = entryModel.createEntry({
      userId: req.user.id,
      title,
      content,
      photos,
      videos,
      date,
      location,
      isPublic,
      whatWeLearned,
    });
    return res.status(201).json({ entry });
  }

  async list(req, res) {
    const filterDate = req.query.date;
    const favorite = typeof req.query.favorite !== 'undefined' ? req.query.favorite === 'true' : undefined;
    const entries = entryModel.listEntriesByUser(req.user.id, { filterDate, favorite });
    return res.status(200).json({ entries });
  }

  async get(req, res) {
    const entry = entryModel.getEntry(req.params.id, req.user.id);
    if (!entry) return res.status(404).json({ error: 'Diary entry not found or unauthorized' });
    return res.status(200).json({ entry });
  }

  async update(req, res) {
    const update = req.body;
    const entry = entryModel.updateEntry(req.params.id, req.user.id, update);
    if (!entry) return res.status(404).json({ error: 'Cannot update entry' });
    return res.status(200).json({ entry });
  }

  async delete(req, res) {
    const ok = entryModel.deleteEntry(req.params.id, req.user.id);
    if (!ok) return res.status(404).json({ error: 'Entry not found or unauthorized' });
    return res.status(204).send();
  }

  async search(req, res) {
    const { text, from, to, favorite } = req.query;
    const results = entryModel.searchEntries(req.user.id, {
      text,
      from,
      to,
      favorite: favorite ? favorite === 'true' : undefined,
    });
    return res.status(200).json({ results });
  }

  async share(req, res) {
    // Set or return a public share token for an entry (read-only)
    const id = req.params.id;
    let entry = entryModel.getEntry(id, req.user.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    if (!entry.isPublic) return res.status(400).json({ error: 'Entry must be public to share' });
    if (!entry.sharedToken) entry = entryModel.updateEntry(id, req.user.id, { sharedToken: uuidv4() });
    return res.status(200).json({ shareUrl: `/api/entries/shared/${entry.sharedToken}` });
  }

  async getShared(req, res) {
    const entry = entryModel.getSharedEntry(req.params.token);
    if (!entry) return res.status(404).json({ error: 'Shared entry not found' });
    return res.status(200).json({ entry });
  }
}

module.exports = new EntryController();
