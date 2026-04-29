import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./Header";
import FormBuilder from "./FormBuilder";
import SearchModal from "./SearchModal";
import {
  getInventarioFiltrado,
  searchInventarioFiltrado,
  updateInventario,
} from "../api/inventarioApi";
import { getProduct } from "../api/productosApi";
import { getUsers } from "../api/usersApi";
import { getIngenieros } from "../api/ingenierosApi";

const buildLabelMap = (items, keyField, labelBuilder) =>
  items.reduce((acc, item) => {
    acc[item[keyField]] = labelBuilder(item);
    return acc;
  }, {});

function InventarioEstadoPage({
  title,
  back = "/inventarios",
  estadoFiltro,
  formSections,
  getFormSections,
  tableColumns,
  searchColumns,
  searchPlaceholder,
}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [catalogos, setCatalogos] = useState({
    productos: {},
    usuarios: {},
    ingenieros: {},
  });

  const cargarRegistros = useCallback(async (searchValue = "") => {
    try {
      setLoading(true);
      const data = await getInventarioFiltrado({
        estado: estadoFiltro,
        search: searchValue,
      });
      setItems(data);

      if (data.length > 0 && !formData) {
        setFormData(data[0]);
      }
    } catch (error) {
      console.error(`Error cargando registros ${estadoFiltro}:`, error);
      alert("Error cargando registros");
    } finally {
      setLoading(false);
    }
  }, [estadoFiltro, formData]);

  useEffect(() => {
    cargarRegistros();
  }, [cargarRegistros]);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const [productos, usuarios, ingenieros] = await Promise.all([
          getProduct(),
          getUsers(),
          getIngenieros(),
        ]);

        setCatalogos({
          productos: buildLabelMap(
            productos,
            "id_activo",
            (producto) =>
              [
                producto.id_activo,
                producto.tipo_activo,
                producto.marca,
                producto.modelo,
              ]
                .filter(Boolean)
                .join(" - ")
          ),
          usuarios: buildLabelMap(
            usuarios,
            "id_user",
            (usuario) =>
              [usuario.id_user, usuario.full_name]
                .filter(Boolean)
                .join(" - ")
          ),
          ingenieros: buildLabelMap(
            ingenieros,
            "id_ingeniero",
            (ingeniero) =>
              [ingeniero.id_ingeniero, ingeniero.nombre]
                .filter(Boolean)
                .join(" - ")
          ),
        });
      } catch (error) {
        console.error("Error cargando catalogos:", error);
      }
    };

    cargarCatalogos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardarCambios = async () => {
    if (!formData?.serie) {
      alert("Seleccione un registro");
      return;
    }

    try {
      await updateInventario(formData.serie, formData);
      alert("Registro actualizado");
      await cargarRegistros(search);
    } catch (error) {
      console.error("Error actualizando registro:", error.response?.data || error);
      alert(
        `Error actualizando: ${
          error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message
        }`
      );
    }
  };

  const handleModalSelect = (item) => {
    setFormData(item);
    setShowSearchModal(false);
  };

  const handleOpenSearchModal = () => {
    setShowSearchModal(true);
  };

  const searchModalFunction = (searchValue = "") =>
    searchInventarioFiltrado({ estado: estadoFiltro, search: searchValue });

  /**Transforma los items para mostrar labels en lugar de IDs */
  
  const rows = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        id_activo_label: catalogos.productos[item.id_activo] || item.id_activo,
        id_user_label: catalogos.usuarios[item.id_user] || item.id_user,
        id_ingeniero_label:
          catalogos.ingenieros[item.id_ingeniero] || item.id_ingeniero,
        id_ingeniero_devolucion_label:
          catalogos.ingenieros[item.id_ingeniero_devolucion] ||
          item.id_ingeniero_devolucion,
      })),
    [items, catalogos]
  );

  const catalogoOptions = useMemo( /* Prepara opciones para selects en el formulario, transformando los objetos de catalogo en arrays de {value, label} */
    () => ({
      productos: Object.entries(catalogos.productos).map(([value, label]) => ({
        value,
        label,
      })),
      usuarios: Object.entries(catalogos.usuarios).map(([value, label]) => ({
        value,
        label,
      })),
      ingenieros: Object.entries(catalogos.ingenieros).map(([value, label]) => ({
        value,
        label,
      })),
    }),
    [catalogos]
  );

  /**Carga Formulario Superior */

  const resolvedFormSections = useMemo(() => { /* Permite que el componente reciba formSections ya resueltas o una función que las genere dinámicamente */
    if (typeof getFormSections === "function") {
      return getFormSections(catalogoOptions);
    }

    return formSections || [];
  }, [catalogoOptions, formSections, getFormSections]);

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title={title} back={back} />

        <hr />

        <div className="d-flex flex-wrap gap-2 mb-3">
          <input
            className="form-control"
            style={{ maxWidth: 360 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => cargarRegistros(search)}
          >
            Buscar
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => cargarRegistros(search)}
          >
            Actualizar
          </button>

          <button
            type="button"
            className="btn btn-outline-info"
            onClick={handleOpenSearchModal}
          >
            Buscar registro
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGuardarCambios}
          >
            Guardar Cambios
          </button>

          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => alert("Impresion de soporte pendiente")}
          >
            Imprimir Soporte
          </button>
        </div>

        {formData ? (
          <>
            {resolvedFormSections.map((section, index) => (
              <div key={index}>
                <h6 className="section-title">{section.title}</h6>
                <hr />
                <FormBuilder
                  fields={section.fields}
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
            ))}
          </>
        ) : (
          <p className="text-muted">No hay registros para mostrar.</p>
        )}

        <hr className="my-4" />

        <h6 className="section-title">Registros</h6>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                {tableColumns.map((column) => ( /* Permite mostrar columnas personalizadas en la tabla, como labels en lugar de IDs */
                  <th key={column.field}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={tableColumns.length}>Cargando registros...</td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length}>No se encontraron registros.</td>
                </tr>
              ) : (
                rows.map((item, index) => (
                  <tr
                    key={item.serie}
                    style={{ cursor: "pointer" }}
                    className={formData?.serie === item.serie ? "table-primary" : ""}
                    onClick={() => setFormData(items[index])}
                  >
                    {tableColumns.map((column) => (
                      <td key={column.field}>{item[column.field]}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <SearchModal
        show={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelect={handleModalSelect}
        searchFunction={searchModalFunction}
        columns={searchColumns || tableColumns}
      />
    </div>
  );
}

export default InventarioEstadoPage;
