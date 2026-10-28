import React from 'react';
import { useDispatch } from 'react-redux';
import axiosClient from '../api/axiosClient';
import { removeArticle, setError } from '../redux/articleSlice';

export default function ArticleCard({ article }) {
  const dispatch = useDispatch();

  // ==========================================================================
  // ÉTAPE 5.2 (Page 8 du support PDF) : Supprimer un article en 2 lignes
  // ==========================================================================
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/articles/${article.id}`);
      dispatch(removeArticle(article.id));
    } catch {
      dispatch(setError('Impossible de supprimer l’article sur le serveur Express.'));
    }
  };

  return (
    <article className="article-card">
      <div className="card-top">
        <span className="badge-category">{article.category}</span>
        <button className="btn-delete" onClick={handleDelete}>
          Supprimer
        </button>
      </div>

      <h3 className="article-title">{article.title}</h3>

      <div className="card-footer">
        <span className="author-info">Auteur : <strong>{article.author}</strong></span>
      </div>
    </article>
  );
}
