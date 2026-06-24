import React, { useEffect, useState, useCallback } from 'react';
import api from '../api';
import getStaticUrl from '../utils/getStaticUrl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Clock, ArrowRight, X, Newspaper, TrendingUp, Users, Zap, 
    Eye, Share2, BadgeCheck, Calendar, Tag, Filter, BookOpen
} from 'lucide-react';

const couleursParCategorie = {
  'Vie citoyenne': { bg: '#d1fae5', text: '#065f46', gradient: 'from-emerald-500 to-green-600' },
  'Environnement': { bg: '#dcfce7', text: '#166534', gradient: 'from-green-500 to-teal-600' },
  'Jeunesse': { bg: '#fef3c7', text: '#92400e', gradient: 'from-amber-500 to-orange-600' },
  'Sécurité': { bg: '#dbeafe', text: '#1e40af', gradient: 'from-blue-500 to-indigo-600' },
  'Santé & Solidarité': { bg: '#fce7f3', text: '#9f1239', gradient: 'from-pink-500 to-rose-600' },
  'Urbanisme': { bg: '#ede9fe', text: '#5b21b6', gradient: 'from-violet-500 to-purple-600' },
  'Éducation': { bg: '#ccfbf1', text: '#0f766e', gradient: 'from-teal-500 to-cyan-600' },
  'Services publics': { bg: '#e0f2fe', text: '#0c4a6e', gradient: 'from-sky-500 to-blue-600' },
  'Développement local': { bg: '#ffedd5', text: '#9a3412', gradient: 'from-orange-500 to-red-600' },
  'Général': { bg: '#f1f5f9', text: '#475569', gradient: 'from-slate-500 to-gray-600' }
};

const fallbackImagesByCategory = {
  'Vie citoyenne': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80',
  'Environnement': 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80',
  'Jeunesse': 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80',
  'Sécurité': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
  'Santé & Solidarité': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
  'Urbanisme': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  'Éducation': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80',
  'Services publics': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
  'Développement local': 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=1200&q=80',
  'Général': 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&q=80'
};

const heroImages = [
  'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1600&q=80', // Journal
  'https://images.unsplash.com/photo-1557428893-10093521e3d7?w=1600&q=80', // Réunion publique
  'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1600&q=80', // Conférence
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80', // Mairie
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80', // Communauté
];

const getDisplayImage = (item) => {
  if (!item) return null;
  const imgField = item.image ?? item.coverImage;
  if (!imgField) {
    const cat = item.category || item.categorie || 'Général';
    return fallbackImagesByCategory[cat] || fallbackImagesByCategory['Général'];
  }
  if (typeof imgField === 'string') {
    const trimmed = imgField.trim();
    if (trimmed) return trimmed;
  }
  if (typeof imgField === 'object') {
    return imgField.secure_url || imgField.url || imgField.path || imgField.src || null;
  }
  return null;
};

const getSafeImageSrc = (item) => {
  const src = getDisplayImage(item);
  return src || getStaticUrl('/news_concert.png');
};

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  // Rotation automatique des images du hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api.get('/publications?status=published')
      .then(res => {
        console.log('Publications API response:', res.data);
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          const filteredNews = res.data.data.filter(pub => pub.type !== 'evenement');
          console.log('Filtered news (sample images):', filteredNews.slice(0,5).map(n => n.image));
          setNews(filteredNews);
        } else {
          setNews([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des actualités CMS:", err);
        setLoading(false);
      });
  }, []);

  // Catégories uniques pour le filtre
  const categories = ['Toutes', ...new Set(news.map(n => n.category || n.categorie || 'Général'))];

  // Filtrage combiné
  const filtered = news.filter(n => {
    const matchSearch = (n.title || n.titre || '').toLowerCase().includes(search.toLowerCase()) ||
                        (n.content || n.contenu || '').toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Toutes' || (n.category || n.categorie || 'Général') === selectedCategory;
    return matchSearch && matchCategory;
  });

  // Statistiques dynamiques
  const stats = [
    { 
      icon: <Newspaper size={28} />, 
      title: "Articles publiés", 
      value: `${news.length}+`,
      desc: "Actualités disponibles",
      color: '#10b981'
    },
    { 
      icon: <Tag size={28} />, 
      title: "Catégories", 
      value: `${categories.length - 1}`,
      desc: "Thématiques couvertes",
      color: '#3b82f6'
    },
    { 
      icon: <Clock size={28} />, 
      title: "Mise à jour", 
      value: "Régulière",
      desc: "Informations fraîches",
      color: '#f59e0b'
    },
    { 
      icon: <Eye size={28} />, 
      title: "Transparence", 
      value: "100%",
      desc: "Accès libre",
      color: '#8b5cf6'
    }
  ];

  // Fermer le modal avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedNews(null);
    };
    if (selectedNews) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedNews]);

  return (
    <div style={{ background: '#f8fafc', color: '#0f172a' }}>
      {/* 1. HERO SECTION IMMERSIVE AVEC IMAGES CHANGEANTES */}
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
            background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.7) 40%, rgba(16,185,129,0.8) 100%)',
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
              top: '-20%', 
              right: '-8%', 
              width: '400px', 
              height: '400px', 
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
              bottom: '-25%', 
              left: '-8%', 
              width: '450px', 
              height: '450px', 
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
                background: currentHeroImage === index ? '#10b981' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: currentHeroImage === index ? '0 2px 12px rgba(16,185,129,0.5)' : 'none'
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
                L'actualité de votre commune
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
            Actualités de Dembéni
          </motion.h1>
          
          {/* Sous-titre */}
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{ 
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', 
              maxWidth: '700px', 
              margin: '0 auto 2.5rem auto', 
              opacity: 0.9,
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            Suivez toutes les actualités, projets et initiatives qui font vivre notre commune avec dynamisme et transparence.
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
              <BookOpen size={18} />
              Découvrir les articles
              <ArrowRight size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              Voir les événements
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
                  {item.icon}
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                {item.value}
              </div>
              <h4 style={{ fontWeight: 700, margin: '0 0 4px 0', color: '#334155', fontSize: '0.95rem' }}>{item.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. RECHERCHE & FILTRES */}
      <section style={{ padding: '80px 0 100px' }}>
        <div className="h-container">
          
          {/* En-tête de section */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ 
                fontSize: 'clamp(2rem, 4vw, 2.8rem)', 
                fontWeight: 900, 
                color: '#0f172a', 
                margin: '0 0 12px',
                letterSpacing: '-0.02em'
              }}>
                Nos Articles Récents
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                Restez informé de tous les développements de votre commune
              </p>
            </motion.div>
          </div>

          {/* Barre de recherche */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '650px', margin: '0 auto 30px' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '20px',
              padding: '6px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              border: '2px solid #f1f5f9'
            }}>
              <Search size={20} style={{ marginLeft: '16px', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Rechercher un article, une catégorie..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '14px 16px',
                  fontSize: '1rem',
                  background: 'transparent',
                  color: '#0f172a'
                }}
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
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
                  <X size={16} />
                </button>
              )}
              <button style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
              }}>
                <Search size={18} />
                Rechercher
              </button>
            </div>
          </motion.div>

          {/* Filtres par catégorie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '50px'
            }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '50px',
                  border: selectedCategory === cat ? '2px solid #10b981' : '2px solid #e2e8f0',
                  background: selectedCategory === cat ? '#f0fdf4' : 'white',
                  color: selectedCategory === cat ? '#059669' : '#64748b',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Filter size={14} />
                  {cat}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Grille d'articles */}
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
                  marginBottom: '24px'
                }} 
              />
              <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Chargement des actualités...</p>
            </div>
          ) : filtered.length === 0 ? (
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
                background: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Newspaper size={36} style={{ color: '#94a3b8' }} />
              </div>
              <h3 style={{ margin: '0 0 8px', color: '#64748b', fontSize: '1.3rem' }}>
                {search || selectedCategory !== 'Toutes' ? 'Aucun article trouvé' : 'Aucun article disponible'}
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
                {search || selectedCategory !== 'Toutes' 
                  ? 'Essayez avec d\'autres mots-clés ou catégories.' 
                  : 'Les actualités seront bientôt publiées.'}
              </p>
              {(search || selectedCategory !== 'Toutes') && (
                <button
                  onClick={() => { setSearch(''); setSelectedCategory('Toutes'); }}
                  style={{
                    padding: '12px 28px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  Réinitialiser les filtres
                </button>
              )}
            </motion.div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
              {filtered.map((item, i) => {
                const category = item.category || item.categorie || 'Général';
                const colors = couleursParCategorie[category] || couleursParCategorie['Général'];
                
                return (
                  <motion.div
                    key={item._id}
                    whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedNews(item)}
                    style={{ 
                      cursor: 'pointer', 
                      borderRadius: '24px', 
                      overflow: 'hidden', 
                      background: 'white',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                      border: '1px solid #f1f5f9',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Image */}
                    <div style={{ 
                      position: 'relative', 
                      height: '220px', 
                      overflow: 'hidden', 
                      background: colors.bg 
                    }}>
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                        src={getSafeImageSrc(item)}
                        alt={item.title || item.titre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getStaticUrl('/news_concert.png'); }}
                      />
                      
                      {/* Gradient overlay */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '80px',
                        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)'
                      }} />
                      
                      {/* Badge catégorie */}
                      <span style={{ 
                        position: 'absolute', 
                        top: '16px', 
                        left: '16px',
                        fontSize: '0.75rem', 
                        fontWeight: 800, 
                        color: colors.text,
                        background: colors.bg,
                        padding: '8px 16px',
                        borderRadius: '25px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(4px)'
                      }}>
                        {category}
                      </span>
                    </div>

                    {/* Contenu */}
                    <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Date */}
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: '#94a3b8', 
                        marginBottom: '14px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontWeight: 600 
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#10b981'
                        }} />
                        <Clock size={14} /> 
                        {new Date(item.createdAt || item.date || Date.now()).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>

                      {/* Titre */}
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 800, 
                        marginBottom: '12px', 
                        color: '#0f172a', 
                        lineHeight: '1.4' 
                      }}>
                        {item.title || item.titre}
                      </h3>

                      {/* Description */}
                      <p style={{ 
                        fontSize: '0.95rem', 
                        color: '#64748b', 
                        marginBottom: 'auto', 
                        lineHeight: '1.7',
                        flex: 1
                      }}>
                        {(item.content || item.contenu || '').substring(0, 140)}...
                      </p>

                      {/* Bouton Lire la suite */}
                      <motion.button 
                        whileHover={{ x: 5 }}
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
                          marginTop: '20px',
                          fontSize: '0.95rem'
                        }}
                      >
                        Lire la suite <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal détaillé amélioré */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              background: 'rgba(15,23,42,0.8)', 
              backdropFilter: 'blur(16px)', 
              zIndex: 2000, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '20px' 
            }}
            onClick={() => setSelectedNews(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                maxWidth: '900px', 
                width: '100%', 
                background: 'white', 
                borderRadius: '32px', 
                overflow: 'hidden', 
                maxHeight: '90vh', 
                display: 'flex', 
                flexDirection: 'column', 
                boxShadow: '0 40px 80px rgba(0,0,0,0.3)' 
              }}
            >
              {/* Image Header */}
              <div style={{ 
                position: 'relative', 
                height: '350px', 
                flexShrink: 0, 
                background: couleursParCategorie[selectedNews.category || selectedNews.categorie || 'Général']?.bg || '#f1f5f9', 
                overflow: 'hidden' 
              }}>
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={getSafeImageSrc(selectedNews)}
                  alt={selectedNews.title || selectedNews.titre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getStaticUrl('/news_concert.png'); }}
                />
                
                {/* Overlay */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)' 
                }} />
                
                {/* Bouton fermer */}
                <motion.button 
                  whileHover={{ scale: 1.1, background: 'white' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedNews(null)} 
                  style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    right: '20px', 
                    background: 'rgba(255,255,255,0.9)', 
                    borderRadius: '50%', 
                    width: '44px',
                    height: '44px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer', 
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <X size={22} color="#0f172a" />
                </motion.button>

                {/* Badge catégorie */}
                <div style={{ position: 'absolute', bottom: '24px', left: '32px' }}>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 800, 
                    color: couleursParCategorie[selectedNews.category || selectedNews.categorie || 'Général']?.text || '#475569',
                    background: couleursParCategorie[selectedNews.category || selectedNews.categorie || 'Général']?.bg || '#f1f5f9',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    {selectedNews.category || selectedNews.categorie || 'Général'}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div style={{ padding: '40px', overflowY: 'auto', flex: 1 }}>
                {/* Meta informations */}
                <div style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  marginBottom: '24px', 
                  fontSize: '0.9rem', 
                  color: '#94a3b8', 
                  fontWeight: 600,
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} color="#10b981" />
                    {new Date(selectedNews.createdAt || selectedNews.date || Date.now()).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#10b981" />
                    Lecture 5 min
                  </div>
                </div>

                {/* Titre */}
                <h2 style={{ 
                  fontSize: '2.2rem', 
                  fontWeight: 900, 
                  marginBottom: '24px', 
                  color: '#0f172a', 
                  lineHeight: '1.3',
                  letterSpacing: '-0.02em'
                }}>
                  {selectedNews.title || selectedNews.titre}
                </h2>

                {/* Contenu complet */}
                <div style={{ 
                  fontSize: '1.05rem', 
                  lineHeight: '1.9', 
                  color: '#334155', 
                  whiteSpace: 'pre-wrap' 
                }}>
                  {selectedNews.content || selectedNews.contenu}
                </div>

                {/* Actions */}
                <div style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  marginTop: '40px', 
                  paddingTop: '24px', 
                  borderTop: '1px solid #e2e8f0',
                  flexWrap: 'wrap'
                }}>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ 
                      padding: '14px 28px', 
                      borderRadius: '14px', 
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none', 
                      color: 'white', 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
                    }}
                  >
                    <Share2 size={16} /> Partager l'article
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedNews(null)}
                    style={{ 
                      padding: '14px 28px', 
                      borderRadius: '14px', 
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0', 
                      color: '#0f172a', 
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

export default NewsPage;