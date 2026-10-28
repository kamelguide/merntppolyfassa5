import axios from 'axios';

// ============================================================================
// ÉTAPE 1 (Page 2 du support PDF) : Créer l'instance Axios pointant vers Express
// ============================================================================
// TODO : Vérifiez ou complétez l'adresse baseURL du serveur Express ('http://localhost:5000/api')
const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default axiosClient;
