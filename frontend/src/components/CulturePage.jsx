import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Music, Palette, Camera, Landmark, Calendar, MapPin, 
  ChevronRight, Info, ExternalLink, Activity, Users, Globe, Compass, X,
  BadgeCheck, ArrowRight, Clock, Star, BookOpen, Heart
} from 'lucide-react';

// Images locales et distantes
const fallbackCultureEventImage = '/news_concert.png';

// Images du hero en diaporama
const heroImages = [
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80', // Concert/Festival
  'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600&q=80', // Mosquée/Patrimoine
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80', // Festival culturel
  'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1600&q=80', // Exposition/Art
  'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1600&q=80', // Danse traditionnelle
];

const eventTitleImageMap = {
  "Exposition : L'Usine Sucrière d'autrefois": 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&h=250&fit=crop',
  'Concours de Chants Traditionnels': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop',
  'Journées du Patrimoine : Visite de la Mosquée': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&h=250&fit=crop',
  'Festival Interculturel de Dembéni': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop',
  'MJC Tsararano': '/groupe.jpg'
};

const heritageImages = {
  1: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&h=400&fit=crop',
  2: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop',
  3: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop'
};

const getEventImage = (event) => {
  const image = event.image?.trim() || event.coverImage?.trim();
  if (image) return image;
  const title = (event.title || event.name || '').toLowerCase();
  const mapped = Object.keys(eventTitleImageMap).find((key) => {
    const normalized = key.toLowerCase();
    return title.includes(normalized) || normalized.includes(title);
  });
  if (mapped) return eventTitleImageMap[mapped];
  return fallbackCultureEventImage;
};

const CulturePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Rotation automatique des images du hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch publications with category 'Culture' from backend (includes events and articles)
  useEffect(() => {
    const fetchCultureData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/publications?category=Culture&status=published');
        console.log('Culture publications API response:', res.data);
        if (res.data?.success && Array.isArray(res.data.data)) {
          setEvents(res.data.data);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Erreur chargement culture', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCultureData();
  }, []);

  // Fermer le modal avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedSite(null);
    };
    if (selectedSite) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedSite]);

  const HERITAGE_SITES = [
    {
      id: 1,
      title: "Mosquée de Dembéni",
      desc: "Un joyau architectural témoignant de l'histoire spirituelle de la commune, construit au XIXe siècle.",
      icon: Compass,
      location: "Centre-ville",
      color: "#0f3c28",
      history: "Édifiée en 1872, la Mosquée de Dembéni est l'un des plus anciens édifices religieux de Mayotte. Son minaret en pierre de taille et ses arcs en ogive témoignent d'un savoir-faire architectural unique, mêlant influences swahilies et traditions locales."
    },
    {
      id: 2,
      title: "Ancienne Usine Sucrière",
      desc: "Vestiges de l'époque industrielle, un lieu de mémoire incontournable de l'histoire économique de l'île.",
      icon: Activity,
      location: "Quartier Sud",
      color: "#78350f",
      history: "Fondée en 1885, cette usine sucrière a été le poumon économique de la région pendant près d'un siècle. Aujourd'hui restaurée, elle accueille des expositions et des événements culturels qui font revivre ce patrimoine industriel."
    },
    {
      id: 3,
      title: "Pôles Culturels",
      desc: "La MJC et la bibliothèque municipale, cœurs battants de la jeunesse et de la création artistique.",
      icon: Music,
      location: "Tsararano",
      color: "#1e40af",
      history: "Inaugurés en 2010, ces espaces modernes offrent aux habitants des ateliers de musique, de danse, de théâtre et un accès à une vaste collection d'ouvrages sur l'histoire et la culture mahoraise."
    }
  ];

  const stats = [
    { icon: Landmark, value: '12', label: 'Sites classés', color: '#10b981' },
    { icon: Users, value: '45+', label: 'Associations', color: '#3b82f6' },
    { icon: Music, value: '15', label: 'Festivals/an', color: '#f59e0b' },
    { icon: Star, value: '100%', label: 'Gratuit', color: '#8b5cf6' }
  ];

  return (
    <div className="culture-page-wrapper" style={{ background: '#f8fafc', color: '#0f172a' }}>
      
      {/* 1. HERO AVEC DIAPORAMA D'IMAGES */}
      <section style={{ 
        minHeight: '600px', 
        position: 'relative', 
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
            background: 'linear-gradient(135deg, rgba(15,60,40,0.95) 0%, rgba(15,60,40,0.75) 40%, rgba(16,185,129,0.7) 100%)',
            zIndex: 1
          }} />
          
          {/* Pattern décoratif */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.4,
            zIndex: 2
          }} />
        </div>

        {/* Formes décoratives animées */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, overflow: 'hidden', pointerEvents: 'none' }}>
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ 
              position: 'absolute', 
              top: '-15%', 
              right: '-8%', 
              width: '380px', 
              height: '380px', 
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              background: 'rgba(255,255,255,0.04)',
              border: '2px solid rgba(255,255,255,0.08)'
            }} 
          />
          <motion.div 
            animate={{ rotate: -360, scale: [1, 1.15, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ 
              position: 'absolute', 
              bottom: '-20%', 
              left: '-8%', 
              width: '420px', 
              height: '420px', 
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              background: 'rgba(255,255,255,0.03)',
              border: '2px solid rgba(255,255,255,0.06)'
            }} 
          />
        </div>

        {/* Indicateurs de navigation */}
        <div style={{
          position: 'absolute',
          bottom: '35px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 10
        }}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              style={{
                width: currentHeroImage === index ? '36px' : '12px',
                height: '12px',
                borderRadius: '12px',
                border: 'none',
                background: currentHeroImage === index ? '#4ade80' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: currentHeroImage === index ? '0 2px 12px rgba(74,222,128,0.5)' : 'none'
              }}
              aria-label={`Image ${index + 1}`}
            />
          ))}
        </div>

        {/* Contenu Hero */}
        <div className="h-container" style={{ 
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
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              marginBottom: '24px',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
            }}>
              <BadgeCheck size={18} color="#4ade80" />
              <span style={{ fontWeight: 500, fontSize: '0.95rem', color: '#d1fae5' }}>
                Patrimoine & Traditions
              </span>
            </div>
          </motion.div>
          
          {/* Titre */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              marginBottom: '1.2rem',
              lineHeight: 1.1,
              textShadow: '0 4px 30px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em'
            }}
          >
            La Culture à Dembéni
          </motion.h1>
          
          {/* Sous-titre */}
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{ 
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', 
              maxWidth: '700px', 
              margin: '0 auto 2.5rem auto', 
              opacity: 0.9,
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            Découvrez la richesse historique, les arts vivants et les événements qui font vibrer notre commune au cœur de Mayotte.
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              style={{
                padding: '16px 32px',
                background: '#10b981',
                color: 'white',
                borderRadius: '50px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.05rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(16,185,129,0.3)'
              }}
            >
              <Compass size={18} />
              Explorer le patrimoine
              <ArrowRight size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/actualites')}
              style={{
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.12)',
                color: 'white',
                borderRadius: '50px',
                fontWeight: 700,
                border: '2px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                fontSize: '1.05rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Calendar size={18} />
              Voir l'agenda
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 2. STATISTIQUES */}
      <section className="h-container" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            background: 'white',
            padding: '40px',
            borderRadius: '28px',
            boxShadow: '0 25px 70px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9'
          }}
        >
          {stats.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              style={{ 
                textAlign: 'center', 
                borderRight: i < stats.length - 1 ? '1px solid #f1f5f9' : 'none',
                padding: '10px 20px'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '15px',
                color: item.color
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: `${item.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <item.icon size={28} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                {item.value}
              </div>
              <h4 style={{ fontWeight: 700, margin: '0 0 4px 0', color: '#334155', fontSize: '0.95rem' }}>
                {item.label}
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. PATRIMOINE BÂTI & SITES D'EXCEPTION */}
      <section className="h-container" style={{ padding: '100px 0 60px' }}>
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
              Lieux de Mémoire & Sites d'Exception
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#10b981', margin: '20px auto', borderRadius: '2px' }} />
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto' }}>
              Des trésors architecturaux et culturels qui racontent l'histoire de notre île
            </p>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {HERITAGE_SITES.map((site, i) => (
            <motion.div 
              key={site.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              style={{ 
                borderRadius: '24px', 
                overflow: 'hidden', 
                background: 'white',
                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ 
                width: '100%', 
                height: '250px', 
                overflow: 'hidden', 
                position: 'relative',
                background: `${site.color}15`
              }}>
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={heritageImages[site.id] || '/news_concert.png'}
                  alt={site.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Overlay gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '80px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)'
                }} />
                {/* Badge localisation */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,255,255,0.95)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <MapPin size={14} color="#10b981" />
                  {site.location}
                </div>
              </div>
              
              <div style={{ padding: '28px' }}>
                <h3 style={{ 
                  fontSize: '1.35rem', 
                  fontWeight: 800, 
                  margin: '0 0 14px 0',
                  color: '#0f172a'
                }}>
                  {site.title}
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  lineHeight: '1.7', 
                  marginBottom: '24px',
                  fontSize: '0.95rem'
                }}>
                  {site.desc}
                </p>
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedSite(site)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: 'none', 
                    border: 'none', 
                    color: '#10b981', 
                    fontWeight: 700, 
                    cursor: 'pointer', 
                    padding: 0,
                    fontSize: '0.95rem'
                  }}
                >
                  Découvrir ce lieu <ChevronRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. AGENDA CULTUREL DYNAMIQUE */}
      <section style={{ background: '#f0fdf4', padding: '100px 0' }}>
        <div className="h-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                  Agenda Culturel
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
                  Ne manquez aucun grand rendez-vous de la commune
                </p>
              </motion.div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/actualites')}
              style={{ 
                padding: '14px 28px', 
                borderRadius: '14px', 
                border: '2px solid #e2e8f0', 
                background: 'white', 
                fontWeight: 700, 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: '#0f172a',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
              }}
            >
              <Calendar size={18} color="#10b981" />
              Voir tout le calendrier
            </motion.button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ 
                  display: 'inline-block',
                  width: '48px', 
                  height: '48px', 
                  border: '4px solid #e2e8f0', 
                  borderTop: '4px solid #10b981', 
                  borderRadius: '50%',
                  marginBottom: '20px'
                }} 
              />
              <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Chargement des événements...</p>
            </div>
          ) : events.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ 
                background: 'white', 
                padding: '80px 40px', 
                borderRadius: '28px', 
                textAlign: 'center', 
                border: '2px dashed #e2e8f0',
                boxShadow: '0 5px 20px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '20px',
                background: '#f0fdf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Music size={36} color="#10b981" />
              </div>
              <h3 style={{ margin: '0 0 8px', color: '#64748b', fontSize: '1.3rem' }}>
                Aucun événement programmé
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
                Revenez bientôt pour découvrir la programmation culturelle 2026.
              </p>
            </motion.div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '25px' 
            }}>
              {events.map((event, i) => (
                <motion.div 
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  style={{ 
                    background: 'white', 
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    width: '100%', 
                    height: '200px', 
                    overflow: 'hidden', 
                    background: '#f8fafc',
                    position: 'relative'
                  }}>
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={getEventImage(event)}
                      alt={event.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackCultureEventImage; }}
                    />
                    {/* Badge date */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255,255,255,0.95)',
                      padding: '8px 16px',
                      borderRadius: '25px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#10b981',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <Clock size={14} />
                      {event.eventDate ? new Date(event.eventDate).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      }) : 'Date à venir'}
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px' }}>
                    <h4 style={{ 
                      fontSize: '1.15rem', 
                      fontWeight: 800, 
                      margin: '0 0 10px 0',
                      color: '#0f172a',
                      lineHeight: 1.4
                    }}>
                      {event.title}
                    </h4>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: '#64748b', 
                      lineHeight: '1.6', 
                      margin: '0 0 20px 0' 
                    }}>
                      {event.content?.substring(0, 120) || 'Événement culturel à ne pas manquer'}...
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      color: '#94a3b8', 
                      fontSize: '0.85rem', 
                      fontWeight: 600,
                      paddingTop: '16px',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <MapPin size={14} color="#10b981" /> 
                      {event.eventLocation || 'Lieu à confirmer'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. APPEL À L'ACTION */}
      <section className="h-container" style={{ padding: '100px 0' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            background: 'linear-gradient(135deg, #0f3c28 0%, #06180f 100%)',
            borderRadius: '32px',
            padding: '80px 40px',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Décorations */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.06 }}>
            <Palette size={300} />
          </div>
          <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', opacity: 0.04 }}>
            <Music size={250} />
          </div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <Heart size={40} style={{ marginBottom: '20px', color: '#4ade80' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '20px' }}>
              Vous êtes une association ?
            </h2>
            <p style={{ 
              fontSize: '1.15rem', 
              maxWidth: '600px', 
              margin: '0 auto 40px auto', 
              opacity: 0.9,
              lineHeight: 1.7
            }}>
              Faites connaître vos activités, demandez des subventions ou réservez des équipements municipaux pour vos projets culturels.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/connexion')}
                style={{ 
                  padding: '16px 32px', 
                  borderRadius: '16px', 
                  background: '#10b981', 
                  border: 'none', 
                  color: 'white', 
                  fontWeight: 800, 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  boxShadow: '0 10px 30px rgba(16,185,129,0.3)',
                  fontSize: '1rem'
                }}
              >
                <Activity size={20} /> 
                Espace Associations
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                style={{ 
                  padding: '16px 32px', 
                  borderRadius: '16px', 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '2px solid rgba(255,255,255,0.2)', 
                  color: 'white', 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  fontSize: '1rem'
                }}
              >
                Nous contacter
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. MODAL DE DÉTAILS PATRIMOINE */}
      <AnimatePresence>
        {selectedSite && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              background: 'rgba(15, 23, 42, 0.75)', 
              backdropFilter: 'blur(12px)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              zIndex: 9999,
              padding: '20px'
            }}
            onClick={() => setSelectedSite(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              style={{ 
                background: 'white', 
                borderRadius: '32px', 
                maxWidth: '800px', 
                width: '100%',
                maxHeight: '90vh', 
                overflowY: 'auto', 
                position: 'relative',
                boxShadow: '0 40px 80px rgba(0,0,0,0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <motion.button 
                whileHover={{ scale: 1.1, background: '#fee2e2' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedSite(null)}
                style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  right: '20px', 
                  background: 'rgba(255,255,255,0.95)', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '44px', 
                  height: '44px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)', 
                  cursor: 'pointer', 
                  zIndex: 10,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <X size={22} color="#0f172a" />
              </motion.button>
              
              {/* Image/Icon header */}
              <div style={{ 
                height: '350px', 
                background: `${selectedSite.color}10`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {heritageImages[selectedSite.id] ? (
                  <img 
                    src={heritageImages[selectedSite.id]} 
                    alt={selectedSite.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  (() => {
                    const Icon = selectedSite.icon;
                    return <Icon size={120} color={selectedSite.color} opacity={0.3} />;
                  })()
                )}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)'
                }} />
              </div>
              
              <div style={{ padding: '40px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: '#10b981', 
                  fontSize: '0.85rem', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  marginBottom: '16px' 
                }}>
                  <MapPin size={16} /> {selectedSite.location}
                </div>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 900, 
                  color: '#0f172a', 
                  marginBottom: '20px',
                  lineHeight: 1.3
                }}>
                  {selectedSite.title}
                </h2>
                <div style={{ color: '#475569', lineHeight: '1.9', fontSize: '1.05rem' }}>
                  <p>{selectedSite.desc}</p>
                  <p style={{ marginTop: '24px' }}>
                    {selectedSite.history}
                  </p>
                </div>
                
                <div style={{ 
                  marginTop: '40px', 
                  display: 'flex', 
                  gap: '15px',
                  paddingTop: '24px',
                  borderTop: '1px solid #e2e8f0',
                  flexWrap: 'wrap'
                }}>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/contact')}
                    style={{ 
                      padding: '14px 28px', 
                      borderRadius: '14px', 
                      background: '#0f3c28', 
                      color: 'white', 
                      border: 'none', 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 25px rgba(15,60,40,0.3)'
                    }}
                  >
                    <BookOpen size={18} />
                    Réserver une visite
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSite(null)}
                    style={{ 
                      padding: '14px 28px', 
                      borderRadius: '14px', 
                      background: '#f1f5f9', 
                      color: '#475569', 
                      border: '1px solid #e2e8f0', 
                      fontWeight: 700, 
                      cursor: 'pointer' 
                    }}
                  >
                    Fermer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CulturePage;