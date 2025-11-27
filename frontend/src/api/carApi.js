import api from './api';

export const carApi = {
  getCars: async (filters = {}, page = 1, limit = 10) => {
    const params = {
      ...filters,
      page,
      limit,
      showInactive: true // Pour afficher toutes les voitures dans l'admin
    };
    
    // Supprime les paramètres vides
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === '') {
        delete params[key];
      }
    });

    const response = await api.get('/cars', { params });
    return response.data;
  },

  getCarById: async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  createCar: async (carData) => {
    const response = await api.post('/cars', carData);
    return response.data;
  },

  updateCar: async (id, carData) => {
    const response = await api.put(`/cars/${id}`, carData);
    return response.data;
  },

  deleteCar: async (id) => {
    await api.delete(`/cars/${id}`);
  }
};

export default carApi;
