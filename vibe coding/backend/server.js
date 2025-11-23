const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors()); // Mengizinkan akses dari frontend (React)
app.use(express.json()); // Body parser untuk menerima JSON

// Route Utama
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Route Autentikasi
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));