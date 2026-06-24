require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('🔄 Initialisation du compte Administrateur...');
        
        // Ensure a single maintainer admin account exists
        const ADMIN_EMAIL = 'admin@dembeni.com';
        const ADMIN_PASSWORD = 'admin1234';

        const adminExists = await User.findOne({ email: ADMIN_EMAIL });

        if (!adminExists) {
            await User.create({
                firstname: 'Admin',
                lastname: 'Dembeni',
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                phone: '0269 61 11 00',
                address: 'Mairie de Dembéni',
                quartier: 'Centre',
                role: 'admin',
                status: 'approved'
            });
            console.log(`✅ Compte Administrateur (${ADMIN_EMAIL} / ${ADMIN_PASSWORD}) créé dans la collection User.`);
        } else {
            // Update to ensure correct unified fields and reset password
            adminExists.role = 'admin';
            adminExists.status = 'approved';
            adminExists.firstname = 'Admin';
            adminExists.lastname = 'Dembeni';
            adminExists.password = ADMIN_PASSWORD;
            await adminExists.save();
            console.log(`✅ Le compte Administrateur ${ADMIN_EMAIL} existe déjà et a été mis à jour (mot de passe réinitialisé).`);
        }

        process.exit();
    } catch (error) {
        console.error(`❌ Erreur seeder admin : ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
