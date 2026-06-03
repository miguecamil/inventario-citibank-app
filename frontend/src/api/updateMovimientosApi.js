import api from "./api";

export const getUpdateMovimientos = async () => {
  const response = await api.get("update-movimientos/");
  return response.data;
};

export const getUpdateMovimientosById = async (id) => {
  const response = await api.get(`update-movimientos/${id}/`);
  return response.data;
};

export const createUpdateMovimientos = async (userData) => {
  const response = await api.post("update-movimientos/", userData);
  return response.data;
};

export const updateUpdateMovimientos = async (id, userData) => {
  const response = await api.put(`update-movimientos/${id}/`, userData);
  return response.data;
};

export const deleteUpdateMovimientos = async (id) => {
  const response = await api.delete(`update-movimientos/${id}/`);
  return response.data;
};

export const searchUpdateMovimientos = (search = "") => {
  return api.get(`update-movimientos/?search=${search}`);
};
