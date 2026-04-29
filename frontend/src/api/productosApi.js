import api from "./api";

export const getProduct = async () => {
  const response = await api.get("productos/");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`productos/${id}/`);
  return response.data;
};

export const createProduct = async (userData) => {
  const response = await api.post("productos/", userData);
  return response.data;
};

export const updateProduct = async (id, userData) => {
  const response = await api.put(`productos/${id}/`, userData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`productos/${id}/`);
  return response.data;
};

export const searchProduct = (search="")=>{
  return api.get(`productos/?search=${search}`);
};