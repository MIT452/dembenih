import React, { useState, useEffect, useRef } from 'react';
import './Demarches.css';
import { 
    Info, ArrowRight, ChevronRight, FileText, Shield, Hammer, Globe, Heart, 
    FileCheck, Home, GraduationCap, MapPin, Zap, Music, BookOpen, Trash2, 
    Users, Activity, Search, Phone, Clock, Calendar, X, CheckCircle, Building2,
    HeadphonesIcon, MessageSquare, BadgeCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api';
import { getStaticUrl } from '../utils/getStaticUrl';

// Icon map for string icons from backend
const iconMap = {
    'FileText': FileText,
    'Shield': Shield,
    'Hammer': Hammer,
    'Globe': Globe,
    'Heart': Heart,
    'FileCheck': FileCheck,
    'Home': Home,
    'GraduationCap': GraduationCap,
    'MapPin': MapPin,
    'Zap': Zap,
    'Music': Music,
    'BookOpen': BookOpen,
    'Trash2': Trash2,
    'Users': Users,
    'Activity': Activity,
    'Building2': Building2
};

const SubPage = ({ 
    title, 
    subtitle, 
    items: staticItems, 
    apiEndpoint,
    heroColor = '#0d4a3e',
    heroAccent = '#14b8a6',
    heroImage = null,
    heroImages = [
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80', // Mairie moderne
        'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=80', // Documents admin
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80', // Formulaire
        'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=80', // Service public
    ]
}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentHeroImage, setCurrentHeroImage] = useState(0);
    const modalRef = useRef(null);

    // Rotation automatique des images du hero
    useEffect(() => {
        if (heroImages && heroImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [heroImages]);

    // Sélection de l'image du hero
    const selectedHeroImage = heroImage || heroImages[currentHeroImage];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // prefer provided static items when present
                if (staticItems && staticItems.length) {
                    setItems(staticItems);
                    return;
                }

                if (!apiEndpoint) {
                    setItems([]);
                    return;
                }

                const response = await api.get(apiEndpoint);
                if (response.data?.success && response.data?.data) {
                    setItems(response.data.data);
                } else {
                    setItems([]);
                    setError('Aucune donnée disponible');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Impossible de charger les données. Veuillez réessayer plus tard.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiEndpoint, staticItems]);

    // Fermer le modal avec la touche Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setActiveItem(null);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const getIconComponent = (icon) => {
        if (typeof icon === 'string') {
            const IconComponent = iconMap[icon] || FileText;
            return <IconComponent size={28} />;
        }
        return icon;
    };

    // Filtrage des items par recherche
    const filteredItems = searchTerm 
        ? items.filter(item => 
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.desc?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : items;

    // If this route is the demarches page, use the local demarches UI
    const isDemarchesRoute = apiEndpoint === '/demarches';

    // Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // Statistiques
    const stats = [
        { icon: FileCheck, value: '50+', label: 'Démarches disponibles' },
        { icon: Users, value: '98%', label: 'Satisfaction usagers' },
        { icon: Clock, value: '24/7', label: 'Accès en ligne' },
        { icon: Shield, value: '100%', label: 'Sécurisé' },
    ];

    return (
        <div className="sub-page">
            {/* Hero Section ultra-améliorée avec image de fond */}
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hero-section"
                style={{ 
                    minHeight: '550px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: '60px 0'
                }}
            >
                {/* Image de fond avec overlay gradient */}
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
                            transition={{ duration: 1 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(${selectedHeroImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    </AnimatePresence>
                    {/* Overlay gradient */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, 
                            ${heroColor}dd 0%, 
                            ${heroColor}99 40%, 
                            ${heroAccent}cc 100%)`,
                        backdropFilter: 'blur(1px)'
                    }} />
                    {/* Pattern overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.4
                    }} />
                </div>

                {/* Indicateurs de navigation pour les images */}
                {heroImages && heroImages.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '10px',
                        zIndex: 3
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
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                )}
                
                {/* Formes décoratives */}
                <div className="hero-decoration" style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
                    <motion.div 
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{ 
                            position: 'absolute', 
                            top: '-15%', 
                            right: '-5%', 
                            width: '350px', 
                            height: '350px', 
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            background: 'rgba(255,255,255,0.06)',
                            border: '2px solid rgba(255,255,255,0.1)'
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
                            background: 'rgba(255,255,255,0.04)',
                            border: '2px solid rgba(255,255,255,0.08)'
                        }} 
                    />
                </div>
                
                <div className="hero-content" style={{ 
                    position: 'relative', 
                    zIndex: 2, 
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
                            <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Services administratifs officiels</span>
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
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                    >
                        {title}
                    </motion.h1>
                    
                    {/* Sous-titre */}
                    <motion.p 
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        style={{ 
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
                            opacity: 0.95, 
                            maxWidth: '650px', 
                            margin: '0 auto 2rem auto',
                            lineHeight: 1.6,
                            fontWeight: 400
                        }}
                    >
                        {subtitle}
                    </motion.p>

                    {/* Statistiques rapides */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        style={{
                            display: 'flex',
                            gap: '24px',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            marginTop: '20px'
                        }}
                    >
                        {stats.map((stat, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 20px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.15)'
                            }}>
                                <stat.icon size={20} />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{stat.value}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Barre de recherche améliorée */}
            <div style={{ 
                transform: 'translateY(-30px)', 
                marginBottom: '-30px', 
                display: 'flex', 
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10
            }}>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{ 
                        width: 'min(650px, 90%)', 
                        background: 'white', 
                        borderRadius: '20px', 
                        padding: '6px',
                        boxShadow: '0 25px 70px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        border: '2px solid #f1f5f9'
                    }}
                >
                    <Search size={22} style={{ marginLeft: '20px', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Rechercher une démarche administrative..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            padding: '16px 20px',
                            fontSize: '1.05rem',
                            background: 'transparent',
                            color: '#1e293b'
                        }}
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            style={{
                                border: 'none',
                                background: '#f1f5f9',
                                borderRadius: '12px',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#64748b',
                                marginRight: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <X size={18} />
                        </button>
                    )}
                    <button style={{
                        padding: '14px 28px',
                        background: `linear-gradient(135deg, ${heroColor}, ${heroAccent})`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        marginRight: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: `0 8px 25px ${heroColor}40`
                    }}>
                        <Search size={18} />
                        Rechercher
                    </button>
                </motion.div>
            </div>

            {/* Cartes de services rapides */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '40px',
                marginTop: '20px',
                gap: '20px',
                flexWrap: 'wrap',
                padding: '0 20px'
            }}>
                {[
                    { icon: HeadphonesIcon, text: 'Assistance téléphonique', subtext: '01 23 45 67 89', color: '#3b82f6' },
                    { icon: Calendar, text: 'Prendre rendez-vous', subtext: 'En ligne 24h/24', color: '#10b981' },
                    { icon: MessageSquare, text: 'Chat en direct', subtext: 'Réponse sous 5 min', color: '#f59e0b' },
                    { icon: Building2, text: 'Guichet physique', subtext: 'Lun-Ven 8h30-17h', color: '#8b5cf6' }
                ].map((info, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        style={{
                            background: 'white',
                            padding: '20px 28px',
                            borderRadius: '16px',
                            boxShadow: '0 4px 25px rgba(0,0,0,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            flex: '1',
                            minWidth: '250px',
                            maxWidth: '320px',
                            cursor: 'pointer',
                            border: '1px solid #f1f5f9',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '14px',
                            background: `${info.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <info.icon size={24} color={info.color} />
                        </div>
                        <div>
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{info.subtext}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Contenu principal */}
            <section style={{ padding: '20px 0 80px' }}>
                <div className="section-container">
                    <AnimatePresence>
                        {loading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ textAlign: 'center', padding: '100px 0' }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        border: '4px solid #e2e8f0',
                                        borderTopColor: heroColor,
                                        borderRadius: '50%',
                                        margin: '0 auto 24px'
                                    }}
                                />
                                <p style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 500 }}>Chargement de vos démarches...</p>
                            </motion.div>
                        ) : error && !items.length ? (
                            <motion.div 
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ textAlign: 'center', padding: '100px 0' }}
                            >
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '50%',
                                    background: '#fef2f2',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 24px'
                                }}>
                                    <X size={36} color="#ef4444" />
                                </div>
                                <h3 style={{ color: '#dc2626', marginBottom: '12px', fontSize: '1.3rem' }}>Erreur de chargement</h3>
                                <p style={{ color: '#64748b', marginBottom: '28px' }}>{error}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    style={{
                                        padding: '14px 32px',
                                        background: heroColor,
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        boxShadow: `0 8px 25px ${heroColor}40`
                                    }}
                                >
                                    Réessayer
                                </button>
                            </motion.div>
                        ) : filteredItems.length > 0 ? (
                            <motion.div
                                key="content"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Titre de section */}
                                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                                        {searchTerm ? `Résultats pour "${searchTerm}"` : 'Démarches populaires'}
                                    </h2>
                                    <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
                                        {filteredItems.length} démarche{filteredItems.length > 1 ? 's' : ''} disponible{filteredItems.length > 1 ? 's' : ''}
                                    </p>
                                </div>

                                {/* Élément vedette amélioré */}
                                {!searchTerm && filteredItems[0] && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="featured-demarche"
                                        style={{
                                            display: 'flex',
                                            gap: '40px',
                                            marginBottom: '48px',
                                            alignItems: 'center',
                                            background: 'white',
                                            padding: '40px',
                                            borderRadius: '28px',
                                            boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
                                            border: '1px solid #e2e8f0',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onClick={() => setActiveItem(filteredItems[0])}
                                        whileHover={{ 
                                            boxShadow: '0 25px 70px rgba(0,0,0,0.12)', 
                                            y: -6,
                                        }}
                                    >
                                        {/* Fond décoratif */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '-50%',
                                            right: '-10%',
                                            width: '400px',
                                            height: '400px',
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${heroColor}08, ${heroAccent}08)`,
                                        }} />
                                        
                                        <div style={{ flex: '0 0 280px', position: 'relative', zIndex: 1 }}>
                                            {filteredItems[0].image ? (
                                                <img 
                                                    src={filteredItems[0].image} 
                                                    alt={filteredItems[0].title} 
                                                    style={{ 
                                                        width: '280px', 
                                                        height: '200px', 
                                                        objectFit: 'cover', 
                                                        borderRadius: '20px',
                                                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                                                    }} 
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div style={{ 
                                                    width: '280px', 
                                                    height: '200px', 
                                                    borderRadius: '20px', 
                                                    background: `linear-gradient(135deg, ${heroColor} 0%, ${heroAccent} 100%)`, 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    color: 'white',
                                                    fontSize: '4rem',
                                                    boxShadow: `0 15px 40px ${heroColor}40`
                                                }}>
                                                    {getIconComponent(filteredItems[0].icon)}
                                                </div>
                                            )}
                                            <div style={{
                                                position: 'absolute',
                                                top: '16px',
                                                left: '16px',
                                                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                                color: 'white',
                                                padding: '6px 16px',
                                                borderRadius: '25px',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                boxShadow: '0 4px 15px rgba(245,158,11,0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <BadgeCheck size={14} />
                                                Recommandé
                                            </div>
                                        </div>
                                        
                                        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '6px 14px',
                                                background: `${heroColor}10`,
                                                color: heroColor,
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                marginBottom: '16px'
                                            }}>
                                                Démarche prioritaire
                                            </div>
                                            <h2 style={{ margin: '0 0 16px', fontSize: '1.8rem', fontWeight: 700, color: '#0f172a' }}>
                                                {filteredItems[0].title}
                                            </h2>
                                            <p style={{ color: '#64748b', marginTop: '12px', lineHeight: 1.7, fontSize: '1.05rem' }}>
                                                {filteredItems[0].description || filteredItems[0].desc}
                                            </p>
                                            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                {filteredItems[0].link && (
                                                    <motion.a 
                                                        href={filteredItems[0].link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        onClick={(e) => e.stopPropagation()} 
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        style={{ 
                                                            background: `linear-gradient(135deg, ${heroColor}, ${heroAccent})`,
                                                            color: 'white', 
                                                            textDecoration: 'none', 
                                                            padding: '12px 24px', 
                                                            borderRadius: '14px',
                                                            fontWeight: 600,
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            boxShadow: `0 8px 25px ${heroColor}40`
                                                        }}
                                                    >
                                                        <ArrowRight size={18} />
                                                        Accéder au service
                                                    </motion.a>
                                                )}
                                                <Link 
                                                    to={`/admin?openDemarche=${filteredItems[0]._id}`} 
                                                    onClick={(e) => e.stopPropagation()} 
                                                    style={{ 
                                                        color: heroColor, 
                                                        fontWeight: 600, 
                                                        textDecoration: 'none',
                                                        padding: '12px 20px',
                                                        borderRadius: '14px',
                                                        border: `2px solid ${heroColor}20`,
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    Gérer
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Grille des éléments */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                                    gap: '28px'
                                }}>
                                    {(searchTerm ? filteredItems : filteredItems.slice(1)).map((item, i) => (
                                        <motion.div 
                                            key={item._id || i}
                                            variants={itemVariants}
                                            whileHover={{ 
                                                y: -10, 
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                                                transition: { duration: 0.2 } 
                                            }}
                                            style={{
                                                background: 'white',
                                                borderRadius: '24px',
                                                padding: '32px',
                                                boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
                                                border: '1px solid #f1f5f9',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                            onClick={() => setActiveItem(item)}
                                        >
                                            {/* Effet de dégradé au survol */}
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: `linear-gradient(135deg, ${heroColor}05, ${heroAccent}05)`,
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease',
                                            }} className="hover-gradient" />
                                            
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '16px',
                                                background: `linear-gradient(135deg, ${heroColor}15, ${heroAccent}15)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: '24px',
                                                color: heroColor,
                                                position: 'relative',
                                                zIndex: 1
                                            }}>
                                                {getIconComponent(item.icon)}
                                            </div>
                                            
                                            <h3 style={{ 
                                                fontSize: '1.15rem', 
                                                fontWeight: 700, 
                                                marginBottom: '12px', 
                                                color: '#1e293b',
                                                position: 'relative',
                                                zIndex: 1
                                            }}>
                                                {item.title}
                                            </h3>
                                            
                                            <p style={{ 
                                                color: '#64748b', 
                                                lineHeight: '1.6', 
                                                marginBottom: '24px',
                                                fontSize: '0.95rem',
                                                position: 'relative',
                                                zIndex: 1
                                            }}>
                                                {item.description || item.desc}
                                            </p>
                                            
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between',
                                                position: 'relative',
                                                zIndex: 1
                                            }}>
                                                <motion.span 
                                                    whileHover={{ x: 5 }}
                                                    style={{ 
                                                        color: heroColor, 
                                                        fontWeight: 600, 
                                                        display: 'inline-flex', 
                                                        alignItems: 'center',
                                                        fontSize: '0.95rem'
                                                    }}
                                                >
                                                    Consulter
                                                    <ChevronRight size={18} style={{ marginLeft: '4px' }} />
                                                </motion.span>
                                                <Link 
                                                    to={`/admin?openDemarche=${item._id}`} 
                                                    onClick={(e) => e.stopPropagation()} 
                                                    style={{ 
                                                        color: '#94a3b8', 
                                                        fontWeight: 500, 
                                                        textDecoration: 'none',
                                                        fontSize: '0.85rem',
                                                        padding: '6px 14px',
                                                        borderRadius: '8px',
                                                        background: '#f8fafc',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    Gérer
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ textAlign: 'center', padding: '100px 0', color: '#64748b' }}
                            >
                                <Search size={72} style={{ margin: '0 auto 28px', opacity: 0.25 }} />
                                <h3 style={{ marginBottom: '12px', color: '#1e293b', fontSize: '1.3rem' }}>
                                    {searchTerm ? 'Aucun résultat trouvé' : 'Aucune démarche disponible'}
                                </h3>
                                <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
                                    {searchTerm 
                                        ? `Aucune démarche ne correspond à "${searchTerm}". Essayez avec d'autres termes.` 
                                        : 'Le contenu de cette section est en cours de mise à jour.'}
                                </p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        style={{
                                            padding: '12px 28px',
                                            background: heroColor,
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Voir toutes les démarches
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Modal détaillé amélioré */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div 
                        className="demarche-modal-backdrop" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveItem(null)} 
                        style={{ 
                            position: 'fixed', 
                            inset: 0, 
                            background: 'rgba(0,0,0,0.65)',
                            backdropFilter: 'blur(6px)',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            zIndex: 60,
                            padding: '20px'
                        }}
                    >
                        <motion.div 
                            ref={modalRef}
                            className="demarche-modal" 
                            initial={{ scale: 0.85, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()} 
                            style={{ 
                                width: 'min(850px, 95%)', 
                                background: 'white', 
                                borderRadius: '28px', 
                                padding: '40px', 
                                boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
                                position: 'relative',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                        >
                            <motion.button 
                                whileHover={{ scale: 1.1, background: '#fee2e2' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setActiveItem(null)} 
                                style={{ 
                                    position: 'absolute', 
                                    top: '20px', 
                                    right: '20px', 
                                    border: 'none', 
                                    background: '#f1f5f9', 
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#64748b',
                                    transition: 'all 0.2s',
                                    zIndex: 2
                                }}
                            >
                                <X size={22} />
                            </motion.button>
                            
                            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                                <div style={{ flex: '1', minWidth: '280px' }}>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '6px 14px',
                                        borderRadius: '25px',
                                        background: `${heroColor}10`,
                                        color: heroColor,
                                        fontSize: '0.82rem',
                                        fontWeight: 600,
                                        marginBottom: '20px'
                                    }}>
                                        <BadgeCheck size={14} />
                                        Démarche officielle
                                    </div>
                                    
                                    <h2 style={{ margin: '0 0 20px', fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>
                                        {activeItem.title}
                                    </h2>
                                    
                                    <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '28px', fontSize: '1.05rem' }}>
                                        {activeItem.description || activeItem.desc}
                                    </p>
                                    
                                    <div style={{ 
                                        background: '#f8fafc', 
                                        padding: '24px', 
                                        borderRadius: '18px',
                                        marginBottom: '28px',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        <h4 style={{ margin: '0 0 16px', fontSize: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Info size={18} color={heroColor} />
                                            Points essentiels à retenir
                                        </h4>
                                        <ul style={{ margin: 0, paddingLeft: '24px', color: '#64748b', fontSize: '0.95rem', lineHeight: 2 }}>
                                            <li>Délai de traitement variable selon la nature de la demande</li>
                                            <li>Documents originaux obligatoires pour la validation</li>
                                            <li>Présence physique du demandeur requise</li>
                                            <li>Traitement sécurisé de vos données personnelles</li>
                                        </ul>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                                        {activeItem.link && (
                                            <motion.a 
                                                href={activeItem.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                style={{ 
                                                    background: `linear-gradient(135deg, ${heroColor}, ${heroAccent})`,
                                                    color: 'white', 
                                                    textDecoration: 'none', 
                                                    padding: '14px 28px', 
                                                    borderRadius: '14px',
                                                    fontWeight: 600,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    boxShadow: `0 10px 30px ${heroColor}40`,
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                <ArrowRight size={18} />
                                                Accéder au service
                                            </motion.a>
                                        )}
                                        <Link 
                                            to={`/admin?openDemarche=${activeItem._id}`} 
                                            style={{ 
                                                color: heroColor, 
                                                fontWeight: 600, 
                                                textDecoration: 'none',
                                                padding: '14px 28px',
                                                borderRadius: '14px',
                                                border: `2px solid ${heroColor}30`,
                                                fontSize: '1rem',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            <Shield size={18} />
                                            Gérer cette démarche
                                        </Link>
                                    </div>
                                </div>
                                
                                <div style={{ flex: '0 0 300px' }}>
                                    {activeItem.image ? (
                                        <img 
                                            src={activeItem.image} 
                                            alt={activeItem.title} 
                                            style={{ 
                                                width: '100%', 
                                                height: '250px', 
                                                objectFit: 'cover', 
                                                borderRadius: '20px',
                                                boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
                                            }} 
                                        />
                                    ) : (
                                        <div style={{ 
                                            width: '100%', 
                                            height: '250px', 
                                            borderRadius: '20px', 
                                            background: `linear-gradient(135deg, ${heroColor} 0%, ${heroAccent} 100%)`, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            color: 'white',
                                            fontSize: '5rem',
                                            boxShadow: `0 20px 50px ${heroColor}40`
                                        }}>
                                            {getIconComponent(activeItem.icon)}
                                        </div>
                                    )}
                                    
                                    {/* Contact rapide */}
                                    <div style={{
                                        marginTop: '20px',
                                        padding: '20px',
                                        background: '#f8fafc',
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem', color: '#1e293b' }}>Besoin d'aide ?</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.9rem' }}>
                                                <Phone size={16} />
                                                <span>01 23 45 67 89</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.9rem' }}>
                                                <MessageSquare size={16} />
                                                <span>contact@mairie.fr</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Section CTA finale améliorée */}
            <section style={{
                background: `linear-gradient(135deg, ${heroColor} 0%, ${heroAccent} 100%)`,
                padding: '100px 0',
                marginTop: '60px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Décorations */}
                <div style={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                }} />
                
                <div className="section-container" style={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <BadgeCheck size={48} style={{ marginBottom: '20px', opacity: 0.8 }} />
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.2rem', fontWeight: 800 }}>
                            Besoin d'un accompagnement personnalisé ?
                        </h2>
                        <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.7 }}>
                            Nos équipes sont à votre disposition pour vous aider dans toutes vos démarches administratives.
                            N'hésitez pas à nous contacter.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '18px 36px',
                                    background: 'white',
                                    color: heroColor,
                                    borderRadius: '18px',
                                    fontWeight: 700,
                                    fontSize: '1.05rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <Phone size={20} />
                                Nous contacter
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '18px 36px',
                                    background: 'rgba(255,255,255,0.12)',
                                    color: 'white',
                                    borderRadius: '18px',
                                    fontWeight: 700,
                                    fontSize: '1.05rem',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(10px)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <Calendar size={20} />
                                Prendre rendez-vous
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SubPage;