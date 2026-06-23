Link / Route Audit

Résumé : j'ai analysé les composants React pour recenser les chemins utilisés par les composants `Link` et les routes définies dans `App.jsx`.

Routes définies (frontend/src/App.jsx):
- /
- /register
- /user-login
- /compte
- /login
- /admin
- /contact
- /demarches
- /projet
- /projet/:id
- /services
- /actualites
- /culture
- /solidarite
- /sante

Principaux `Link` détectés dans `frontend/src/components` :
- /
- /demarches
- /projet
- /services
- /actualites
- /culture
- /sante
- /contact
- /admin
- /compte (et /compte?tab=...)
- /login

Problèmes détectés et actions prises:
- Ancres internes vers `/admin?openDemarche=...` dans `SubPage.jsx` utilisaient `href` (rechargement complet). Remplacées par `Link to="/admin?openDemarche=..."` pour navigation SPA. (Modifié: frontend/src/components/SubPage.jsx)
- J'ai supprimé des insertions corrompues dans `SubPage.jsx` (réparé le bloc de fetch et du JSX endommagé).

Recommandations supplémentaires (optionnelles):
- Supprimer ou documenter la route `/user-login` si elle n'est plus utilisée (App.jsx la contient mais aucun `Link` y pointe).
- Convertir d'autres ancres internes (si présentes) en `Link` pour éviter les rechargements complets. J'ai cherché `href` internes et corrigé les cas flagrants dans `SubPage.jsx`.
- Lancer le site en dev (`npm run dev` dans `frontend`) et naviguer sur chaque lien pour valider visuellement (je ne peux pas lancer le serveur pour vous).

Souhaitez-vous que j'applique automatiquement :
- (A) conversion des ancres internes restantes en `Link` (si trouvées), ou
- (B) un rapport détaillé avec fichiers + lignes pour revue manuelle ?
