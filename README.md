# Portail Citoyen de la Mairie de Dembéni

## Présentation

Le Portail Citoyen de la Mairie de Dembéni est une plateforme web moderne conçue pour accompagner la transformation numérique des services municipaux. Elle permet de centraliser l'information publique, de faciliter les démarches administratives et d'améliorer la communication entre la commune et les citoyens.

Le projet repose sur une architecture web complète comprenant un espace public, un espace citoyen sécurisé et une interface d'administration destinée à la gestion des contenus et des services municipaux.

---

## Fonctionnalités

### Espace Administration

L'interface d'administration permet aux agents municipaux de gérer l'ensemble des contenus et services proposés sur la plateforme.

#### Gestion des contenus

* Publication et mise à jour des actualités communales.
* Gestion des événements culturels et institutionnels.
* Mise en avant des projets municipaux.

#### Gestion des services municipaux

* Création et modification des informations relatives aux services publics.
* Mise à jour dynamique des contenus accessibles aux citoyens.

#### Gestion des échanges citoyens

* Consultation des messages reçus.
* Réponse aux demandes des administrés.
* Gestion des pièces jointes transmises par les utilisateurs.

#### Sécurité et contrôle d'accès

* Authentification sécurisée par JWT.
* Gestion des rôles administrateurs.
* Protection des ressources sensibles.

---

### Espace Citoyen

L'espace citoyen offre aux habitants un accès simplifié aux services numériques de la commune.

#### Tableau de bord personnel

* Suivi des demandes administratives.
* Consultation des échanges avec l'administration.
* Accès aux informations personnelles.

#### Messagerie sécurisée

* Communication directe avec les services municipaux.
* Envoi de messages accompagnés de pièces jointes.

#### Gestion du profil

* Mise à jour des coordonnées personnelles.
* Gestion des informations de contact.

---

### Portail Public

Le portail public constitue la vitrine numérique de la commune.

#### Informations communales

* Présentation de la commune et de son administration.
* Diffusion des actualités et annonces officielles.

#### Culture et patrimoine

* Valorisation des sites historiques et culturels.
* Présentation de l'agenda culturel communal.

#### Services à la population

* Informations sur les services municipaux.
* Présentation des structures d'accompagnement social et sanitaire.

#### Expérience utilisateur

* Interface responsive adaptée aux ordinateurs, tablettes et smartphones.
* Navigation fluide et intuitive.
* Animations et interactions modernes.

---

## Technologies Utilisées

### Frontend

| Technologie   | Description                                      |
| ------------- | ------------------------------------------------ |
| React 18      | Développement de l'interface utilisateur         |
| Vite          | Outil de build et environnement de développement |
| Framer Motion | Animations et transitions                        |
| Lucide React  | Bibliothèque d'icônes                            |
| Axios         | Communication avec l'API                         |
| Context API   | Gestion de l'état global                         |

### Backend

| Technologie   | Description                          |
| ------------- | ------------------------------------ |
| Node.js       | Environnement d'exécution JavaScript |
| Express.js    | Framework backend                    |
| MongoDB Atlas | Base de données NoSQL                |
| Mongoose      | Modélisation des données             |
| JWT           | Authentification sécurisée           |
| Bcrypt.js     | Hachage des mots de passe            |
| Multer        | Gestion des fichiers uploadés        |
| Nodemailer    | Envoi d'e-mails et notifications     |

---

## Installation

### Clonage du dépôt

```bash
git clone <url-du-repository>
cd dembeni
```

---

## Configuration du Backend

Accéder au dossier backend :

```bash
cd backend
```

Créer un fichier `.env` :

```env
PORT=4000

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dembeni

JWT_SECRET=your_jwt_secret

SMTP_USER=your_email@example.com
SMTP_PASS=your_smtp_password
```

Installer les dépendances :

```bash
npm install
```

Lancer le serveur :

```bash
npm run dev
```

---

## Configuration du Frontend

Accéder au dossier frontend :

```bash
cd frontend
```

Installer les dépendances :

```bash
npm install
```

Lancer l'application :

```bash
npm run dev
```

---

## Structure du Projet

```text
dembeni/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   ├── uploads/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## Sécurité

Le projet intègre plusieurs mécanismes de sécurité :

* Authentification basée sur JWT.
* Hachage sécurisé des mots de passe avec Bcrypt.
* Validation des données côté serveur.
* Gestion des rôles et des autorisations.
* Protection des routes privées.

---

## Déploiement

L'application peut être déployée sur différentes plateformes :

* Frontend : GitHub Pages, Netlify ou Vercel.
* Backend : Render, Railway ou VPS.
* Base de données : MongoDB Atlas.

---

## Objectif du Projet

Ce projet s'inscrit dans une démarche de modernisation des services publics locaux. Il vise à renforcer la transparence administrative, améliorer l'accès à l'information et simplifier les interactions entre la municipalité et les citoyens grâce aux technologies numériques.

---

## Auteur

Projet développé dans le cadre de la modernisation numérique de la Mairie de Dembéni.
