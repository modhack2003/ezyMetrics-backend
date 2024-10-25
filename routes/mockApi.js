const express = require('express');
const router = express.Router();

// Dummy Data
const dummyLeads = [
    { name: "John Doe", email: "john@example.com", status: "new" },
    { name: "Jane Smith", email: "jane@example.com", status: "contacted" }
];

const dummyCampaigns = [
    { name: "Summer Campaign", budget: 5000, leadsAcquired: 120 },
    { name: "Winter Campaign", budget: 3000, leadsAcquired: 80 }
];

// Mock CRM API endpoints
router.get('/crm/leads', (req, res) => {
    res.json(dummyLeads);
});

router.get('/crm/campaigns', (req, res) => {
    res.json(dummyCampaigns);
});

module.exports = router;
