const mongoose = require('mongoose');

const demarcheSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre de la démarche est obligatoire']
    },
    description: {
        type: String,
        required: [true, 'La description est obligatoire']
    },
    icon: {
        type: String,
        default: 'FileText'
    },
    category: {
        type: String,
        default: 'Général'
    },
    link: {
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

module.exports = mongoose.model('Demarche', demarcheSchema);
