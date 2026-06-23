import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getStaticUrl } from '../utils/getStaticUrl';
import { 
    Info, ArrowRight, CreditCard, Trash2, Utensils, Baby, Palette, 
    ClipboardList, Search, ChevronDown, Phone, Clock, MapPin, 
    CheckCircle, Users, Shield, ExternalLink, BadgeCheck
} from 'lucide-react';

const Services = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentHeroImage, setCurrentHeroImage] = useState(0);

    // Images pour le hero avec rotation automatique
    const heroImages = [
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80', // Mairie moderne
        'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1600&q=80', // Service public
        'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80', // Bureau administratif
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80', // Documents
    ];

    // Rotation automatique des images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const services = [
        { 
            title: "Identité civile & ANTS", 
            desc: "Suivez vos demandes et renouvellements de Passeport ou CNI en ligne.",
            icon: <CreditCard size={24} />,
            color: '#3b82f6',
            image: 'https://images.unsplash.com/photo-1544502062-f82887f03d1c?w=400&q=80',
            stats: '+500 demandes/mois'
        },
        { 
            title: "Gestion environnementale", 
            desc: "Planifiez la collecte d'encombrants et signalez une anomalie sur la voie publique.",
            icon: <Trash2 size={24} />,
            color: '#10b981',
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80',
            stats: 'Collecte bi-mensuelle'
        },
        { 
            title: "Paiement cantine", 
            desc: "Consultez les menus et réglez les factures de restauration scolaire en ligne.",
            icon: <Utensils size={24} />,
            color: '#f59e0b',
            image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80',
            stats: 'Menus mis à jour'
        },
        { 
            title: "Petite Enfance & Crèche", 
            desc: "Déposez votre dossier d'inscription en crèche et suivez les affectations.",
            icon: <Baby size={24} />,
            color: '#ec4899',
            image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80',
            stats: 'Places disponibles'
        },
        { 
            title: "Agenda territorial", 
            desc: "Consultez les actions de prévention et inscrivez-vous aux ateliers.",
            icon: <Palette size={24} />,
            color: '#8b5cf6',
            image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80',
            stats: 'Ateliers gratuits'
        },
        { 
            title: "Démarches administratives", 
            desc: "Accédez instantanément au guichet virtuel pour vos requêtes civiles.",
            icon: <ClipboardList size={24} />,
            color: '#06b6d4',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80',
            stats: 'Disponible 24/7'
        },
    ];

    const accordionItems = [
        {
            q: "Comment programmer un enlèvement d'encombrants à domicile ?",
            a: "Vous pouvez en faire la demande depuis votre Espace Citoyen dans l'onglet 'Démarches'. La collecte est gratuite pour les particuliers dans la limite de 2m³ par mois."
        },
        {
            q: "Quels types de déchets sont acceptés par le service ?",
            a: "Sont acceptés les appareils électroménagers hors d'usage, le mobilier usagé, les matelas, les cartons volumineux et les déchets verts en sacs biodégradables."
        },
        {
            q: "Quels sont les jours de collecte ordinaires ?",
            a: "La collecte des ordures ménagères s'effectue trois fois par semaine (Lundi, Mercredi et Vendredi matin). Les collectes sélectives ont lieu le Mardi pour le verre et le Jeudi pour les emballages."
        }
    ];

    const toggleAccordion = (i) => setActiveAccordion(activeAccordion === i ? null : i);

    const filteredServices = searchTerm
        ? services.filter(s => 
            s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : services;

    const stats = [
        { icon: Users, value: '15 000+', label: 'Citoyens connectés' },
        { icon: CheckCircle, value: '50+', label: 'Services en ligne' },
        { icon: Shield, value: '100%', label: 'Sécurisé' },
        { icon: Clock, value: '24/7', label: 'Accessible' },
    ];

    return (
        <div className="services-page">
            {/* Hero Section avec images changeantes */}
            <section style={{
                position: 'relative',
                minHeight: '550px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '80px 0'
            }}>
                {/* Images de fond avec transition */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentHeroImage}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(${heroImages[currentHeroImage]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    </AnimatePresence>
                    
                    {/* Overlay gradient */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(13,74,62,0.92) 0%, rgba(13,74,62,0.75) 40%, rgba(20,184,166,0.85) 100%)',
                        zIndex: 1
                    }} />
                    
                    {/* Pattern décoratif */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.4,
                        zIndex: 2
                    }} />
                </div>

                {/* Formes décoratives animées */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 3, overflow: 'hidden', pointerEvents: 'none' }}>
                    <motion.div 
                        animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{ 
                            position: 'absolute', 
                            top: '-15%', 
                            right: '-5%', 
                            width: '350px', 
                            height: '350px', 
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            background: 'rgba(255,255,255,0.05)',
                            border: '2px solid rgba(255,255,255,0.08)'
                        }} 
                    />
                    <motion.div 
                        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ 
                            position: 'absolute', 
                            bottom: '-20%', 
                            left: '-5%', 
                            width: '400px', 
                            height: '400px', 
                            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                            background: 'rgba(255,255,255,0.03)',
                            border: '2px solid rgba(255,255,255,0.06)'
                        }} 
                    />
                </div>

                {/* Indicateurs de navigation */}
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px',
                    zIndex: 10
                }}>
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentHeroImage(index)}
                            style={{
                                width: currentHeroImage === index ? '32px' : '10px',
                                height: '10px',
                                borderRadius: '10px',
                                border: 'none',
                                background: currentHeroImage === index ? 'white' : 'rgba(255,255,255,0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.4s ease',
                                boxShadow: currentHeroImage === index ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
                            }}
                            aria-label={`Image ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Contenu Hero */}
                <div style={{
                    position: 'relative',
                    zIndex: 5,
                    textAlign: 'center',
                    color: 'white',
                    width: '90%',
                    maxWidth: '900px'
                }}>
                    {/* Badge */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                    >
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 24px',
                            background: 'rgba(255,255,255,0.15)',
                            borderRadius: '50px',
                            backdropFilter: 'blur(10px)',
                            marginBottom: '24px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}>
                            <BadgeCheck size={18} />
                            <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Services publics officiels</span>
                        </div>
                    </motion.div>

                    {/* Titre */}
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: 800,
                            marginBottom: '1.2rem',
                            lineHeight: 1.1,
                            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                    >
                        Services Publics
                    </motion.h1>

                    {/* Sous-titre */}
                    <motion.p
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            opacity: 0.95,
                            marginBottom: '2.5rem',
                            maxWidth: '650px',
                            margin: '0 auto 2.5rem auto',
                            lineHeight: 1.6
                        }}
                    >
                        Une administration proche de vous, à votre écoute au quotidien
                    </motion.p>

                    {/* Boutons d'action */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        style={{
                            display: 'flex',
                            gap: '16px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/demarches"
                                style={{
                                    padding: '16px 32px',
                                    background: 'white',
                                    color: '#0d4a3e',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '1.05rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                Accéder aux démarches
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a
                                href="#contact"
                                style={{
                                    padding: '16px 32px',
                                    background: 'rgba(255,255,255,0.12)',
                                    color: 'white',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '1.05rem',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                <Phone size={18} />
                                Nous contacter
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Statistiques */}
            <section style={{
                padding: '40px 0',
                background: 'white',
                borderBottom: '1px solid #f1f5f9'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    flexWrap: 'wrap'
                }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                textAlign: 'center',
                                padding: '20px'
                            }}
                        >
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                background: '#f0fdf4',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 12px'
                            }}>
                                <stat.icon size={24} color="#16a34a" />
                            </div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b' }}>{stat.value}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Section Services */}
            <section style={{ padding: '80px 0', background: '#fafbfc' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    {/* En-tête de section */}
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 20px',
                                background: '#f0fdf4',
                                color: '#16a34a',
                                borderRadius: '50px',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                marginBottom: '16px'
                            }}>
                                <Info size={16} />
                                Démarches en ligne
                            </div>
                            <h2 style={{
                                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                                fontWeight: 800,
                                color: '#1e293b',
                                marginBottom: '12px'
                            }}>
                                Vos démarches administratives simplifiées
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                                Accédez en quelques clics à l'ensemble de nos guichets numériques
                            </p>
                        </motion.div>
                    </div>

                    {/* Barre de recherche */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            maxWidth: '600px',
                            margin: '0 auto 40px',
                            background: 'white',
                            borderRadius: '20px',
                            padding: '6px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            border: '2px solid #f1f5f9'
                        }}
                    >
                        <Search size={20} style={{ marginLeft: '16px', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Rechercher un service..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                padding: '14px 16px',
                                fontSize: '1rem',
                                background: 'transparent'
                            }}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                style={{
                                    border: 'none',
                                    background: '#f1f5f9',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    cursor: 'pointer',
                                    color: '#94a3b8',
                                    marginRight: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </motion.div>

                    {/* Grille de services */}
                    {filteredServices.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '24px'
                        }}>
                            {filteredServices.map((service, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    style={{
                                        background: 'white',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
                                        border: '1px solid #f1f5f9',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Image du service */}
                                    <div style={{
                                        height: '160px',
                                        backgroundImage: `url(${service.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            background: 'rgba(255,255,255,0.95)',
                                            borderRadius: '20px',
                                            padding: '4px 12px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: service.color,
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            {service.stats}
                                        </div>
                                    </div>

                                    <div style={{ padding: '24px' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            marginBottom: '12px'
                                        }}>
                                            <div style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '14px',
                                                background: `${service.color}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: service.color,
                                                flexShrink: 0
                                            }}>
                                                {service.icon}
                                            </div>
                                            <h3 style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                color: '#1e293b',
                                                margin: 0
                                            }}>
                                                {service.title}
                                            </h3>
                                        </div>

                                        <p style={{
                                            color: '#64748b',
                                            fontSize: '0.95rem',
                                            lineHeight: 1.6,
                                            marginBottom: '20px'
                                        }}>
                                            {service.desc}
                                        </p>

                                        <Link
                                            to="/demarches"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '10px 20px',
                                                background: `${service.color}10`,
                                                color: service.color,
                                                borderRadius: '12px',
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            Accéder au service
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}
                        >
                            <Search size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                            <p style={{ fontSize: '1.1rem' }}>
                                Aucun service ne correspond à "{searchTerm}"
                            </p>
                        </motion.div>
                    )}

                    {/* FAQ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ 
                            maxWidth: '800px',
                            margin: '60px auto 0'
                        }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                                Foire aux questions
                            </h3>
                            <p style={{ color: '#94a3b8' }}>Trouvez rapidement des réponses à vos questions</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {accordionItems.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: 'white',
                                        borderRadius: '16px',
                                        border: '1px solid #f1f5f9',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                                    }}
                                >
                                    <button
                                        onClick={() => toggleAccordion(i)}
                                        style={{
                                            width: '100%',
                                            padding: '20px 24px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: '#1e293b',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {item.q}
                                        <motion.div
                                            animate={{ rotate: activeAccordion === i ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown size={20} color="#94a3b8" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {activeAccordion === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{
                                                    padding: '0 24px 20px',
                                                    color: '#64748b',
                                                    lineHeight: 1.8
                                                }}>
                                                    {item.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section Contact */}
            <section id="contact" style={{
                background: 'linear-gradient(135deg, #0d4a3e 0%, #14b8a6 100%)',
                padding: '80px 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Décorations */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)'
                }} />
                
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '0 20px',
                    textAlign: 'center',
                    color: 'white',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <MapPin size={48} style={{ marginBottom: '24px', opacity: 0.8 }} />
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>
                            Besoin d'aide ?
                        </h2>
                        <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '36px', lineHeight: 1.7 }}>
                            Notre équipe est disponible pour vous accompagner dans toutes vos démarches administratives
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <motion.a
                                href="tel:0123456789"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '18px 36px',
                                    background: 'white',
                                    color: '#0d4a3e',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '1.05rem',
                                    boxShadow: '0 15px 40px rgba(0,0,0,0.2)'
                                }}
                            >
                                <Phone size={20} />
                                01 23 45 67 89
                            </motion.a>
                            
                            <motion.a
                                href="mailto:contact@mairie.fr"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '18px 36px',
                                    background: 'rgba(255,255,255,0.12)',
                                    color: 'white',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '1.05rem',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <ExternalLink size={20} />
                                Nous écrire
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;