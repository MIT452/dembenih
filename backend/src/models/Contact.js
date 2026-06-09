const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"]
    },
    phone: {
        type: String
    },
    service: {
        type: String,
        default: 'Général'
    },
    message: {
        type: String,
        required: [true, 'Le message est obligatoire']
    },
    image: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['unread', 'read', 'replied'],
        default: 'unread'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
