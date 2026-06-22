import React, { useState, useEffect } from 'react';
import { Info, ArrowRight, ChevronRight, FileText, Shield, Hammer, Globe, Heart, FileCheck, Home, GraduationCap, MapPin, Zap, Music, BookOpen, Trash2, Users, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
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
    'Activity': Activity
};

const SubPage = ({ 
    title, 
    subtitle, 
    items: staticItems, 
    apiEndpoint,
    heroColor = '#0d4a3e',
    heroAccent = '#14b8a6'
}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        if (apiEndpoint) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(apiEndpoint);
                    if (response.data && response.data.success && response.data.data) {
                        setItems(response.data.data);
                    }
                } catch (err) {
                    console.error('Error fetching data:', err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else if (staticItems) {
            setItems(staticItems);
        }
    }, [apiEndpoint, staticItems]);

    const getIconComponent = (icon) => {
        if (typeof icon === 'string') {
            const IconComponent = iconMap[icon] || Activity;
            return <IconComponent size={32} />;
        }
        return icon;
    };

    return (
        <div className="sub-page">
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ 
                    height: '450px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${heroColor} 0%, ${heroAccent} 100%)`,
                    overflow: 'hidden'
                }}
            >
                {/* Decorative background shapes */}
                <div style={{ 
                    position: 'absolute', 
                    top: '-50%', 
                    left: '-10%', 
                    width: '500px', 
                    height: '500px', 
                    borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.05)' 
                }} />
                <div style={{ 
                    position: 'absolute', 
                    bottom: '-30%', 
                    right: '-5%', 
                    width: '400px', 
                    height: '400px', 
                    borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.08)' 
                }} />
                
                <div className="section-container" style={{ 
                    position: 'relative', 
                    zIndex: 2, 
                    textAlign: 'center', 
                    color: 'white' 
                }}>
                    <motion.h1 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '1rem' }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </motion.section>

            {/* Floating glass cards (Home-like visual) */}
            <div style={{ transform: 'translateY(-80px)', marginBottom: '-80px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 'min(1100px, 95%)', display: 'flex', gap: 20, justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(2,6,23,0.08)', position: 'relative' }}>
                        <img src={getStaticUrl('/mairie.jpg')} alt="mairie" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                        <div style={{ padding: 18, background: 'rgba(255,255,255,0.9)' }}>
                            <div style={{ fontSize: 12, color: '#16a34a', display: 'inline-flex', gap: 8, alignItems: 'center' }}><Info size={12} /> Démarches en ligne</div>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.1rem' }}>Accédez rapidement à vos formulaires officiels</h3>
                            <p style={{ margin: 0, color: '#64748b' }}>Retrouvez tous les formulaires et documents nécessaires pour vos démarches administratives.</p>
                        </div>
                    </div>
                    <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(2,6,23,0.08)', position: 'relative' }}>
                        <img src={getStaticUrl('/groupe.jpg')} alt="groupe" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                        <div style={{ padding: 18, background: 'rgba(255,255,255,0.9)' }}>
                            <div style={{ fontSize: 12, color: '#0d4a3e', display: 'inline-flex', gap: 8, alignItems: 'center' }}><Users size={12} /> Services de proximité</div>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.1rem' }}>Accompagnement personnalisé</h3>
                            <p style={{ margin: 0, color: '#64748b' }}>Vous ne trouvez pas le bon document ? Contactez nos guichets pour une aide dédiée.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <section style={{ padding: '100px 0' }}>
                <div className="section-container">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b' }}>
                            <p style={{ fontSize: '1.2rem' }}>Chargement...</p>
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '100px 0', color: '#ef4444' }}>
                            <p style={{ fontSize: '1.2rem' }}>Erreur de chargement : {error}</p>
                        </div>
                    ) : items.length > 0 ? (
                        <>
                            {/* Featured item - large showcase similar to Home */}
                            {items[0] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="featured-demarche"
                                    style={{
                                        display: 'flex',
                                        gap: '32px',
                                        marginBottom: '32px',
                                        alignItems: 'center',
                                        background: 'white',
                                        padding: '28px',
                                        borderRadius: 20,
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                                        border: '1px solid #e6eef0',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setActiveItem(items[0])}
                                >
                                    <div style={{ flex: '0 0 220px' }}>
                                        {items[0].image ? (
                                            <img src={items[0].image} alt={items[0].title} style={{ width: '220px', height: '140px', objectFit: 'cover', borderRadius: 12 }} />
                                        ) : (
                                            <div style={{ width: '220px', height: '140px', borderRadius: 12, background: `linear-gradient(135deg, ${heroColor} 0%, ${heroAccent} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                                                {getIconComponent(items[0].icon)}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h2 style={{ margin: 0, fontSize: '1.6rem' }}>{items[0].title}</h2>
                                        <p style={{ color: '#64748b', marginTop: '12px' }}>{items[0].description || items[0].desc}</p>
                                        <div style={{ marginTop: '18px', display: 'flex', gap: 12, alignItems: 'center' }}>
                                            {items[0].link && (
                                                <a href={items[0].link} target="_blank" rel="noopener noreferrer" onClick={(e)=>e.stopPropagation()} className="service-card-btn" style={{ background: '#eef2ff', color: heroColor, textDecoration: 'none', padding: '10px 16px', borderRadius: 10 }}>
                                                    Télécharger
                                                </a>
                                            )}
                                            <a href={`/admin?openDemarche=${items[0]._id}`} onClick={(e)=>e.stopPropagation()} style={{ color: heroColor, fontWeight: 700, textDecoration: 'none' }}>Gérer</a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Grid of remaining items */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '32px'
                            }}>
                                {items.slice(1).map((item, i) => (
                                    <motion.div 
                                        key={item._id || i}
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.08, duration: 0.5 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        whileHover={{ y: -10, transition: { duration: 0.25 } }}
                                        style={{
                                            background: 'white',
                                            borderRadius: '24px',
                                            padding: '32px',
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                                            border: '1px solid #e2e8f0',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease'
                                        }}
                                        onClick={() => setActiveItem(item)}
                                    >
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '14px',
                                            background: `linear-gradient(135deg, ${heroColor} 0%, ${heroAccent} 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '18px',
                                            color: 'white'
                                        }}>
                                            {getIconComponent(item.icon)}
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: '#1e293b' }}>
                                            {item.title}
                                        </h3>
                                        <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '18px' }}>
                                            {item.description || item.desc}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {item.link ? (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e)=>e.stopPropagation()} className="service-card-btn" style={{ background: '#eef2ff', color: heroColor, textDecoration: 'none', padding: '8px 14px', borderRadius: 10 }}>
                                                    Télécharger
                                                </a>
                                            ) : (
                                                <div style={{ color: heroColor, fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>En savoir plus <ChevronRight size={18} /></div>
                                            )}
                                            <a href={`/admin?openDemarche=${item._id}`} onClick={(e)=>e.stopPropagation()} style={{ color: heroColor, fontWeight: 700, textDecoration: 'none' }}>Gérer</a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b' }}>
                            <Info size={48} style={{ margin: '0 auto 20px', opacity: 0.2 }} />
                            <p style={{ fontSize: '1.2rem' }}>Le contenu de cette section est en cours de mise à jour.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Detail Modal (opened when an item is clicked) */}
            {activeItem && (
                <div className="demarche-modal-backdrop" onClick={() => setActiveItem(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
                    <div className="demarche-modal" onClick={(e) => e.stopPropagation()} style={{ width: 'min(900px, 95%)', background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 30px 60px rgba(2,6,23,0.4)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ margin: 0 }}>{activeItem.title}</h2>
                                <p style={{ color: '#64748b', marginTop: 8 }}>{activeItem.description || activeItem.desc}</p>
                                <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                                    {activeItem.link && (
                                        <a href={activeItem.link} target="_blank" rel="noopener noreferrer" className="service-card-btn" style={{ background: '#eef2ff', color: heroColor, textDecoration: 'none', padding: '10px 16px', borderRadius: 10 }}>
                                            Télécharger
                                        </a>
                                    )}
                                    <a href={`/admin?openDemarche=${activeItem._id}`} style={{ color: heroColor, fontWeight: 700, textDecoration: 'none' }}>Gérer</a>
                                </div>
                            </div>
                            <div style={{ width: 220, flex: '0 0 220px' }}>
                                {activeItem.image ? (
                                    <img src={activeItem.image} alt={activeItem.title} style={{ width: '220px', height: '140px', objectFit: 'cover', borderRadius: 8 }} />
                                ) : (
                                    <div style={{ width: '220px', height: '140px', borderRadius: 8, background: `linear-gradient(135deg, ${heroColor} 0%, ${heroAccent} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                                        {getIconComponent(activeItem.icon)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={() => setActiveItem(null)} style={{ position: 'absolute', top: 12, right: 12, border: 'none', background: 'transparent', fontSize: 24, cursor: 'pointer' }}>&times;</button>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <section style={{
                background: `linear-gradient(135deg, ${heroColor} 0%, ${heroAccent} 100%)`,
                padding: '80px 0',
                borderRadius: '0 0 40px 40px'
            }}>
                <div className="section-container" style={{ textAlign: 'center', color: 'white' }}>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: 800 }}>
                        Vous avez besoin d'aide ?
                    </h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
                        Notre équipe est là pour vous accompagner dans vos démarches.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '16px 40px',
                            background: 'white',
                            color: heroColor,
                            borderRadius: '16px',
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                    >
                        Contacter la mairie
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

export default SubPage;
