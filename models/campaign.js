const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: String,
    budget: Number,
    leadsAcquired: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
