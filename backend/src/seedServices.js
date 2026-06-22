const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Service = require('./models/Service');

const seedServices = async () => {
    try {
        console.log('🔄 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        const services = [
            {
                title: 'Éducation',
                desc: 'Écoles maternelle et primaire, cantines, activités périscolaires et aide aux devoirs pour tous les enfants.',
                fullDesc: 'La commune de Dembéni gère 12 écoles maternelles et primaires. Nous offrons un service de cantine scolaire de qualité, des activités périscolaires variées et un programme d\'aide aux devoirs pour soutenir la réussite éducative de tous les enfants.',
                icon: 'BookOpen',
                img: '/images/education.svg',
                category: 'Services publics',
                location: 'Mairie de Dembéni',
                hours: 'Lundi - Vendredi: 8h00 - 17h00',
                phone: '02 69 61 11 05',
                email: 'education@dembeni.fr',
                benefits: ['Aide aux devoirs gratuite', 'Cantine scolaire', 'Activités sportives']
            },
            {
                title: 'Santé & Solidarité',
                desc: 'Accompagnement des familles, centre de santé local, consultations médicales et aide aux personnes âgées.',
                fullDesc: 'Notre centre de santé propose des consultations médicales régulières, un service d\'accompagnement des familles en difficulté et un programme de soutien aux personnes âgées à domicile.',
                icon: 'Heart',
                img: '/images/sante-solidarite.svg',
                category: 'Santé',
                location: 'Centre de santé de Dembéni',
                hours: 'Lundi - Samedi: 8h00 - 18h00',
                phone: '02 69 61 12 00',
                email: 'sante@dembeni.fr',
                benefits: ['Consultations médicales', 'Aide à domicile', 'Centre de santé']
            },
            {
                title: 'Environnement',
                desc: 'Collecte des déchets, tri sélectif, compostage, nettoyage des plages et préservation de la nature.',
                fullDesc: 'Service de collecte des ordures ménagères 3 fois par semaine, tri sélectif, compostage, et programmes réguliers de nettoyage des plages et des rivières.',
                icon: 'Trash2',
                img: '/images/environnement.svg',
                category: 'Environnement',
                location: 'Service technique municipal',
                hours: 'Lundi - Vendredi: 7h00 - 16h00',
                phone: '02 69 61 13 00',
                email: 'environnement@dembeni.fr',
                benefits: ['Collecte régulière', 'Tri sélectif', 'Nettoyage des plages']
            },
            {
                title: 'Culture & Sport',
                desc: 'Médiathèque, salles de sport, associations locales, événements culturels et animations tout au long de l\'année.',
                fullDesc: 'Médiathèque publique, salles de sport, soutien aux associations locales, et organisation d\'événements culturels et sportifs tout au long de l\'année.',
                icon: 'Music',
                img: '/images/culture.svg',
                category: 'Culture',
                location: 'MJC Tsararano',
                hours: 'Mardi - Dimanche: 10h00 - 19h00',
                phone: '02 69 61 14 00',
                email: 'culture@dembeni.fr',
                benefits: ['Médiathèque', 'Salles de sport', 'Événements culturels']
            },
            {
                title: 'Vie Locale',
                desc: 'Marchés, commerces locaux, associations, animations de quartier et vie associative dynamique.',
                fullDesc: 'Marchés locaux, soutien aux commerces de proximité, animations de quartier et accompagnement des associations locales.',
                icon: 'Users',
                img: '/images/vie-citoyenne.svg',
                category: 'Vie citoyenne',
                location: 'Place de la Mairie',
                hours: 'Lundi - Vendredi: 9h00 - 17h00',
                phone: '02 69 61 15 00',
                email: 'vielocale@dembeni.fr',
                benefits: ['Marchés locaux', 'Soutien aux associations', 'Animations de quartier']
            }
        ];

        console.log('🔄 Suppression des anciens services...');
        await Service.deleteMany({});

        console.log('🔄 Insertion des nouveaux services...');
        await Service.insertMany(services);

        console.log('✅ 5 services insérés avec succès !');
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur : ${error.message}`);
        process.exit(1);
    }
};

seedServices();
