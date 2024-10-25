const Lead = require('../models/lead');

// Fetch all leads
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leads", error });
    }
};

// Add a new lead
const addLead = async (req, res) => {
    const { name, email, status } = req.body;
    try {
        const newLead = new Lead({ name, email, status });
        await newLead.save();
        res.status(201).json(newLead);
    } catch (error) {
        res.status(500).json({ message: "Error adding lead", error });
    }
};

module.exports = { getLeads, addLead };
