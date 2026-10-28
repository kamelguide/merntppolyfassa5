import { createSlice } from '@reduxjs/toolkit';

// ============================================================================
// ÉTAPE 4 (Page 5 du support PDF) : Créer le Tiroir des Articles (createSlice)
// ============================================================================
const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],      // La liste des articles reçus du serveur Express
    loading: false, // true pendant que la requête Axios est en cours
    error: null     // Message d'erreur si le serveur Express est éteint
  },
  reducers: {
    // 1. Remplir la liste quand Axios reçoit les articles (GET)
    setArticles: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },

    // 2. Ajouter un nouvel article en tête de liste (POST)
    addArticle: (state, action) => {
      state.items.unshift(action.payload);
    },

    // 3. Supprimer un article par son identifiant (DELETE)
    removeArticle: (state, action) => {
      state.items = state.items.filter((article) => article.id !== action.payload);
    },

    // 4. Activer le chargement ou afficher une erreur
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Export des fonctions pour nos composants
export const {
  setArticles, addArticle, removeArticle, setLoading, setError
} = articleSlice.actions;

export default articleSlice.reducer;
