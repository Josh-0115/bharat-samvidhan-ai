const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { sendMessage, getHistory } = require('../controllers/chatController');

// @route   POST api/chat/message
// @desc    Send message to AI
router.post('/message', auth, sendMessage);

// @route   GET api/chat/history
// @desc    Get all chat sessions
router.get('/history', auth, getHistory);

module.exports = router;