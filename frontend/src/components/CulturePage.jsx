import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Music, Palette, Camera, Landmark, Calendar, MapPin, 
  ChevronRight, Info, ExternalLink, Activity, Users, Globe, Compass, X
} from 'lucide-react';

// Prefer local images from `public/` for hero and fallbacks (faster, coherent)
const fallbackCultureEventImage = '/news_concert.png';
const cultureHeroImage = '/dembeni_lagon_aerial.jpg';

const eventTitleImageMap = {
  "Exposition : L'Usine Sucrière d'autrefois": '/aerial.jpg',
  'Concours de Chants Traditionnels': '/news_workshop.png',
  'Journées du Patrimoine : Visite de la Mosquée': '/mairie.jpg',
  'Festival Interculturel de Dembéni': '/market_dembeni.png',
  'MJC Tsararano': '/groupe.jpg'
};

const heritageImages = {
  1: '/mairie.jpg',
  2: '/market_dembeni.png',
  3: '/groupe.jpg'
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

  // Fetch cultural events from backend
  useEffect(() => {
    const fetchCultureData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/publications?type=evenement&category=Culture');
        setEvents(res.data.data);
      } catch (err) {
        console.error('Erreur chargement culture', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCultureData();
  }, []);

  const HERITAGE_SITES = [
    {
      id: 1,
      title: "Mosquée de Dembéni",
      desc: "Un joyau architectural témoignant de l'histoire spirituelle de la commune.",
      icon: Compass,
      location: "Centre-ville",
      color: "#0f3c28"
    },
    {
      id: 2,
      title: "Ancienne Usine Sucrière",
      desc: "Vestiges de l'époque industrielle, un lieu de mémoire incontournable.",
      icon: Activity,
      location: "Quartier Sud",
      color: "#78350f"
    },
    {
      id: 3,
      title: "Pôles Culturels",
      desc: "La MJC et la bibliothèque municipale, cœurs battants de la jeunesse.",
      icon: Music,
      location: "Tsararano",
      color: "#1e40af"
    }
  ];

  return (
    <div className="culture-page-wrapper" style={{ background: '#fcfdfb', color: '#0f172a' }}>
      
      {/* 1. HERO HEADER IMMERSIF */}
      <section className="culture-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: `url('${cultureHeroImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={{ duration: 1.5 }}
          style={{ 
            position: 'absolute', 
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.35) 45%, rgba(15,23,42,0.8) 100%)',
          }}
        />
        <div className="h-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4ade80' }}
          >
            Patrimoine & Traditions
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, margin: '15px 0' }}
          >
            La Culture à Dembéni
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}
          >
            Découvrez la richesse historique, les arts vivants et les événements qui font vibrer notre commune au cœur de Mayotte.
          </motion.p>
        </div>
      </section>

      {/* 2. INFOS RAPIDES / CHIFFRES CLÉS */}
      <section className="h-container" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          background: 'white',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
        }}>
          {[
            { icon: <Landmark className="text-emerald-600" />, title: "Patrimoine Classé", desc: "12 sites historiques protégés" },
            { icon: <Users className="text-emerald-600" />, title: "Vie Associative", desc: "+45 associations culturelles" },
            { icon: <Music className="text-emerald-600" />, title: "Festivités", desc: "15 festivals annuels" }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', borderRight: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>{item.icon}</div>
              <h4 style={{ fontWeight: 800, margin: '0 0 5px 0' }}>{item.title}</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PATRIMOINE BÂTI & SITES D'EXCEPTION */}
      <section className="h-container" style={{ padding: '100px 0' }}>
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f3c28' }}>Lieux de Mémoire & Sites d'Exception</h2>
          <div style={{ width: '60px', height: '4px', background: '#10b981', margin: '20px auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {HERITAGE_SITES.map((site) => (
            <motion.div 
              key={site.id}
              whileHover={{ y: -10 }}
              style={{ 
                borderRadius: '24px', 
                overflow: 'hidden', 
                background: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                border: '1px solid #f1f5f9'
              }}
            >
              <div style={{ width: '100%', height: '250px', overflow: 'hidden', borderBottom: '1px solid #f1f5f9' }}>
                <img
                  src={heritageImages[site.id] || '/news_concert.png'}
                  alt={site.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
                  <MapPin size={14} /> {site.location}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 850, margin: '0 0 15px 0' }}>{site.title}</h3>
                <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>{site.desc}</p>
                <button 
                  onClick={() => setSelectedSite(site)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', 
                    background: 'none', border: 'none', color: '#0f3c28', 
                    fontWeight: 800, cursor: 'pointer', padding: 0 
                  }}
                >
                  En savoir plus <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. AGENDA CULTUREL DYNAMIQUE */}
      <section style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div className="h-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f3c28', margin: 0 }}>Agenda Culturel</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '10px' }}>Ne manquez aucun grand rendez-vous de la commune.</p>
            </div>
            <button 
              onClick={() => navigate('/actualites')}
              style={{ 
                padding: '12px 24px', borderRadius: '12px', border: '2px solid #e2e8f0', 
                background: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' 
              }}
            >
              <Calendar size={18} /> Voir tout le calendrier
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>Chargement des événements...</div>
          ) : events.length === 0 ? (
            <div style={{ background: 'white', padding: '60px', borderRadius: '24px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
              <Activity size={48} style={{ color: '#94a3b8', marginBottom: '20px' }} />
              <h3 style={{ margin: 0, color: '#64748b' }}>Aucun événement prévu pour le moment.</h3>
              <p style={{ color: '#94a3b8' }}>Revenez très bientôt pour découvrir la programmation 2026.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
              {events.map((event) => (
                <div key={event._id} style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '18px', marginBottom: '20px', background: '#f8fafc' }}>
                    <img
                      src={getEventImage(event)}
                      alt={event.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackCultureEventImage; }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                    {new Date(event.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                  </span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 850, margin: '15px 0 10px 0' }}>{event.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 20px 0' }}>{event.content?.substring(0, 100)}...</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>
                    <MapPin size={14} /> {event.eventLocation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. APPEL À L'ACTION : VIE ASSOCIATIVE */}
      <section className="h-container" style={{ padding: '100px 0' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #0f3c28 0%, #06180f 100%)',
          borderRadius: '32px',
          padding: '80px 40px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1 }}><Palette size={300} /></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>Vous êtes une association ?</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px auto', opacity: 0.9 }}>
              Faites connaître vos activités, demandez des subventions ou réservez des équipements municipaux pour vos projets.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/connexion')}
                style={{ padding: '16px 32px', borderRadius: '16px', background: '#10b981', border: 'none', color: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <Activity size={20} /> Espace Associations
              </button>
              <button 
                onClick={() => navigate('/contact')}
                style={{ padding: '16px 32px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 800, cursor: 'pointer' }}
              >
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MODAL DE DÉTAILS PATRIMOINE */}
      <AnimatePresence>
        {selectedSite && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
              background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
              padding: '20px'
            }}
            onClick={() => setSelectedSite(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ 
                background: 'white', borderRadius: '32px', maxWidth: '800px', width: '100%',
                maxHeight: '90vh', overflowY: 'auto', position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedSite(null)}
                style={{ 
                  position: 'absolute', top: '20px', right: '20px', 
                  background: 'white', border: 'none', borderRadius: '50%', 
                  width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10
                }}
              >
                <X size={20} />
              </button>
              
              <div style={{ height: '400px', background: `${selectedSite.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {(() => {
                  const Icon = selectedSite.icon;
                  return <Icon size={120} color={selectedSite.color} />;
                })()}
              </div>
              
              <div style={{ padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>
                  <MapPin size={16} /> {selectedSite.location}
                </div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f3c28', marginBottom: '20px' }}>{selectedSite.title}</h2>
                <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.1rem' }}>
                  <p>{selectedSite.desc}</p>
                  <p style={{ marginTop: '20px' }}>
                    Situé au cœur de Dembéni, ce site fait partie intégrante de l'identité de notre commune. 
                    La municipalité s'engage activement dans sa préservation et sa mise en valeur pour les générations futures. 
                    Des visites guidées sont organisées régulièrement lors des grands événements culturels.
                  </p>
                </div>
                
                <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
                  <button 
                    onClick={() => navigate('/contact')}
                    style={{ padding: '14px 28px', borderRadius: '12px', background: '#0f3c28', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Réserver une visite
                  </button>
                  <button 
                    onClick={() => setSelectedSite(null)}
                    style={{ padding: '14px 28px', borderRadius: '12px', background: '#f1f5f9', color: '#475569', border: 'none', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Fermer
                  </button>
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
