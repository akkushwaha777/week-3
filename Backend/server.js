const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const seedData = require('./utils/seeder');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    seedData();
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the  IT Backend API (Modular Structure)');
});

app.listen(PORT, () => {
    console.log(`\n  IT Backend is running on http://localhost:${PORT}\n`);
});
