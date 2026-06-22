const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre du projet est obligatoire']
    },
    description: {
        type: String,
        required: [true, 'La description est obligatoire']
    },
    icon: {
        type: String,
        default: 'Home'
    },
    category: {
        type: String,
        default: 'Urbanisme'
    },
    status: {
        type: String,
        enum: ['Planifié', 'En cours', 'Terminé'],
        default: 'En cours'
    },
    image: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Projet', projetSchema);
