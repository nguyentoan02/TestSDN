const express = require('express');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Thêm dòng này
const PORT = process.env.PORT || 5000;
const app = express();
require('dotenv').config();
app.use(express.json());

// Kết nối MongoDB
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Sử dụng Routes
app.use('/api', quizRoutes);
app.use('/api', questionRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes); // Thêm dòng này

module.exports = app;