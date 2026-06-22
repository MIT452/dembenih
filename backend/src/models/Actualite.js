const mongoose = require('mongoose');

const actualiteSchema = mongoose.Schema({
    titre: { type: String, required: [true, 'Veuillez ajouter un titre'] },
    contenu: { type: String, required: [true, 'Veuillez ajouter un contenu'] },
    categorie: { type: String, default: 'INFO' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1598977122420-091920678d2b?auto=format&fit=crop&w=1200&q=80' },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('Actualite', actualiteSchema);
