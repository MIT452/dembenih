const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Publication = require('./models/Publication');
const User = require('./models/User');

const seedCultureData = async () => {
    try {
        console.log('🔄 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        // Récupérer l'ID de l'admin pour l'auteur
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            throw new Error('Aucun administrateur trouvé. Veuillez d\'abord créer un compte admin.');
        }

        const cultureItems = [
            {
                title: "Festival Interculturel de Dembéni",
                content: "Rejoignez-nous pour trois jours de célébration de la culture mahoraise. Au programme : danses traditionnelles, chants polyphoniques (M'biwi, Debaa) et gastronomie locale. Un événement pour toute la famille visant à préserver et transmettre nos racines aux jeunes générations.",
                type: "evenement",
                category: "Culture",
                image: "https://images.unsplash.com/photo-1598977122420-091920678d2b?auto=format&fit=crop&w=1200&q=80",
                eventDate: new Date("2026-07-15"),
                eventLocation: "Place de la Mairie",
                status: "published",
                isFeatured: true,
                author: admin._id
            },
            {
                title: "Journées du Patrimoine : Visite de la Mosquée",
                content: "Visite guidée exceptionnelle de la grande mosquée historique de Dembéni. Découvrez les secrets de sa construction, son rôle central dans la vie de la cité et l'évolution de son architecture à travers les siècles. Un voyage spirituel et historique unique.",
                type: "evenement",
                category: "Culture",
                image: "https://images.unsplash.com/photo-1598977122420-091920678d2b?auto=format&fit=crop&w=1200&q=80",
                eventDate: new Date("2026-09-20"),
                eventLocation: "Mosquée de Dembéni",
                status: "published",
                author: admin._id
            },
            {
                title: "Exposition : L'Usine Sucrière d'autrefois",
                content: "Exposition photographique et documentaire sur l'histoire de l'ancienne usine sucrière. Témoignages d'anciens ouvriers, objets d'époque et plans historiques pour comprendre l'impact de cette industrie sur le développement de Dembéni et de Mayotte.",
                type: "evenement",
                category: "Culture",
                image: "https://images.unsplash.com/photo-1598977122420-091920678d2b?auto=format&fit=crop&w=1200&q=80",
                eventDate: new Date("2026-05-10"),
                eventLocation: "MJC Tsararano",
                status: "published",
                author: admin._id
            },
            {
                title: "Concours de Chants Traditionnels",
                content: "Grand concours de chants traditionnels inter-quartiers. Les groupes de Tsararano, Iloni, Ongojou et Dembéni centre s'affrontent amicalement pour remporter le prix de l'excellence culturelle. Venez soutenir vos quartiers !",
                type: "evenement",
                category: "Culture",
                image: "https://images.unsplash.com/photo-1598977122420-091920678d2b?auto=format&fit=crop&w=1200&q=80",
                eventDate: new Date("2026-08-05"),
                eventLocation: "Plateau sportif Tsararano",
                status: "published",
                author: admin._id
            }
        ];

        console.log('🔄 Nettoyage des anciens événements culturels...');
        await Publication.deleteMany({ category: 'Culture', type: 'evenement' });

        console.log('🔄 Insertion des nouveaux événements culturels...');
        await Publication.insertMany(cultureItems);

        console.log('✅ Données culturelles insérées avec succès !');
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur : ${error.message}`);
        process.exit(1);
    }
};

seedCultureData();
