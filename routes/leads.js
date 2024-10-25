const express = require('express');
const { getLeads, addLead } = require('../controllers/leadController');
const router = express.Router();

router.get('/', getLeads);
router.post('/', addLead);

module.exports = router;
