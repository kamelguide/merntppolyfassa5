import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosClient from '../api/axiosClient';
import { setArticles, setLoading, setError } from '../redux/articleSlice';

export default function Navbar() {
  // 1. On lit la liste des articles directement dans le coffre Redux
  const { items, loading } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  // ==========================================================================
  // ÉTAPE 5.1 (Page 7 du support PDF) : Bouton Rafraîchir avec Axios + Redux
  // ==========================================================================
  const handleRefresh = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosClient.get('/articles');
      dispatch(setArticles(response.data));
    } catch {
      dispatch(setError('Serveur Express injoignable sur http://localhost:5000.'));
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo-icon">*</span>
        <div>
          <h2>DevBlog Full-Stack <span className="badge-track">Decale S5</span></h2>
          <span className="nav-sub">React 18 + Axios + Redux Toolkit (createSlice)</span>
        </div>
      </div>

      <div className="nav-stats">
        <button className="btn-refresh" onClick={handleRefresh} disabled={loading}>
          {loading ? 'Chargement...' : 'Rafraichir'}
        </button>

        <div className="stat-pill">
          <span className="stat-label">Articles en Base :</span>
          <span className="stat-count">{items.length}</span>
        </div>
      </div>
    </nav>
  );
}
