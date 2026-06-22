require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const checkPasswords = async () => {
    try {
        console.log('🔄 Connexion à MongoDB...');
        require('dotenv').config({ path: path.join(__dirname, '../.env') });
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');
        
        console.log('🔄 Vérification des mots de passe...');
        const users = await User.find();
        for (const user of users) {
            console.log(`\nUtilisateur: ${user.email}`);
            console.log(`Mot de passe hashé: ${user.password}`);
            const match = await bcrypt.compare('123456', user.password);
            console.log(`Match avec '123456'? ${match ? '✅ Oui' : '❌ Non'}`);
        }
        
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur: ${error.message}`);
        process.exit(1);
    }
};

checkPasswords();
