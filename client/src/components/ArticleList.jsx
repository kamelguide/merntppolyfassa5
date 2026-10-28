import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosClient from '../api/axiosClient';
import { setArticles, setLoading, setError } from '../redux/articleSlice';
import ArticleCard from './ArticleCard';

export default function ArticleList() {
  const dispatch = useDispatch();

  // 1. Etat Global (Redux) : liste des articles, chargement et erreur
  const { items, loading, error } = useSelector((state) => state.articles);

  // 2. Etat Local (useState) : categorie choisie dans le menu deroulant
  const [selectedCategory, setSelectedCategory] = useState('');

  // ==========================================================================
  // ÉTAPE 5.4 (Page 11 du support PDF) : Charger les articles depuis Express
  // ==========================================================================
  const chargerArticles = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosClient.get('/articles');
      dispatch(setArticles(response.data));
    } catch {
      dispatch(setError('Serveur Express injoignable sur http://localhost:5000.'));
    }
  };

  // Chargement initial a l'ouverture de la page
  useEffect(() => {
    chargerArticles();
  }, []);

  // Filtrage JavaScript simple
  const filteredItems = selectedCategory
    ? items.filter((a) => a.category === selectedCategory)
    : items;

  return (
    <section className="list-section">
      <div className="list-header">
        <div>
          <h3>Articles Synchronises avec l'API Express</h3>
          <p className="list-subtitle">Donnees recuperees depuis http://localhost:5000/api/articles</p>
        </div>

        <div className="filter-box">
          <label>Filtrer par domaine : </label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Tous les domaines</option>
            <option value="Architecture Web">Architecture Web</option>
            <option value="Base de Donnees">Base de Donnees</option>
            <option value="Cybersecurite">Cybersecurite</option>
            <option value="Intelligence Artificielle">Intelligence Artificielle</option>
            <option value="DevOps & Cloud">DevOps &amp; Cloud</option>
          </select>
        </div>
      </div>

      {/* CAS 1 : Bandeau d'alerte si le serveur Express est eteint */}
      {error && (
        <div className="error-banner">
          <div className="error-icon">!</div>
          <div className="error-text">
            <strong>Erreur de Communication avec l'API Express :</strong>
            <p>{error}</p>
          </div>
          <button className="btn-retry" onClick={chargerArticles}>
            Reessayer
          </button>
        </div>
      )}

      {/* CAS 2 : Spinner pendant le voyage de la requete HTTP */}
      {loading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Chargement des articles depuis l'API Express...</p>
        </div>
      )}

      {/* CAS 3 : Message d'invitation avant que les TODO soient completes */}
      {!loading && !error && filteredItems.length === 0 && (
        <div className="empty-state">
          <p>
            <strong>Prêt pour le TP Séance 5 !</strong> Complétez les blocs <code>TODO</code> dans{' '}
            <code>src/redux/articleSlice.js</code> et <code>src/components/ArticleList.jsx</code>{' '}
            pour afficher les articles du serveur Express.
          </p>
        </div>
      )}

      {/* CAS 4 : Grille des articles recus */}
      {!loading && filteredItems.length > 0 && (
        <div className="articles-grid">
          {filteredItems.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
