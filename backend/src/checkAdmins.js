require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');

const checkUsers = async () => {
    try {
        console.log('🔄 Chargement de l\'environnement...');
        require('dotenv').config({ path: path.join(__dirname, '../.env') });
        
        console.log('🔄 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');
        
        console.log('🔄 Liste des utilisateurs admin...');
        const users = await User.find({ role: 'admin' });
        console.log('✅ Utilisateurs admin trouvés :');
        users.forEach(user => {
            console.log(`- ${user.email} | ${user.firstname} ${user.lastname} | Status: ${user.status}`);
        });
        
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur : ${error.message}`);
        process.exit(1);
    }
};

checkUsers();
