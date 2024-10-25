const fetch = require('node-fetch');
const Lead = require('../models/lead');
const Campaign = require('../models/campaign');
const { sendEmail, sendLeadAlert } = require('./emailService'); // Import the email service

const runETL = async () => {
    try {
        console.log('Starting ETL process...');

        // Fetch leads from the mock API
        console.log('Fetching leads from the mock API...');
        const leadsResponse = await fetch('http://localhost:3000/api/crm/leads');
        const leadsData = await leadsResponse.json();

        // Insert leads into the database
        console.log('Inserting leads into the database...');
        await Lead.insertMany(leadsData);
        console.log('Leads Loaded Successfully');

        // Send email notification after leads are loaded
        await sendEmail('bikram20031213dey@gmail.com', 'New Leads Added', 'New leads have been successfully added to the database.');

        // Check if the number of leads exceeds a threshold for alerts
        const leadCount = await Lead.countDocuments(); // Count the total number of leads
        await sendLeadAlert(leadCount); // Send alert if conditions are met

        // Fetch campaigns from the mock API
        console.log('Fetching campaigns from the mock API...');
        const campaignsResponse = await fetch('http://localhost:3000/api/crm/campaigns');
        const campaignsData = await campaignsResponse.json();

        // Insert campaigns into the database
        console.log('Inserting campaigns into the database...');
        await Campaign.insertMany(campaignsData);
        console.log('Campaigns Loaded Successfully');

        // You can also send an email notification after campaigns are loaded if needed
        // await sendEmail('recipient@example.com', 'New Campaigns Added', 'New campaigns have been successfully added to the database.');

        console.log('ETL process completed.');
    } catch (error) {
        console.error('Error during ETL process:', error);
    }
};

module.exports = { runETL };
