import api from "./api";

export const getInventario = async () => {
  const response = await api.get("inventario/");
  return response.data;
};

export const getInventarioById = async (id) => {
  const response = await api.get(`inventario/${id}/`);
  return response.data;
};

export const createInventario = async (userData) => {
  const response = await api.post("inventario/", userData);
  return response.data;
};

export const updateInventario = async (id, userData) => {
  const response = await api.put(`inventario/${id}/`, userData);
  return response.data;
};

export const deleteInventario = async (id) => {
  const response = await api.delete(`inventario/${id}/`);
  return response.data;
};

export const searchInventario = (search="")=>{
  return api.get(`inventario/?search=${search}`);
};

export const getInventarioFiltrado = async ({ estado = "", search = "" } = {}) => {
  const params = new URLSearchParams();

  if (estado) params.append("estado", estado);
  if (search) params.append("search", search);

  const query = params.toString();
  const url = query ? `inventario/?${query}` : "inventario/";
  const response = await api.get(url);
  return response.data;
};

export const searchInventarioFiltrado = ({ estado = "", search = "" } = {}) => { /* Permite buscar registros filtrados por estado y un término de búsqueda, construyendo dinámicamente la URL con los parámetros necesarios */
  const params = new URLSearchParams();

  if (estado) params.append("estado", estado);
  if (search) params.append("search", search);

  const query = params.toString();
  const url = query ? `inventario/?${query}` : "inventario/";
  return api.get(url);
};
