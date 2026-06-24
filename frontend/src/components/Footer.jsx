import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Footer.css';
import logo from '../assets/logo.svg';

// Configuration par défaut extraite pour plus de clarté
const DEFAULT_FOOTER_DATA = {
  brandDescription: 'Portail citoyen officiel de la commune de Dembéni, Mayotte. Simplifiez vos démarches administratives en ligne, en toute sécurité.',
  socialLinks: [
    { icon: 'fab fa-facebook-f', url: '#', title: 'Facebook' },
    { icon: 'fab fa-twitter', url: '#', title: 'Twitter' },
    { icon: 'fab fa-instagram', url: '#', title: 'Instagram' },
  ],
  navigationLinks: [
    { text: 'Accueil', url: '/' },
    { text: 'Démarches', url: '/demarches' },
    { text: 'Collecte', url: '/collecte' },
    { text: 'Service public', url: '/service-public' },
    { text: 'Contact', url: '/contact' },
  ],
  servicesLinks: [
    { text: 'État civil', url: '/demarches' },
    { text: 'Documents officiels', url: '/demarches' },
    { text: 'Urbanisme', url: '/demarches' },
    { text: 'Crèche', url: '/inscription' },
    { text: 'Encombrants', url: '/collecte' },
  ],
  contact: {
    address: 'Mairie de Dembéni, Mayotte 97680',
    phone: '+262 269 XX XX XX',
    email: 'dembenimairie@gmail.com',
    openingHours: 'Lun–Ven · 8h00 – 16h30',
  },
  copyrightText: '© 2026 Mairie de Dembéni — Tous droits réservés',
  legalLinks: [
    { text: 'Mentions légales', url: '#' },
    { text: 'Confidentialité', url: '#' },
    { text: 'Accessibilité', url: '#' },
  ],
};

// Fonction utilitaire pour fusionner les données API avec les valeurs par défaut
const mergeFooterData = (apiData) => {
  if (!apiData) return DEFAULT_FOOTER_DATA;

  return {
    brandDescription: apiData.brandDescription || DEFAULT_FOOTER_DATA.brandDescription,
    socialLinks: apiData.socialLinks?.length ? apiData.socialLinks : DEFAULT_FOOTER_DATA.socialLinks,
    navigationLinks: apiData.navigationLinks?.length ? apiData.navigationLinks : DEFAULT_FOOTER_DATA.navigationLinks,
    servicesLinks: apiData.servicesLinks?.length ? apiData.servicesLinks : DEFAULT_FOOTER_DATA.servicesLinks,
    contact: {
      address: apiData.address || DEFAULT_FOOTER_DATA.contact.address,
      phone: apiData.phone || DEFAULT_FOOTER_DATA.contact.phone,
      email: apiData.email || DEFAULT_FOOTER_DATA.contact.email,
      openingHours: apiData.openingHours || DEFAULT_FOOTER_DATA.contact.openingHours,
    },
    copyrightText: apiData.copyrightText || DEFAULT_FOOTER_DATA.copyrightText,
    legalLinks: apiData.legalLinks?.length ? apiData.legalLinks : DEFAULT_FOOTER_DATA.legalLinks,
  };
};

// Sous-composants pour améliorer la lisibilité et la réutilisabilité
const FooterLogo = () => (
  <Link to="/" className="footer-logo" aria-label="Retour à l'accueil">
    <img src={logo} alt="Mairie de Dembéni" className="footer-logo-img" />
    <span className="logo-name">DEMBÉNI<em>.</em></span>
  </Link>
);

const SocialLinks = ({ links }) => (
  <div className="footer-socials" role="list" aria-label="Réseaux sociaux">
    {links.map((link, index) => (
      <a
        key={`social-${index}`}
        href={link.url}
        title={link.title}
        aria-label={link.title}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className={link.icon} aria-hidden="true" />
      </a>
    ))}
  </div>
);

const FooterNavColumn = ({ title, links }) => (
  <div className="footer-col">
    <h4>{title}</h4>
    <ul role="list">
      {links.map((link, index) => (
        <li key={`nav-${index}`}>
          <Link to={link.url}>{link.text}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactInfo = ({ contact }) => {
  const contactItems = [
    { icon: 'fas fa-map-marker-alt', text: contact.address, label: 'Adresse' },
    { icon: 'fas fa-phone', text: contact.phone, label: 'Téléphone' },
    { icon: 'fas fa-envelope', text: contact.email, label: 'Email' },
    { icon: 'far fa-clock', text: contact.openingHours, label: 'Horaires d\'ouverture' },
  ];

  return (
    <div className="footer-col">
      <h4>Contact</h4>
      <div role="list" aria-label="Informations de contact">
        {contactItems.map((item, index) => (
          <div key={`contact-${index}`} className="footer-contact-item">
            <i className={item.icon} aria-hidden="true" />
            <span aria-label={item.label}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FooterBottom = ({ copyrightText, legalLinks }) => (
  <div className="footer-bottom">
    <p>{copyrightText}</p>
    <nav className="footer-bottom-links" aria-label="Liens légaux">
      {legalLinks.map((link, index) => (
        <a key={`legal-${index}`} href={link.url}>
          {link.text}
        </a>
      ))}
    </nav>
  </div>
);

const Footer = () => {
  const [footerData, setFooterData] = useState(DEFAULT_FOOTER_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await api.get('/content/footer');
        setFooterData(mergeFooterData(response.data));
      } catch (error) {
        console.warn('Erreur lors du chargement des données du footer:', error);
        // Garde les données par défaut en cas d'erreur
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Mémorisation pour éviter des recalculs inutiles
  const memoizedFooterData = useMemo(() => footerData, [footerData]);

  if (isLoading) {
    return (
      <footer className="footer footer--loading" aria-label="Pied de page - Chargement en cours">
        <div className="footer-loading" role="status">
          <span className="sr-only">Chargement du pied de page...</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top h-container">
        <div className="footer-brand">
          <FooterLogo />
          <p className="footer-desc">{memoizedFooterData.brandDescription}</p>
          <SocialLinks links={memoizedFooterData.socialLinks} />
        </div>

        <FooterNavColumn title="Navigation" links={memoizedFooterData.navigationLinks} />
        <FooterNavColumn title="Services" links={memoizedFooterData.servicesLinks} />
        <ContactInfo contact={memoizedFooterData.contact} />
      </div>

      <FooterBottom 
        copyrightText={memoizedFooterData.copyrightText} 
        legalLinks={memoizedFooterData.legalLinks} 
      />
    </footer>
  );
};

export default Footer;