const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const cloudinary = require('cloudinary').v2;

/**
 * @desc    Upload a single file to Cloudinary
 * @route   POST /api/upload
 * @access  Public (pour le moment, pour permettre l'inscription avec photo)
 */
router.post('/', upload.single('image'), async (req, res, next) => {
    if (!req.file) {
        res.status(400);
        return next(new Error('Veuillez télécharger un fichier'));
    }

    try {
        const fileData = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(fileData, { folder: 'dembeni' });

        res.status(200).json({
            success: true,
            message: 'Image téléchargée avec succès',
            data: result.secure_url,
            public_id: result.public_id
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
