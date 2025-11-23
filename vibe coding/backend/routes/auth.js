const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Fungsi untuk membuat JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @route   POST /api/auth/register
// @desc    Register user baru
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Cek apakah user sudah ada
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User sudah terdaftar dengan email ini.' });
    }

    // 2. Buat user baru
    user = new User({ name, email, password });

    // 3. Hash Password (bcrypt)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Simpan ke database
    await user.save();

    // 5. Beri respons
    res.status(201).json({ 
      message: 'Registrasi berhasil',
      token: generateToken(user._id), 
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user dan dapatkan token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Cek email user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Kredensial tidak valid (Email).' });
    }

    // 2. Bandingkan Password (bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Kredensial tidak valid (Password).' });
    }

    // 3. Login berhasil, buat JWT
    res.json({
      message: 'Login berhasil',
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;