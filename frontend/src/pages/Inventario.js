import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";
import { getProduct } from "../api/productosApi"; // Importa la función para obtener productos para el select
import { getUsers } from "../api/usersApi";  // Importa la función para obtener usuarios para el select
import { getIngenieros } from "../api/ingenierosApi";
import { getProveedores } from "../api/proveedoresApi";
import { getEdificios } from "../api/edificiosApi";


import {
  createInventario,
  updateInventario,
  deleteInventario,
  searchInventario,
} from "../api/inventarioApi";

import "../assets/css/estilos4.css";

function Inventario() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productosOptions, setProductosOptions] = useState([]);
  const [usuariosOptions, setUsuariosOptions] = useState([]); // Estado para opciones de usuarios en el select
  const [ingenierosOptions, setIngenierosOptions] = useState([]);
  const [proveedoresOptions, setProveedoresOptions] = useState([]);
  const [edificiosOptions, setEdificiosOptions] = useState([]);


  const initialForm = {
    fecha_recepcion: "",
    id_activo: "",
    serie: "",
    vehiculo_legal: "",
    orden_compra: "",
    categoria_reporte: "",
    id_proveedor: "",
    estado: "",
    rems: "",
    hostname: "",
    ticket_asignacion: "",
    ticket_bodega: "",
    entregado_a_usuario: "",
        id_user: "",
    id_ingeniero: "",
    fecha_devolucion: "",
    ticket_devolucion: "",
    estado_devolucion: "",
    id_ingeniero_devolucion: "",
  };

  const cargarOpciones = async (
    getData,
    setOptions,
    getValue,
    getLabel,
    errorMessage
  ) => {
    try {
      const data = await getData();

      const options = data.map((item) => ({
        value: getValue(item),
        label: getLabel(item).filter(Boolean).join(" - "),
      }));

      setOptions(options);
    } catch (error) {
      console.error(errorMessage, error);
      setOptions([]);
    }
  };

  useEffect(() => {
    cargarOpciones(
      getProduct,
      setProductosOptions,
      (producto) => producto.id_activo,
      (producto) => [
        producto.id_activo,
        producto.tipo_activo,
        producto.marca,
        producto.modelo,
      ],
      "Error cargando productos:"
    );

    cargarOpciones(
      getUsers,
      setUsuariosOptions,
      (usuario) => usuario.id_user,
      (usuario) => [usuario.id_user, usuario.full_name, usuario.empl_status],
      "Error cargando usuarios:"
    );

    cargarOpciones(
      getProveedores,
      setProveedoresOptions,
      (proveedor) => proveedor.id_proveedor,
      (proveedor) => [
        proveedor.id_proveedor,
        proveedor.nombre,
        proveedor.contacto,
      ],
      "Error cargando proveedores:"
    );

    cargarOpciones(
      getEdificios,
      setEdificiosOptions,
      (edificio) => edificio.rems,
      (edificio) => [edificio.rems, edificio.edificio, edificio.ciudad],
      "Error cargando edificios:"
    );

    cargarOpciones(
      getIngenieros,
      setIngenierosOptions,
      (ingeniero) => ingeniero.id_ingeniero,
      (ingeniero) => [
        ingeniero.id_ingeniero,
        ingeniero.nombre,
        ingeniero.nivel,
      ],
      "Error cargando ingenieros:"
    );
  }, []);

  const formSections = [
    {
      title: "Informacion Activo",
      fields: [
        { name: "fecha_recepcion", label: "Fecha Recepcion", type: "date" },
        {
          name: "id_activo",
          label: "Id Activo",
          type: "select",
          col: "col-8 mb-3",
          options: productosOptions,
          placeholder:
            productosOptions.length > 0
              ? "Seleccione un producto"
              : "Cargando productos...",
          disabled: productosOptions.length === 0,
        },
        { name: "serie", label: "Serie", type: "text", transform: "uppercase" },
        {
          name: "vehiculo_legal",
          label: "Vehiculo Legal",
          type: "select",
          options: ["COLREPFIN", "CITIBANK", "CITIVALORES", "CITRITRUST"],
        },
        { name: "orden_compra", label: "Orden de Compra", type: "number" },
        {
          name: "categoria_reporte",
          label: "Categoria Reporte",
          type: "select",
          options: [
            "CANDIDATO BAJAS",
            "NUEVO",
            "RESERVADO",
            "REUSO",
            "STOCK CONTINGENCIA",
          ],
        },
        {
          name: "id_proveedor",
          label: "Id Proveedor",
          type: "select",
          col: "col-8 mb-3",
          options: proveedoresOptions,
          placeholder:
            proveedoresOptions.length > 0
              ? "Seleccione un proveedor"
              : "Cargando proveedores...",
          disabled: proveedoresOptions.length === 0,
        },
      ],
    },
    {
      title: "Informacion Equipo",
      fields: [
        {
          name: "rems",
          label: "REMS",
          type: "select",
          col: "col-8 mb-3",
          options: edificiosOptions,
          placeholder:
            edificiosOptions.length > 0
              ? "Seleccione un edificio"
              : "Cargando edificios...",
          disabled: edificiosOptions.length === 0,
        },
        {
          name: "hostname",
          label: "Hostname",
          type: "text",
          transform: "uppercase",
        },
      ],
    },
    {
      title: "Informacion Despacho",
      fields: [
        {
          name: "estado",
          label: "Estado",
          type: "select",
          options: ["BODEGA", "CAMPO", "PRODUCCION", "SALIDA", "DEVOLUCION"],
        },
        {
          name: "ticket_asignacion",
          label: "Ticket Entrega",
          type: "text",
          transform: "uppercase",
        },
        {
          name: "ticket_bodega",
          label: "Ticket Bodega",
          type: "text",
          transform: "uppercase",
        },

        { name: "fecha_asignacion", label: "Fecha Asignacion", type: "date", required: false },
        {
          name: "id_user",
          label: "Id Usuario",
          type: "select",
          col: "col-6 mb-3",
          options: usuariosOptions,
          placeholder:                          // Muestra un mensaje de carga mientras se obtienen los usuarios para el select
            usuariosOptions.length > 0
              ? "Seleccione un usuario"
              : "Cargando usuarios...",
          disabled: usuariosOptions.length === 0,
        },

        {
          name: "id_ingeniero",
          label: "Id Ingeniero",
          type: "select",
          col: "col-6 mb-3",
          options: ingenierosOptions,
          placeholder:                          // Muestra un mensaje de carga mientras se obtienen los ingenieros para el select
            ingenierosOptions.length > 0
              ? "Seleccione un ingeniero"
              : "Cargando ingenieros...",
          disabled: ingenierosOptions.length === 0,
        },
                {
          name: "entregado_a_usuario",
          label: "Entregado a Usuario",
          type: "select",
          options: ["SI", "NO"],
        },

      ],
    },
    {
      title: "Estado Devolución",
      fields: [
        { name: "fecha_devolucion", label: "Fecha Devolución", type: "date",required: false },
        {
          name: "ticket_devolucion",
          label: "Ticket Devolución",
          type: "text",
          transform: "uppercase",
        },
        {
          name: "estado_devolucion",
          label: "Estado Devolución",
          type: "select",
          options: ["Nuevo", "Reuso", "Garantia", "Bajas"],
        },
        {
          name: "id_ingeniero_devolucion",
          label: "Ingeniero Devolución",
          type: "select",
          col: "col-6 mb-3",
          options: ingenierosOptions,
          placeholder:
            ingenierosOptions.length > 0
              ? "Seleccione un ingeniero"
              : "Cargando ingenieros...",
          disabled: ingenierosOptions.length === 0,
        },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Gestion de Inventarios" back="/inventarios" />

        <hr />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar serie o id activo"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Activo
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createInventario}
          updateItem={updateInventario}
          deleteItem={deleteInventario}
          idField="serie"
          requiredFields={{
            fecha_recepcion: "Fecha Recepcion",
            id_activo: "Id Activo",
            serie: "Serie",
            vehiculo_legal: "Vehiculo Legal",
            orden_compra: "Orden de Compra",
            categoria_reporte: "Categoria Reporte",
            id_proveedor: "Id Proveedor",
            estado: "Estado",
            rems: "REMS",
            hostname: "Hostname",
            ticket_asignacion: "Ticket Entrega",
            ticket_bodega: "Ticket Bodega",
            entregado_a_usuario: "Entregado a Usuario",
            id_user: "Id Usuario",
            id_ingeniero: "Id Ingeniero",
          }}
        >
          {({ formData, handleChange, setFormData, setEditando }) => (
            <>
              {formSections.map((section, index) => (
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

              <SearchModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSelect={(item) => {
                  setFormData(item);
                  setEditando(true);
                }}
                searchFunction={searchInventario}
                columns={[
                  { field: "id_activo", label: "Id Activo" },
                  { field: "serie", label: "Serie" },
                  { field: "estado", label: "Estado" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default Inventario;

