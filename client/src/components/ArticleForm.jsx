import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../api/axiosClient';
import { addArticle, setError } from '../redux/articleSlice';

const CATEGORIES = [
  'Architecture Web', 'Base de Donnees', 'Cybersecurite',
  'Intelligence Artificielle', 'DevOps & Cloud'
];

export default function ArticleForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [feedback, setFeedback] = useState('');

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.articles);

  // ==========================================================================
  // ÉTAPE 5.3 (Page 9 du support PDF) : Publier un article avec Axios + Redux
  // ==========================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    try {
      const response = await axiosClient.post('/articles', {
        title: title.trim(),
        author: author.trim(),
        category
      });
      dispatch(addArticle(response.data));
      setTitle('');
      setAuthor('');
      setFeedback('Article publie avec succes sur l API Express !');
    } catch {
      dispatch(setError('Impossible de publier l’article sur le serveur Express.'));
    }
  };

  return (
    <section className="form-card">
      <div className="form-header">
        <h3>Publier un Nouvel Article</h3>
        <p>Envoi avec axiosClient.post() puis rangement dans Redux.</p>
      </div>

      {feedback && <div className="feedback-alert success">{feedback}</div>}

      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">Titre de l'Article :</label>
          <input
            id="title"
            type="text"
            placeholder="Ex : Architecture Microservices"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="author">Auteur :</label>
            <input
              id="author"
              type="text"
              placeholder="Ex : Dr. Abdelweheb GUEDDES"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categorie :</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          + Publier dans la Base Cloud
        </button>
      </form>
    </section>
  );
}
