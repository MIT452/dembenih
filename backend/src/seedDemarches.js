const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Demarche = require('./models/Demarche');

const seedDemarches = async () => {
    try {
        console.log('🔄 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        const demarches = [
            {
                title: 'État Civil',
                description: 'Demande d\'actes de naissance, mariage, décès et livret de famille. Rendez-vous en ligne ou au service de l\'état civil.',
                icon: 'FileText',
                category: 'Documents officiels',
                link: ''
            },
            {
                title: 'Identité',
                description: 'Renouvellement et obtention de passeport et de carte nationale d\'identité. Dossier et rendez-vous en ligne.',
                icon: 'Shield',
                category: 'Documents officiels',
                link: ''
            },
            {
                title: 'Urbanisme',
                description: 'Permis de construire, déclaration préalable, certificat d\'urbanisme et consultation du Plan Local d\'Urbanisme.',
                icon: 'Hammer',
                category: 'Urbanisme',
                link: ''
            },
            {
                title: 'Élections',
                description: 'Inscription sur les listes électorales, vote par procuration et informations sur les bureaux de vote.',
                icon: 'Globe',
                category: 'Vie citoyenne',
                link: ''
            },
            {
                title: 'Aides Sociales',
                description: 'Accès aux aides sociales, allocation logement, RSA et accompagnement des familles en difficulté.',
                icon: 'Heart',
                category: 'Solidarité',
                link: ''
            },
            {
                title: 'Cartes & Permis',
                description: 'Parking résidentiel, carte de stationnement et permis de circuler dans la commune.',
                icon: 'FileCheck',
                category: 'Transports',
                link: ''
            }
        ];

        console.log('🔄 Suppression des anciennes démarches...');
        await Demarche.deleteMany({});

        console.log('🔄 Insertion des nouvelles démarches...');
        await Demarche.insertMany(demarches);

        console.log('✅ 6 démarches insérées avec succès !');
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur : ${error.message}`);
        process.exit(1);
    }
};

seedDemarches();
