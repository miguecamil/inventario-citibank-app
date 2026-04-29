import api from "./api";

export const getProveedores = async () => {
  const response = await api.get("proveedores/");
  return response.data;
};

export const getProveedorById = async (id) => {
  const response = await api.get(`proveedores/${id}/`);
  return response.data;
};

export const createProveedor = async (userData) => {
  const response = await api.post("proveedores/", userData);
  return response.data;
};

export const updateProveedor = async (id, userData) => {
  const response = await api.put(`proveedores/${id}/`, userData);
  return response.data;
};

export const deleteProveedor = async (id) => {
  const response = await api.delete(`proveedores/${id}/`);
  return response.data;
};

export const searchProveedores = (search = "") => {
  return api.get(`proveedores/?search=${search}`);
};
