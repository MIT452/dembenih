const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre du service est obligatoire']
    },
    desc: {
        type: String,
        required: [true, 'La description courte est obligatoire']
    },
    fullDesc: {
        type: String
    },
    icon: {
        type: String,
        default: 'Activity'
    },
    img: {
        type: String,
        default: 'https://images.unsplash.com/photo-1598977122420-091920678d2b?auto=format&fit=crop&w=1200&q=80'
    },
    category: {
        type: String,
        required: [true, 'La catégorie est obligatoire']
    },
    location: {
        type: String
    },
    hours: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    benefits: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
