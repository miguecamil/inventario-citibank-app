import api from "./api";

export const getSolicitudes = async () => {
  const response = await api.get("solicitudes/");
  return response.data;
};

export const getSolicitudesById = async (id) => {
  const response = await api.get(`solicitudes/${id}/`);
  return response.data;
};

export const createSolicitudes = async (userData) => {
  const response = await api.post("solicitudes/", userData);
  return response.data;
};

export const updateSolicitudes = async (id, userData) => {
  const response = await api.put(`solicitudes/${id}/`, userData);
  return response.data;
};

export const deleteSolicitudes = async (id) => {
  const response = await api.delete(`solicitudes/${id}/`);
  return response.data;
};

export const searchSolicitudes = (search="")=>{
  return api.get(`solicitudes/?search=${search}`);
};
