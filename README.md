# Kit de Démarrage (Starter) - MERN Décalé - Séance 5
## Connecter React au Serveur Express avec Axios & Redux Toolkit Simplifié (createSlice)
Enseignant : Dr. Abdelweheb GUEDDES - École Polytechnique de Sousse

Ce dossier contient tout le code de base prêt à l'emploi (interface CSS, serveur Express, structure des composants) pour démarrer la **Séance 5** dès la minute 5 sans perdre de temps sur le HTML ou le CSS.

---

### 🚀 1. Démarrer le Serveur Express (Terminal 1)
`ash
cd server
npm install
npm start
`
Vérifiez dans le navigateur que les 3 articles JSON s'affichent sur :
http://localhost:5000/api/articles

---

### 💻 2. Démarrer le Client React (Terminal 2)
`ash
cd client
npm install
npm run dev
`
Ouvrez l'application sur :
http://localhost:5173

---

### 🛠️ 3. Les 5 Fichiers à Compléter Pendant la Séance (Blocs // TODO)

Suivez le support PDF **S5_Seance_Interactive_Decale.pdf** fourni dans ce dossier :
1. **client/src/api/axiosClient.js** (Étape 1 - Page 2) : Vérifier l'instance Axios pointant vers http://localhost:5000/api.
2. **client/src/redux/articleSlice.js** (Étape 4 - Page 5) : Compléter les 5 petites fonctions de 1 à 2 lignes (setArticles, ddArticle, emoveArticle, setLoading, setError).
3. **client/src/components/ArticleList.jsx** (Étape 5.4 - Page 11) : Compléter chargerArticles() avec xiosClient.get('/articles') + dispatch(setArticles(response.data)).
4. **client/src/components/ArticleForm.jsx** (Étape 5.3 - Page 9) : Compléter handleSubmit() avec xiosClient.post('/articles', ...) + dispatch(addArticle(response.data)).
5. **client/src/components/ArticleCard.jsx** (Étape 5.2 - Page 8) & **Navbar.jsx** (Étape 5.1 - Page 7) : Compléter la suppression (xiosClient.delete) et le bouton « Rafraîchir ».
