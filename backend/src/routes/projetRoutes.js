const express = require('express');
const router = express.Router();
const { getProjets, createProjet, updateProjet, deleteProjet } = require('../controllers/projetController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProjets)
    .post(protect, adminOnly, createProjet);

router.route('/:id')
    .put(protect, adminOnly, updateProjet)
    .delete(protect, adminOnly, deleteProjet);

module.exports = router;
