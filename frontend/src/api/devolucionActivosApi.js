import api from "./api";

export const getDevolucionActivos = async () => {
  const response = await api.get("devolucion-activos/");
  return response.data;
};

export const getDevolucionActivosById = async (id) => {
  const response = await api.get(`devolucion-activos/${id}/`);
  return response.data;
};

export const createDevolucionActivos = async (userData) => {
  const response = await api.post("devolucion-activos/", userData);
  return response.data;
};

export const updateDevolucionActivos = async (id, userData) => {
  const response = await api.put(`devolucion-activos/${id}/`, userData);
  return response.data;
};

export const deleteDevolucionActivos = async (id) => {
  const response = await api.delete(`devolucion-activos/${id}/`);
  return response.data;
};

export const searchDevolucionActivos = (search = "") => {
  return api.get(`devolucion-activos/?search=${search}`);
};
