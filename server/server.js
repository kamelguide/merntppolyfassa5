const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================================================================
// 🛡️ Middlewares Sentinelles : CORS & Parser JSON
// ==============================================================================
// Autoriser le client React a interroger l'API Express (CORS)
app.use(cors());

app.use(express.json());

// Logger simple des requêtes entrantes
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ==============================================================================
// 🗄️ Base de Données d'Articles (Persistance en mémoire avec seed initial)
// ==============================================================================
let articles = [
  {
    id: '1',
    title: 'Comprendre l’Architecture RESTful & le Protocole HTTP',
    author: 'Aya Ben Amor',
    category: 'Architecture Web',
    createdAt: new Date('2026-10-15T09:30:00Z').toISOString()
  },
  {
    id: '2',
    title: 'Modélisation NoSQL Avancée avec MongoDB & Mongoose',
    author: 'Sami Trabelsi',
    category: 'Base de Données',
    createdAt: new Date('2026-10-18T14:15:00Z').toISOString()
  },
  {
    id: '3',
    title: 'Sécurisation des APIs avec Tokens JWT Stateless',
    author: 'Youssef Khelifi',
    category: 'Cybersécurité',
    createdAt: new Date('2026-10-22T11:00:00Z').toISOString()
  }
];

// ==============================================================================
// 🛣️ Routes RESTful de l'API Articles (/api/articles)
// ==============================================================================

// 1. GET /api/articles : Récupérer tous les articles (avec filtre optionnel par catégorie)
app.get('/api/articles', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = articles.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
    return res.status(200).json(filtered);
  }
  res.status(200).json(articles);
});

// 2. GET /api/articles/:id : Détail d'un article
app.get('/api/articles/:id', (req, res) => {
  const article = articles.find((a) => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ message: 'Article introuvable dans la base.' });
  }
  res.status(200).json(article);
});

// 3. POST /api/articles : Création d'un article
app.post('/api/articles', (req, res) => {
  const { title, author, category } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Le titre et l\'auteur sont strictement obligatoires.' });
  }

  const newArticle = {
    id: Date.now().toString(),
    title: title.trim(),
    author: author.trim(),
    category: category ? category.trim() : 'Général',
    createdAt: new Date().toISOString()
  };

  articles.unshift(newArticle);
  res.status(201).json(newArticle);
});

// 4. DELETE /api/articles/:id : Suppression d'un article
app.delete('/api/articles/:id', (req, res) => {
  const index = articles.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Impossible de supprimer : article inexistant.' });
  }

  const deleted = articles.splice(index, 1)[0];
  res.status(200).json({ message: 'Article supprimé avec succès.', id: deleted.id });
});

// Route sentinelle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route API introuvable.' });
});

// ==============================================================================
// 🚀 Démarrage du Serveur HTTP
// ==============================================================================
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Serveur MERN Décalé (Séance 5) en écoute sur :`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`👉 Endpoints : GET / POST / DELETE sur http://localhost:${PORT}/api/articles`);
  console.log(`====================================================`);
});
