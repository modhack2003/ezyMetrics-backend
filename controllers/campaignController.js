const Campaign = require('../models/campaign');

// Fetch all campaigns
const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: "Error fetching campaigns", error });
    }
};

// Add a new campaign
const addCampaign = async (req, res) => {
    const { name, budget, leadsAcquired } = req.body;
    try {
        const newCampaign = new Campaign({ name, budget, leadsAcquired });
        await newCampaign.save();
        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(500).json({ message: "Error adding campaign", error });
    }
};

module.exports = { getCampaigns, addCampaign };
