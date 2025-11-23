const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const Activity = require('../models/Activity');
const fs = require('fs'); 

// ROUTE 1: CREATE (POST) Activity 
router.post(
  '/',
  protect, 
  upload.single('documentPhoto'), 
  async (req, res) => {
    try {
      const { title, description, date, location, guides } = req.body;

      
      const documentPhoto = req.file ? req.file.path : null;

      const activity = new Activity({
        title,
        description,
        date,
        location,
        guides: Array.isArray(guides) ? guides : (guides ? [guides] : []), 
        documentPhoto,
        createdBy: req.user.id, 
      });

      const createdActivity = await activity.save();
      res.status(201).json(createdActivity);
    } catch (error) {
      console.error(error);
      
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      res.status(400).json({ message: 'Gagal membuat kegiatan.', details: error.message });
    }
  }
);

// --- ROUTE 2: READ ALL (GET) Activities ---
router.get('/', protect, async (req, res) => {
  try {
    const activities = await Activity.find({})
      .populate('createdBy', 'name email')
      .populate('guides', 'name email')
      .sort({ date: 1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// --- ROUTE 3: READ SINGLE (GET) Activity ---
router.get('/:id', protect, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('guides', 'name email');

    if (!activity) {
      return res.status(404).json({ message: 'Kegiatan tidak ditemukan.' });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// --- ROUTE 4: UPDATE (PUT) Activity ---
router.put(
  '/:id',
  protect,
  upload.single('documentPhoto'),
  async (req, res) => {
    const { title, description, date, location, guides } = req.body;
    let newDocumentPhoto = req.file ? req.file.path : undefined;

    try {
      const activity = await Activity.findById(req.params.id);

      if (!activity) {
        if (req.file) { fs.unlink(req.file.path, () => {}); }
        return res.status(404).json({ message: 'Kegiatan tidak ditemukan.' });
      }

      if (activity.createdBy.toString() !== req.user.id.toString()) {
        if (req.file) { fs.unlink(req.file.path, () => {}); }
        return res.status(401).json({ message: 'Tidak berhak mengubah kegiatan ini.' });
      }

      // Jika ada file baru di-upload, hapus file lama
      if (newDocumentPhoto && activity.documentPhoto) {
        fs.unlink(activity.documentPhoto, () => {}); 
      }
      
      // Update fields
      activity.title = title || activity.title;
      activity.description = description || activity.description;
      activity.date = date || activity.date;
      activity.location = location || activity.location;
      activity.guides = Array.isArray(guides) ? guides : (guides ? [guides] : activity.guides);
      
      // Jika ada file baru atau file lama dihapus dan diupload ulang
      if (req.file) {
          activity.documentPhoto = newDocumentPhoto;
      } else if (newDocumentPhoto === null) {
          // Jika user secara eksplisit meminta menghapus file lama
          activity.documentPhoto = undefined;
      }
      

      const updatedActivity = await activity.save();
      res.json(updatedActivity);

    } catch (error) {
      console.error(error);
      if (req.file) { fs.unlink(req.file.path, () => {}); }
      res.status(400).json({ message: 'Gagal mengupdate kegiatan.', details: error.message });
    }
  }
);

// --- ROUTE 5: DELETE (DELETE) Activity ---
router.delete('/:id', protect, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(440).json({ message: 'Kegiatan tidak ditemukan.' });
    }

    if (activity.createdBy.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: 'Tidak berhak menghapus kegiatan ini.' });
    }

    if (activity.documentPhoto) {
      fs.unlink(activity.documentPhoto, (err) => {
        if (err) console.error("Gagal menghapus file:", err);
      });
    }

    await Activity.deleteOne({ _id: req.params.id });

    res.json({ message: 'Kegiatan berhasil dihapus.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;