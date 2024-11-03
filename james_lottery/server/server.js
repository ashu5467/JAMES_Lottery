const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const lotteryRoutes = require('./routes/lotteryRoutes');
const userRoutes = require('./routes/userRoutes');
const resultRoutes = require('./routes/resultRoutes');
const winnerRoutes = require('./routes/winnerRoutes');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: '*', // This allows requests from any origin
}));
app.use(express.json());

// Routes
app.use('/api/lotteries', lotteryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/winners', winnerRoutes);
app.use("/api/auth", authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/tickets', ticketRoutes);
app.use('/api', ticketRoutes);
app.use('/api', lotteryRoutes);
app.use('/api', lotteryRoutes);
app.use('/api/lotteries', lotteryRoutes); // Use only this to avoid conflicts



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
