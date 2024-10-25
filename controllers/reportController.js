const fs = require('fs');
const path = require('path');
const { generatePDFReport } = require('../utils/reportGenerator'); // Adjusted import path
const Campaign = require('../models/campaign');

const generateReport = async (req, res) => {
    try {
        const campaigns = await Campaign.find();

        if (campaigns.length === 0) {
            console.log("No data found to generate report.");
            return res.status(404).send('No data found for report');
        }

        console.log('Data for PDF:', campaigns);

        const reportPath = path.join(__dirname, '../report.pdf');

        // Wait for the PDF generation to complete
        await generatePDFReport(campaigns, reportPath);

        // Send the PDF file to the user
        res.download(reportPath, 'report.pdf', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('Error generating report');
            }

            // Optional: Delete the file after download
            fs.unlink(reportPath, (err) => {
                if (err) console.error('Error deleting report file:', err);
            });
        });

    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).send('Error generating report');
    }
};

module.exports = { generateReport };
