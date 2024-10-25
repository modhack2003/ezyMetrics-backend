const express = require('express');
const mongoose = require('mongoose');

const { runETL } = require('./services/etlService'); // Import the ETL service

// Load environment variables
require('dotenv').config();


console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);



// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Import routes
const leadRoutes = require('./routes/leads');
const campaignRoutes = require('./routes/campaigns');
const reportRoutes = require('./routes/reports');
const mockApiRoutes = require('./routes/mockApi')

// Mount routes
app.use('/api/leads', leadRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api', mockApiRoutes)

// MongoDB connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");

        // Run ETL process after DB connection is established
        runETL().then(() => {
            console.log("ETL process completed");
        }).catch(err => {
            console.error("ETL process error: ", err);
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("DB connection error: ", err);
    });


    
module.exports = app;
