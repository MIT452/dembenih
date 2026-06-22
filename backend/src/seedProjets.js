const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Projet = require('./models/Projet');

const seedProjets = async () => {
    try {
        console.log('🔄 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        const projets = [
            {
                title: 'Éco-quartier Tsararano',
                description: 'Développement d\'un nouvel espace de vie durable et moderne avec des logements écologiques et des espaces verts.',
                icon: 'Home',
                category: 'Urbanisme',
                status: 'En cours',
                image: '/images/developpement-local.svg'
            },
            {
                title: 'Rénovation des Écoles',
                description: 'Modernisation complète des infrastructures éducatives de la commune : nouveaux bâtiments, salles informatiques et équipements sportifs.',
                icon: 'GraduationCap',
                category: 'Éducation',
                status: 'En cours',
                image: '/images/education.svg'
            },
            {
                title: 'Parc Municipal Central',
                description: 'Aménagement d\'un nouvel espace vert de 5 hectares avec playground, aire de jeux, jardin botanique et promenades.',
                icon: 'MapPin',
                category: 'Environnement',
                status: 'Planifié',
                image: '/images/environnement.svg'
            },
            {
                title: 'Infrastructures Numériques',
                description: 'Déploiement de la fibre optique dans tous les quartiers et création d\'un réseau Wi-Fi public dans les lieux publics.',
                icon: 'Zap',
                category: 'Numérique',
                status: 'En cours',
                image: '/images/general.svg'
            },
            {
                title: 'Centre Culturel',
                description: 'Construction d\'un nouveau centre culturel polyvalent avec salle de spectacle, médiathèque et ateliers artistiques.',
                icon: 'Music',
                category: 'Culture',
                status: 'Planifié',
                image: '/images/culture.svg'
            }
        ];

        console.log('🔄 Suppression des anciens projets...');
        await Projet.deleteMany({});

        console.log('🔄 Insertion des nouveaux projets...');
        await Projet.insertMany(projets);

        console.log('✅ 5 projets insérés avec succès !');
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur : ${error.message}`);
        process.exit(1);
    }
};

seedProjets();
