const Demarche = require('../models/Demarche');
const asyncHandler = require('express-async-handler');

// @desc    Get all démarches
// @route   GET /api/demarches
// @access  Public
const getDemarches = asyncHandler(async (req, res) => {
    const demarches = await Demarche.find({ isActive: true });
    res.status(200).json({ success: true, data: demarches });
});

// @desc    Create a démarche
// @route   POST /api/demarches
// @access  Private/Admin
const createDemarche = asyncHandler(async (req, res) => {
    const { title, description, icon, category, link, isActive } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Veuillez remplir les champs obligatoires');
    }

    const demarche = await Demarche.create({
        title,
        description,
        icon: icon || 'FileText',
        category: category || 'Général',
        link,
        isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({ success: true, data: demarche });
});

// @desc    Update a démarche
// @route   PUT /api/demarches/:id
// @access  Private/Admin
const updateDemarche = asyncHandler(async (req, res) => {
    const demarche = await Demarche.findById(req.params.id);

    if (!demarche) {
        res.status(404);
        throw new Error('Démarche non trouvée');
    }

    const updated = await Demarche.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
});

// @desc    Delete a démarche
// @route   DELETE /api/demarches/:id
// @access  Private/Admin
const deleteDemarche = asyncHandler(async (req, res) => {
    const demarche = await Demarche.findById(req.params.id);

    if (!demarche) {
        res.status(404);
        throw new Error('Démarche non trouvée');
    }

    await demarche.deleteOne();
    res.status(200).json({ success: true, message: 'Démarche supprimée' });
});

module.exports = {
    getDemarches,
    createDemarche,
    updateDemarche,
    deleteDemarche
};
