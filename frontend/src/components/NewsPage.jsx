import React, { useEffect, useState } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ArrowRight, X, Newspaper, TrendingUp, Users, Zap, Eye, Share2 } from 'lucide-react';

const couleursParCategorie = {
  'Vie citoyenne': { bg: '#d1fae5', text: '#065f46' },
  'Environnement': { bg: '#dcfce7', text: '#166534' },
  'Jeunesse': { bg: '#fef3c7', text: '#92400e' },
  'Sécurité': { bg: '#dbeafe', text: '#1e40af' },
  'Santé & Solidarité': { bg: '#fce7f3', text: '#9f1239' },
  'Urbanisme': { bg: '#ede9fe', text: '#5b21b6' },
  'Éducation': { bg: '#ccfbf1', text: '#0f766e' },
  'Services publics': { bg: '#e0f2fe', text: '#0c4a6e' },
  'Développement local': { bg: '#ffedd5', text: '#9a3412' },
  'Général': { bg: '#f1f5f9', text: '#475569' }
};

const fallbackImagesByCategory = {
  'Vie citoyenne': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  'Environnement': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  'Jeunesse': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
  'Sécurité': 'https://images.unsplash.com/photo-1542975155-61bd5f2b4a0b?auto=format&fit=crop&w=1200&q=80',
  'Santé & Solidarité': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  'Urbanisme': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'Éducation': 'https://images.unsplash.com/photo-1427504494785-cdff860cbf90?auto=format&fit=crop&w=1200&q=80',
  'Services publics': 'https://images.unsplash.com/photo-1552821206-7bc4d3a523cd?auto=format&fit=crop&w=1200&q=80',
  'Développement local': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'Général': 'https://images.unsplash.com/photo-1470229722913-7f419344ca51?auto=format&fit=crop&w=1200&q=80'
};

// Use local hero image from public/ for offline / faster loading
const newsHeroImage = '/hero_bg_modern.png';

const getDisplayImage = (item) => {
  const image = item.image?.trim() || item.coverImage?.trim();
  if (image) return image;
  const cat = item.category || item.categorie || 'Général';
  return fallbackImagesByCategory[cat] || fallbackImagesByCategory['Général'];
};

const getSafeImageSrc = (item) => getDisplayImage(item) || '/news_concert.png';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    api.get('/publications?status=published')
      .then(res => {
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          const filteredNews = res.data.data.filter(pub => pub.type !== 'evenement');
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

  const filtered = news.filter(n => 
    (n.title || n.titre || '').toLowerCase().includes(search.toLowerCase()) ||
    (n.category || n.categorie || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#fcfdfb', color: '#0f172a' }}>
      {/* 1. HERO SECTION IMMERSIVE */}
      <section style={{ 
        height: '55vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: `url('${newsHeroImage}')`,
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
            L'actualité de votre commune
          </motion.span>
          <motion.h1
            className="h-title news-page-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Actualités de Dembéni
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}
          >
            Suivez toutes les actualités, projets et initiatives qui font vivre notre commune avec dynamisme et transparence.
          </motion.p>
        </div>
      </section>

      {/* 2. INFOS RAPIDES / STATISTIQUES */}
      <section className="h-container" style={{ marginTop: '-50px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          background: 'white',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
        }}>
          {[
            { icon: <Newspaper className="text-emerald-600" size={28} />, title: "Articles publiés", desc: news.length + " articles" },
            { icon: <Eye className="text-emerald-600" size={28} />, title: "Transparence", desc: "100% d'informations" },
            { icon: <TrendingUp className="text-emerald-600" size={28} />, title: "Projets en cours", desc: "Tous les développements" }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', borderRight: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>{item.icon}</div>
              <h4 style={{ fontWeight: 800, margin: '0 0 5px 0' }}>{item.title}</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. RECHERCHE & ARTICLES */}
      <section style={{ padding: '100px 0' }}>
        <div className="h-container">
          
          {/* Titre & Description */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f3c28', margin: 0 }}>Nos Articles Récents</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '10px' }}>Restez informé de tous les développements.</p>
            </div>
          </div>

          {/* Search bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto 60px', position: 'relative' }}>
            <div className="h-admin__search-wrap">
              <Search className="h-admin__search-icon" size={20} />
              <input 
                type="text" 
                className="h-admin__search-input"
                placeholder="Rechercher un article ou une catégorie..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '20px', color: '#64748b' }}>Chargement des actualités...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ background: 'white', padding: '60px', borderRadius: '24px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
              <Newspaper size={48} style={{ color: '#94a3b8', marginBottom: '20px' }} />
              <h3 style={{ margin: 0, color: '#64748b' }}>Aucun article ne correspond à votre recherche.</h3>
              <p style={{ color: '#94a3b8' }}>Essayez avec d'autres mots-clés ou catégories.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
              {filtered.map((item, i) => (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -8 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedNews(item)}
                  style={{ 
                    cursor: 'pointer', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    background: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: couleursParCategorie[item.category || item.categorie || 'Général']?.bg || '#f1f5f9' }}>
                    <img
                      src={getSafeImageSrc(item)}
                      alt={item.title || item.titre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/news_concert.png'; }}
                    />
                    {/* Category Badge */}
                    <span style={{ 
                      position: 'absolute', 
                      top: '1rem', 
                      left: '1rem',
                      fontSize: '0.7rem', 
                      fontWeight: 800, 
                      color: couleursParCategorie[item.category || item.categorie || 'Général']?.text || '#475569',
                      background: couleursParCategorie[item.category || item.categorie || 'Général']?.bg || '#f1f5f9',
                      padding: '6px 12px',
                      borderRadius: '20px'
                    }}>
                      {item.category || item.categorie || 'Général'}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Date */}
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                      <Clock size={14} /> {new Date(item.createdAt || item.date || Date.now()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 850, marginBottom: '12px', color: '#0f172a', lineHeight: '1.4' }}>
                      {item.title || item.titre}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: 'auto', lineHeight: '1.6' }}>
                      {(item.content || item.contenu || '').substring(0, 130)}...
                    </p>

                    {/* CTA Button */}
                    <motion.button 
                      whileHover={{ x: 4 }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        background: 'none', 
                        border: 'none', 
                        color: '#10b981', 
                        fontWeight: 800, 
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedNews && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(12px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{ maxWidth: '900px', width: '100%', background: 'white', borderRadius: '32px', overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
            >
              {/* Image Header */}
              <div style={{ position: 'relative', height: '350px', flexShrink: 0, background: couleursParCategorie[selectedNews.category || selectedNews.categorie || 'Général']?.bg || '#f1f5f9', overflow: 'hidden' }}>
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={getSafeImageSrc(selectedNews)}
                  alt={selectedNews.title || selectedNews.titre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/news_concert.png'; }}
                />
                {/* Overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)' }} />
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedNews(null)} 
                  style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    right: '20px', 
                    background: 'rgba(255,255,255,0.95)', 
                    borderRadius: '50%', 
                    width: '44px',
                    height: '44px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <X size={22} color="#0f172a" />
                </button>

                {/* Category Badge */}
                <div style={{ position: 'absolute', bottom: '20px', left: '30px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    color: couleursParCategorie[selectedNews.category || selectedNews.categorie || 'Général']?.text || '#475569',
                    background: couleursParCategorie[selectedNews.category || selectedNews.categorie || 'Général']?.bg || '#f1f5f9',
                    padding: '8px 16px',
                    borderRadius: '20px'
                  }}>
                    {selectedNews.category || selectedNews.categorie || 'Général'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '40px', overflowY: 'auto', flex: 1 }}>
                {/* Meta Info */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} color="#10b981" />
                    {new Date(selectedNews.createdAt || selectedNews.date || Date.now()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px', color: '#0f172a', lineHeight: '1.3' }}>
                  {selectedNews.title || selectedNews.titre}
                </h2>

                {/* Full Content */}
                <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', whiteSpace: 'pre-wrap' }}>
                  {selectedNews.content || selectedNews.contenu}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                  <button 
                    style={{ 
                      padding: '12px 24px', 
                      borderRadius: '12px', 
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none', 
                      color: 'white', 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Share2 size={16} /> Partager
                  </button>
                  <button 
                    onClick={() => setSelectedNews(null)}
                    style={{ 
                      padding: '12px 24px', 
                      borderRadius: '12px', 
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0', 
                      color: '#0f172a', 
                      fontWeight: 700, 
                      cursor: 'pointer' 
                    }}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsPage;
