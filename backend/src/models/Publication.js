const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Veuillez ajouter un titre'] 
    },
    content: { 
        type: String, 
        required: [true, 'Veuillez ajouter un contenu'] 
    },
    type: {
        type: String,
        required: true,
        enum: ['actualite', 'evenement', 'projet', 'annonce', 'information'],
        default: 'actualite'
    },
    category: { 
        type: String, 
        required: true,
        enum: [
            'Santé & Solidarité', 'Environnement', 'Jeunesse', 'Culture', 
            'Sécurité', 'Services publics', 'Vie citoyenne', 'Urbanisme', 
            'Éducation', 'Développement local', 'Général'
        ],
        default: 'Général'
    },
    image: { 
        type: String, 
        default: 'https://images.unsplash.com/photo-1598977122420-091920678d2b?auto=format&fit=crop&w=1200&q=80' 
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String
    }],
    eventDate: {
        type: Date
    },
    eventLocation: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Publication', publicationSchema);
