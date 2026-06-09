const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

/**
 * @desc    Upload a single file
 * @route   POST /api/upload
 * @access  Public (pour le moment, pour permettre l'inscription avec photo)
 */
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('Veuillez télécharger un fichier');
    }

    res.status(200).json({
        success: true,
        message: 'Image téléchargée avec succès',
        data: `/${req.file.path}`
    });
});

module.exports = router;
