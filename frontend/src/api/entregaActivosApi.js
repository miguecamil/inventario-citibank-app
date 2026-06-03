import api from "./api";

export const getEntregaActivos = async () => {
  const response = await api.get("entrega-activos/");
  return response.data;
};

export const getEntregaActivosById = async (id) => {
  const response = await api.get(`entrega-activos/${id}/`);
  return response.data;
};

export const createEntregaActivos = async (userData) => {
  const response = await api.post("entrega-activos/", userData);
  return response.data;
};

export const updateEntregaActivos = async (id, userData) => {
  const response = await api.put(`entrega-activos/${id}/`, userData);
  return response.data;
};

export const deleteEntregaActivos = async (id) => {
  const response = await api.delete(`entrega-activos/${id}/`);
  return response.data;
};

export const searchEntregaActivos = (search = "") => {
  return api.get(`entrega-activos/?search=${search}`);
};
