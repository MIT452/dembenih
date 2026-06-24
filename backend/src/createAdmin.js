require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');

const seedSpecificAdmin = async () => {
    try {
        console.log('🔄 Chargement de l\'environnement...');
        // On remonte d'un niveau par rapport à src/ pour trouver le .env dans backend/
        require('dotenv').config({ path: path.join(__dirname, '../.env') });
        
        console.log('🔄 Connexion à MongoDB...');
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI n\'est pas défini dans le fichier .env');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');
        
        const email = 'admin@dembeni.com'; // Email par défaut pour l'admin
        const password = 'admin1234';
        
        console.log(`🔄 Vérification du compte admin : ${email}`);
        
        let admin = await User.findOne({ email });

        if (!admin) {
            admin = await User.create({
                firstname: 'Admin',
                lastname: 'System',
                email: email,
                password: password,
                phone: '0000000000',
                address: 'Mairie de Dembeni',
                quartier: 'Centre',
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

seedSpecificAdmin();
