const express = require('express');
const Campaign = require('../models/campaign');
const router = express.Router();

router.get('/', async (req, res) => {
    const campaigns = await Campaign.find();
    res.json(campaigns);
});

module.exports = router;
