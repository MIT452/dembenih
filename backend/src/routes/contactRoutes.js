const express = require('express');
const router = express.Router();
const { sendContactEmail, getAllMessages, deleteMessage, getMyMessages } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', sendContactEmail);
router.get('/my', protect, getMyMessages);
router.get('/all', protect, adminOnly, getAllMessages);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
