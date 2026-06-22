const Projet = require('../models/Projet');
const asyncHandler = require('express-async-handler');

// @desc    Get all projets
// @route   GET /api/projets
// @access  Public
const getProjets = asyncHandler(async (req, res) => {
    const projets = await Projet.find({ isActive: true });
    res.status(200).json({ success: true, data: projets });
});

// @desc    Create a projet
// @route   POST /api/projets
// @access  Private/Admin
const createProjet = asyncHandler(async (req, res) => {
    const { title, description, icon, category, status, image, isActive } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Veuillez remplir les champs obligatoires');
    }

    const projet = await Projet.create({
        title,
        description,
        icon: icon || 'Home',
        category: category || 'Urbanisme',
        status: status || 'En cours',
        image,
        isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({ success: true, data: projet });
});

// @desc    Update a projet
// @route   PUT /api/projets/:id
// @access  Private/Admin
const updateProjet = asyncHandler(async (req, res) => {
    const projet = await Projet.findById(req.params.id);

    if (!projet) {
        res.status(404);
        throw new Error('Projet non trouvé');
    }

    const updated = await Projet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
});

// @desc    Delete a projet
// @route   DELETE /api/projets/:id
// @access  Private/Admin
const deleteProjet = asyncHandler(async (req, res) => {
    const projet = await Projet.findById(req.params.id);

    if (!projet) {
        res.status(404);
        throw new Error('Projet non trouvé');
    }

    await projet.deleteOne();
    res.status(200).json({ success: true, message: 'Projet supprimé' });
});

module.exports = {
    getProjets,
    createProjet,
    updateProjet,
    deleteProjet
};
