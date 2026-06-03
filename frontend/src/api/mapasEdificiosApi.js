import api from "./api";

export const getMapasEdificios = async () => {
  const response = await api.get("mapas-edificios/");
  return response.data;
};

export const getMapasEdificiosByEdificioAndPiso = async (edificio, piso) => {
  const response = await api.get(`mapas-edificios/?edificio=${edificio}&piso=${piso}`);
  return response.data;
};

export const createMapaArea = async (payload) => {
  const response = await api.post(`mapas-edificios/`, payload);
  return response.data;
};

export const updateMapaArea = async (id, payload) => {
  const response = await api.put(`mapas-edificios/${id}/`, payload);
  return response.data;
};

export const deleteMapaArea = async (id) => {
  const response = await api.delete(`mapas-edificios/${id}/`);
  return response.data;
};

export const getEdificiosList = async () => {
  const response = await api.get("edificios/");
  return response.data;
};

export const getPisosList = async (edificio) => {
  const response = await api.get(`pisos/?edificio=${edificio}`);
  return response.data;
};
