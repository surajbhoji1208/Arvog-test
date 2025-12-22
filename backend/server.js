const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models'); // Imports from models/index.js

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Sync Database and Start Server
sequelize.sync({ alter: true }).then(() => {
    console.log('Database connected and synced.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
