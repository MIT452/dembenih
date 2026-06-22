const express = require('express');
const router = express.Router();
const { getDemarches, createDemarche, updateDemarche, deleteDemarche } = require('../controllers/demarcheController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
    .get(getDemarches)
    .post(protect, adminOnly, createDemarche);

router.route('/:id')
    .put(protect, adminOnly, updateDemarche)
    .delete(protect, adminOnly, deleteDemarche);

module.exports = router;
