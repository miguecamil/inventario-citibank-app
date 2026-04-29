import api from "./api";

export const getEdificios = async () => {
  const response = await api.get("edificios/");
  return response.data;
};

export const getEdificioById = async (rems) => {
  const response = await api.get(`edificios/${rems}/`);
  return response.data;
};

export const createEdificio = async (userData) => {
  const response = await api.post("edificios/", userData);
  return response.data;
};

export const updateEdificio = async (rems, userData) => {
  const response = await api.put(`edificios/${rems}/`, userData);
  return response.data;
};

export const deleteEdificio = async (rems) => {
  const response = await api.delete(`edificios/${rems}/`);
  return response.data;
};

export const searchEdificios = (search = "") => {
  return api.get(`edificios/?search=${search}`);
};
