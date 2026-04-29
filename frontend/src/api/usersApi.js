import api from "./api";

export const getUsers = async () => {
  const response = await api.get("usuarios/");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`usuarios/${id}/`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("usuarios/", userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`usuarios/${id}/`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`usuarios/${id}/`);
  return response.data;
};

export const searchUsers = (search="")=>{
  return api.get(`usuarios/?search=${search}`);
};
