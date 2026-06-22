require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');

const createCustomAdmin = async () => {
    try {
        console.log('🔄 Chargement de l\'environnement...');
        require('dotenv').config({ path: path.join(__dirname, '../.env') });
        
        console.log('🔄 Connexion à MongoDB...');
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI n\'est pas défini dans le fichier .env');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');
        
        const email = 'admin@test.com';
        const password = '123456';
        
        console.log(`🔄 Vérification du compte admin : ${email}`);
        
        let admin = await User.findOne({ email });

        if (!admin) {
            admin = await User.create({
                firstname: 'Test',
                lastname: 'Admin',
                email: email,
                password: password,
                phone: '0000000000',
                address: 'Test Address',
                quartier: 'Test',
                role: 'admin',
                status: 'approved'
            });
            console.log(`✅ Compte Administrateur créé : ${email} / ${password}`);
        } else {
            admin.password = password;
            admin.role = 'admin';
            admin.status = 'approved';
            await admin.save();
            console.log(`✅ Compte Administrateur mis à jour : ${email} / ${password}`);
        }

        process.exit();
    } catch (error) {
        console.error(`❌ Erreur création admin : ${error.message}`);
        process.exit(1);
    }
};

createCustomAdmin();
