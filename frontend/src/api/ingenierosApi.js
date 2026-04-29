import api from "./api";

export const getIngenieros = async () => {
  const response = await api.get("ingenieros/");
  return response.data;
};

export const getIngenieroById = async (id) => {
  const response = await api.get(`ingenieros/${id}/`);
  return response.data;
};

export const createIngeniero = async (data) => {
  const response = await api.post("ingenieros/", data);
  return response.data;
};

export const updateIngeniero = async (id, data) => {
  const response = await api.put(`ingenieros/${id}/`, data);
  return response.data;
};

export const deleteIngeniero = async (id) => {
  const response = await api.delete(`ingenieros/${id}/`);
  return response.data;
};

export const searchIngenieros = (search="")=>{
  return api.get(`ingenieros/?search=${search}`);
};