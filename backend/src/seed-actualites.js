const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Publication = require('./models/Publication');
const User = require('./models/User');

const seedActualites = async () => {
    try {
        console.log('🔄 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');

        // Récupérer l'ID de l'admin pour l'auteur
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            throw new Error('Aucun administrateur trouvé. Veuillez d\'abord créer un compte admin.');
        }

        const couleursParCategorie = {
            'Vie citoyenne': '#10b981',
            'Environnement': '#059669',
            'Jeunesse': '#f59e0b',
            'Sécurité': '#3b82f6',
            'Santé & Solidarité': '#ec4899',
            'Urbanisme': '#8b5cf6',
            'Éducation': '#14b8a6',
            'Services publics': '#0ea5e9',
            'Développement local': '#f97316',
            'Général': '#64748b'
        };

        const actualites = [
            {
                title: 'Ouverture du nouveau centre social de Dembéni',
                content: 'La municipalité a le plaisir d\'annoncer l\'ouverture officielle du nouveau centre social situé rue du Maréchal Joffre. Ce centre accueillera des associations, proposera des ateliers pour les jeunes et des formations pour les adultes. Venez nombreux découvrir ce nouvel espace dédié à la vie communautaire !',
                type: 'actualite',
                category: 'Vie citoyenne',
                image: '/groupe.jpg',
                status: 'published',
                isFeatured: true,
                isPinned: true,
                tags: ['centre social', 'vie communautaire', 'inauguration'],
                author: admin._id
            },
            {
                title: 'Programme de collecte de déchets verts étendu',
                content: 'Afin de préserver notre environnement, le service de collecte des déchets verts est étendu à tous les quartiers de Dembéni. La collecte s\'effectuera tous les mercredis de 8h à 12h. Merci de votre participation à cette initiative écologique !',
                type: 'actualite',
                category: 'Environnement',
                image: '/beach_dembeni.png',
                status: 'published',
                isFeatured: true,
                tags: ['déchets', 'environnement', 'collecte'],
                author: admin._id
            },
            {
                title: 'Inscriptions ouvertes pour les activités de la MJC',
                content: 'Les inscriptions pour les activités de la MJC 2026 sont maintenant ouvertes ! Au programme : gym tonique, danse maloya, atelier cuisine mahoraise et bien d\'autres. Rendez-vous au secrétariat de la MJC pour vous inscrire avant le 30 juin.',
                type: 'actualite',
                category: 'Jeunesse',
                image: '/news_workshop.png',
                status: 'published',
                isFeatured: false,
                tags: ['MJC', 'activités', 'inscriptions'],
                author: admin._id
            },
            {
                title: 'Renforcement des services de sécurité municipale',
                content: 'La sécurité de nos concitoyens est notre priorité. Nous avons renforcé les patrouilles de la police municipale dans les quartiers. Une permanence est assurée 7j/7 au commissariat de Dembéni. N\'hésitez pas à contacter les forces de l\'ordre en cas de besoin.',
                type: 'actualite',
                category: 'Sécurité',
                image: '/mairie.jpg',
                status: 'published',
                isFeatured: false,
                tags: ['sécurité', 'police municipale', 'patrouilles'],
                author: admin._id
            },
            {
                title: 'Campagne de vaccination contre la grippe saisonnière',
                content: 'Le centre de santé de Dembéni organise une campagne de vaccination contre la grippe saisonnière du 15 au 30 juillet. La vaccination est gratuite pour les personnes âgées de plus de 65 ans et les personnes à risque. Consultez le calendrier sur notre site web.',
                type: 'actualite',
                category: 'Santé & Solidarité',
                image: '/dembeni_lagon_aerial.jpg',
                status: 'published',
                isFeatured: true,
                tags: ['vaccination', 'grippe', 'santé'],
                author: admin._id
            },
            {
                title: 'Rénovation des trottoirs du centre-ville',
                content: 'Les travaux de rénovation des trottoirs du centre-ville débuteront le 20 août. Les travaux concerneront les rues de la République et du Général de Gaulle. Des déviations seront mises en place. Nous vous remercions pour votre compréhension.',
                type: 'actualite',
                category: 'Urbanisme',
                image: '/market_dembeni.png',
                status: 'published',
                isFeatured: false,
                tags: ['travaux', 'renovation', 'trottoirs'],
                author: admin._id
            },
            {
                title: 'Rentrée scolaire : liste des fournitures disponibles',
                content: 'La rentrée scolaire approche ! La liste des fournitures pour tous les niveaux est disponible sur le site de la municipalité et au secrétariat des écoles. Des distributions de kits scolaires seront organisées pour les familles à faible revenu.',
                type: 'actualite',
                category: 'Éducation',
                image: '/aerial.jpg',
                status: 'published',
                isFeatured: false,
                tags: ['rentrée', 'école', 'fournitures'],
                author: admin._id
            },
            {
                title: 'Forum des associations ce week-end',
                content: 'Ne manquez pas le forum des associations qui se tiendra ce samedi 22 juin sur la place de la Mairie de 10h à 18h. Plus de 50 associations présentes pour vous présenter leurs activités. Une occasion idéale pour s\'engager et rencontrer d\'autres concitoyens !',
                type: 'actualite',
                category: 'Vie citoyenne',
                image: '/groupe.jpg',
                status: 'published',
                isFeatured: true,
                tags: ['forum', 'associations', 'engagement'],
                author: admin._id
            },
            {
                title: 'Nouveau service de livraison de repas à domicile',
                content: 'La municipalité, en partenariat avec le CCAS, lance un nouveau service de livraison de repas à domicile pour les personnes âgées et à mobilité réduite. Les inscriptions sont ouvertes dès aujourd\'hui au secrétariat du CCAS.',
                type: 'actualite',
                category: 'Services publics',
                image: '/news_market.png',
                status: 'published',
                isFeatured: false,
                tags: ['repas', 'domicile', 'CCAS'],
                author: admin._id
            },
            {
                title: 'Marché artisanal mensuel à Dembéni',
                content: 'Découvrez le nouveau marché artisanal qui se tiendra le premier samedi de chaque mois sur le port. Venez trouver des produits locaux, des créations artisanales et déguster la cuisine mahoraise. Les artisans intéressés peuvent contacter la mairie pour réserver un stand.',
                type: 'actualite',
                category: 'Développement local',
                image: '/news_market.png',
                status: 'published',
                isFeatured: false,
                tags: ['marché', 'artisanat', 'produits locaux'],
                author: admin._id
            }
        ];

        console.log('🔄 Suppression des anciennes actualités...');
        await Publication.deleteMany({ type: 'actualite' });

        console.log('🔄 Ajout des nouvelles actualités...');
        await Publication.insertMany(actualites);

        console.log('✅ 10 actualités ajoutées avec succès !');
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur : ${error.message}`);
        process.exit(1);
    }
};

seedActualites();
