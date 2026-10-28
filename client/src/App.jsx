import React from 'react';
import Navbar from './components/Navbar';
import ArticleForm from './components/ArticleForm';
import ArticleList from './components/ArticleList';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="container main-content">
        <header className="page-intro">
          <h1>Communication API (Axios) &amp; État Global (Redux Toolkit)</h1>
          <p>
            Séance 5 (Groupe Décalé) : Dialogue Front-Back direct avec <code>axiosClient</code> et Store partagé <code>createSlice</code>.
          </p>
        </header>

        <div className="app-grid-layout">
          <div className="column-form">
            <ArticleForm />
          </div>
          <div className="column-list">
            <ArticleList />
          </div>
        </div>
      </main>

      <footer className="footer-bar">
        <p>École Polytechnique de Sousse -- MERN Stack Groupe Décalé 2026-2027 -- Dr. Abdelweheb GUEDDES</p>
      </footer>
    </div>
  );
}
