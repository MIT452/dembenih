# 🇰🇲 Portail Citoyen - Mairie de Dembéni

Une plateforme numérique moderne et immersive développée pour la commune de **Dembéni (Mayotte)**. Ce projet vise à digitaliser les services municipaux et à renforcer le lien entre l'administration et les citoyens.

---

## 🚀 Fonctionnalités Clés

### 🏛️ Espace Administration (CMS)
- **Gestion du Contenu** : Publication d'actualités, d'événements culturels et de projets urbains.
- **Gestion des Services** : Mise à jour dynamique des services publics offerts.
- **Messagerie Centralisée** : Consultation et réponse aux messages envoyés par les citoyens avec support des pièces jointes (photos).
- **Contrôle d'Accès** : Sécurité renforcée avec rôles administrateurs et authentification JWT.

### 👥 Espace Citoyen
- **Tableau de Bord Personnel** : Suivi des demandes administratives en temps réel.
- **Messagerie Directe** : Envoi de messages sécurisés au secrétariat avec possibilité d'ajouter des photos.
- **Identité Numérique** : Gestion du profil et des informations de contact.

### 🎨 Vitrine Communale
- **Culture & Patrimoine** : Page immersive présentant les sites historiques (Mosquée, Usine Sucrière) et l'agenda culturel dynamique.
- **Services de Santé** : Informations complètes sur le CCAS et les centres de soins de proximité.
- **Design Moderne** : Interface responsive, fluide et animée (Framer Motion).

---

## 🛠️ Stack Technique

### Frontend
- **Framework** : React 18 (Vite)
- **Style & Animation** : CSS moderne, Framer Motion
- **Icônes** : Lucide React
- **Gestion d'État & API** : Context API, Axios

### Backend
- **Serveur** : Node.js & Express
- **Base de Données** : MongoDB Atlas (Mongoose ODM)
- **Authentification** : JWT (JSON Web Tokens), Bcrypt.js
- **Gestion des Fichiers** : Multer (Upload de photos)
- **Emails** : Nodemailer (Notifications SMTP)

---

## ⚙️ Installation & Configuration

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd dembeni
```

### 2. Configuration Backend
Allez dans le dossier `backend` et créez un fichier `.env` :
```env
PORT=4000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dembeniV2
JWT_SECRET=votre_secret_jwt
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_d_application
```
Installez les dépendances et lancez le serveur :
```bash
npm install
npm run dev
```

### 3. Configuration Frontend
Allez dans le dossier `frontend` :
```bash
npm install
npm run dev
```

---

## 📁 Structure du Projet

```text
dembeni/
├── backend/            # API Node.js/Express
│   ├── src/
│   │   ├── controllers/# Logique métier
│   │   ├── models/     # Modèles Mongoose
│   │   ├── routes/     # Points d'entrée API
│   │   └── middleware/ # Auth & Upload
│   └── uploads/        # Stockage des images
├── frontend/           # Application React
│   ├── src/
│   │   ├── components/ # Composants UI (Dashboard, Pages)
│   │   ├── context/    # Gestion de l'Auth
│   │   └── App.jsx     # Routage principal
└── README.md
```

---

## 👨‍💻 Auteur
Développé pour la modernisation des services publics de la Mairie de Dembéni.
