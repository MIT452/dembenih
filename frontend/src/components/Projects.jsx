import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { getStaticUrl } from '../utils/getStaticUrl';
import { ArrowRight, Info, Users, Hammer, Globe, MapPin } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

// Simple error boundary for sections
class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('Section crash:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, background: '#fee2e2', color: '#991b1b', borderRadius: 12 }}>
          Section momentanément indisponible
        </div>
      );
    }
    return this.props.children;
  }
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await api.get('/projets');
        if (mounted && res.data && res.data.data) setProjects(res.data.data);
      } catch (err) {
        console.error('Erreur récupération projets', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="projects-page">
      <section className="immersive-hero">
        <div className="hero-bg" />
        <div className="hero-overlay-gradient" />
        <div className="hero-content-all">
          <div className="hero-text-block">
            <h1 className="hero-title-main">Grands Projets</h1>
            <p className="hero-desc-main">Découvrez les chantiers qui façonnent le Dembéni de demain.</p>
            <div className="hero-btns-centered">
              <Link to="/projet" className="btn-hero-pill-primary">Voir tous les projets <ArrowRight size={14} /></Link>
              <Link to="/contact" className="btn-hero-pill-secondary">Nous contacter <ArrowRight size={14} /></Link>
            </div>
          </div>

          <div className="floating-cards-container">
            <div className="floating-card vertical-card">
              <img src={getStaticUrl('/market_dembeni.png')} alt="Marché" className="card-full-image" />
              <div className="card-footer-glass">
                <div className="card-footer-icon-circle"><Hammer size={18} /></div>
                <div className="card-footer-text">
                  <span className="card-tag">URBANISME</span>
                  <p className="card-footer-desc">Aménagements de voirie et marchés rénovés pour dynamiser le commerce local.</p>
                </div>
              </div>
            </div>

            <div className="floating-card wide-card">
              <img src={getStaticUrl('/groupe.jpg')} alt="Projet social" className="card-full-image" />
              <div className="card-footer-glass">
                <div className="card-footer-icon-circle"><Users size={18} /></div>
                <div className="card-footer-text">
                  <span className="card-tag">COHÉSION</span>
                  <p className="card-footer-desc">Projets d'espace public et équipements pour les associations locales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionErrorBoundary>
        <section className="services-section" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
          <div className="section-header">
            <div className="section-tag" style={{ background: '#eef2ff', color: '#1e40af' }}><Info size={12} /> Projets</div>
            <h2 className="section-title-modern">Suivi des projets communaux</h2>
            <p className="section-subtitle-modern">Fiches détaillées, état d'avancement et contacts.</p>
          </div>

          <div className="services-grid-modern" style={{ gap: 24 }}>
            {loading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0', color: '#64748b' }}>Chargement des projets...</div>
            ) : projects.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0', color: '#64748b' }}>Aucun projet pour le moment.</div>
            ) : (
              projects.map((p, i) => (
                <div key={p._id || i} className="service-card-modern" style={{ cursor: 'pointer' }} onClick={() => setActiveModal(p)}>
                  <div className="service-card-icon-wrap"><MapPin size={18} /></div>
                  <h3 className="service-card-title">{p.title}</h3>
                  <p className="service-card-desc">{p.description && p.description.length > 160 ? p.description.slice(0, 160) + '…' : p.description}</p>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Link to={`/projet/${p._id || ''}`} className="service-card-btn" onClick={(e) => e.stopPropagation()}>En savoir plus <ArrowRight size={14} /></Link>
                      {user && user.role === 'admin' && (
                        <Link to={`/admin?openProjet=${p._id}`} className="service-card-btn" style={{ background: '#eef2ff', color: '#1e40af' }} onClick={(e) => e.stopPropagation()}>Gérer <ArrowRight size={12} /></Link>
                      )}
                    </div>
                </div>
              ))
            )}
          </div>
        </section>
      </SectionErrorBoundary>

      {activeModal && (
        <div className="commune-portal-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="commune-portal-modal" onClick={(e) => e.stopPropagation()}>
            <button className="commune-modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
            <div className="commune-modal-grid">
              <div className="commune-modal-media">
                <img src={activeModal.image || getStaticUrl('/market_dembeni.png')} alt={activeModal.title} className="commune-modal-img" />
              </div>
              <div className="commune-modal-info">
                <h2>{activeModal.title}</h2>
                <p className="commune-modal-text">{activeModal.description || activeModal.fullDesc}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                  <div style={{ padding: 12, borderRadius: 10, background: '#f1f5f9' }}><Hammer size={18} /></div>
                  <div style={{ padding: 12, borderRadius: 10, background: '#f1f5f9' }}><Globe size={18} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
