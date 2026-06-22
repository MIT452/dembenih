import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStaticUrl } from '../utils/getStaticUrl';
import { Info, ArrowRight, CreditCard, Trash2, Utensils, Baby, Palette, ClipboardList } from 'lucide-react';

const Services = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const services = [
    { title: "Identité civile & ANTS", desc: "Suivez vos demandes et renouvellements de Passeport ou CNI en ligne.", icon: <CreditCard size={20} /> },
    { title: "Gestion environnementale", desc: "Planifiez la collecte d'encombrants et signalez une anomalie sur la voie publique.", icon: <Trash2 size={20} /> },
    { title: "Paiement cantine", desc: "Consultez les menus et réglez les factures de restauration scolaire en ligne.", icon: <Utensils size={20} /> },
    { title: "Petite Enfance & Crèche", desc: "Déposez votre dossier d'inscription en crèche et suivez les affectations.", icon: <Baby size={20} /> },
    { title: "Agenda territorial", desc: "Consultez les actions de prévention et inscrivez-vous aux ateliers.", icon: <Palette size={20} /> },
    { title: "Démarches administratives", desc: "Accédez instantanément au guichet virtuel pour vos requêtes civiles.", icon: <ClipboardList size={20} /> },
  ];

  const accordionItems = [
    {
      q: "Comment programmer un enlèvement d'encombrants à domicile ?",
      a: "Vous pouvez en faire la demande depuis votre Espace Citoyen dans l'onglet 'Démarches'."
    },
    {
      q: "Quels types de déchets sont acceptés par le service ?",
      a: "Sont acceptés les appareils électroménagers hors d'usage, le mobilier usagé, les matelas et les cartons volumineux."
    },
    {
      q: "Quels sont les jours de collecte ordinaires ?",
      a: "La collecte des ordures ménagères s'effectue trois fois par semaine (Lundi, Mercredi et Vendredi matin)."
    }
  ];

  const toggleAccordion = (i) => setActiveAccordion(activeAccordion === i ? null : i);

  return (
    <div className="services-page">
      <section className="immersive-hero small-hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${getStaticUrl('/mairie.jpg')})` }} />
        <div className="hero-overlay-gradient" />
        <div className="hero-content-all">
          <div className="hero-text-block">
            <h1 className="hero-title-main">Services Publics</h1>
            <p className="hero-desc-main">Une administration proche de vous, à votre écoute au quotidien.</p>
            <div className="hero-btns-centered">
              <Link to="/demarches" className="btn-hero-pill-primary">Accéder aux démarches <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="section-header">
          <div className="section-tag" style={{ background: '#eafaf1', color: '#16a34a' }}><Info size={12} /> Démarches en ligne</div>
          <h2 className="section-title-modern">Vos démarches administratives simplifiées</h2>
          <p className="section-subtitle-modern">Accédez en quelques clics à l'ensemble de nos guichets numériques.</p>
        </div>

        <div className="services-grid-modern">
          {services.map((s, i) => (
            <div key={i} className="service-card-modern">
              <div className="service-card-icon-wrap">{s.icon}</div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.desc}</p>
              <Link to="/demarches" className="service-card-btn">Accéder au service <ArrowRight size={14} /></Link>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3 style={{ marginBottom: '16px' }}>Foire aux questions</h3>
          <div className="accordion">
            {accordionItems.map((it, i) => (
              <div key={i} className={`accordion-item ${activeAccordion === i ? 'open' : ''}`}>
                <button onClick={() => toggleAccordion(i)} className="accordion-btn">{it.q}</button>
                {activeAccordion === i && <div className="accordion-body"><p>{it.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
