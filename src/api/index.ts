import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Authentication API
export const authAPI = {
  login: async (username: string, password: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await api.post("/token", formData);
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  },

  signup: async (userData: any) => {
    const response = await api.post("/users/", userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/users/me/");
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  },
};

// User API
export const userAPI = {
  updateProfile: async (userData: any) => {
    const response = await api.put("/users/me/", userData);
    return response.data;
  },

  getUsers: async (skip = 0, limit = 100) => {
    const response = await api.get(`/users/?skip=${skip}&limit=${limit}`);
    return response.data;
  },
};

// Dataset API
export const datasetAPI = {
  getDatasets: async (params: any = {}) => {
    const { skip = 0, limit = 100, search, dataType } = params;
    let url = `/datasets/?skip=${skip}&limit=${limit}`;

    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (dataType) url += `&data_type=${encodeURIComponent(dataType)}`;

    const response = await api.get(url);
    return response.data;
  },

  getDataset: async (id: string) => {
    const response = await api.get(`/datasets/${id}`);
    return response.data;
  },

  createDataset: async (datasetData: any) => {
    const response = await api.post("/datasets/", datasetData);
    return response.data;
  },

  updateDataset: async (id: string, datasetData: any) => {
    const response = await api.put(`/datasets/${id}`, datasetData);
    return response.data;
  },

  getDatasetStats: async (id: string) => {
    const response = await api.get(`/datasets/${id}/stats`);
    return response.data;
  },

  getDatasetMetadata: async (id: string) => {
    const response = await api.get(`/datasets/${id}/metadata`);
    return response.data;
  },
};

// Access Request API
export const accessRequestAPI = {
  getAccessRequests: async (params: any = {}) => {
    const { skip = 0, limit = 100, status } = params;
    let url = `/access-requests/?skip=${skip}&limit=${limit}`;

    if (status) url += `&status=${encodeURIComponent(status)}`;

    const response = await api.get(url);
    return response.data;
  },

  getAccessRequest: async (id: string) => {
    const response = await api.get(`/access-requests/${id}`);
    return response.data;
  },

  createAccessRequest: async (requestData: any) => {
    const response = await api.post("/access-requests/", requestData);
    return response.data;
  },

  approveAccessRequest: async (id: string) => {
    const response = await api.put(`/access-requests/${id}/approve`);
    return response.data;
  },

  denyAccessRequest: async (id: string) => {
    const response = await api.put(`/access-requests/${id}/deny`);
    return response.data;
  },
};

// Activity API
export const activityAPI = {
  getActivities: async (skip = 0, limit = 100) => {
    const response = await api.get(`/activities/?skip=${skip}&limit=${limit}`);
    return response.data;
  },
};

export default {
  auth: authAPI,
  users: userAPI,
  datasets: datasetAPI,
  accessRequests: accessRequestAPI,
  activities: activityAPI,
};
