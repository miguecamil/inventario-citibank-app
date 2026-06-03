import api from "./api";

export const getReasignacionTickets = async () => {
  const response = await api.get("reasignacion-tickets/");
  return response.data;
};

export const getReasignacionTicketsById = async (id) => {
  const response = await api.get(`reasignacion-tickets/${id}/`);
  return response.data;
};

export const createReasignacionTickets = async (userData) => {
  const response = await api.post("reasignacion-tickets/", userData);
  return response.data;
};

export const updateReasignacionTickets = async (id, userData) => {
  const response = await api.put(`reasignacion-tickets/${id}/`, userData);
  return response.data;
};

export const deleteReasignacionTickets = async (id) => {
  const response = await api.delete(`reasignacion-tickets/${id}/`);
  return response.data;
};

export const searchReasignacionTickets = (search = "") => {
  return api.get(`reasignacion-tickets/?search=${search}`);
};
