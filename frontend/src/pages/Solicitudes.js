import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";
import { getProduct } from "../api/productosApi"; // Importa la función para obtener productos para el select
import { getUsers } from "../api/usersApi"; // Importa la función para obtener usuarios para el select
import { getIngenieros } from "../api/ingenierosApi";

import {
  createSolicitudes,
  updateSolicitudes,
  deleteSolicitudes,
  searchSolicitudes,
} from "../api/solicitudesApi";

import "../assets/css/estilos4.css";

function Solicitudes() {
  //Estados

  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productosOptions, setProductosOptions] = useState([]);
  const [usuariosOptions, setUsuariosOptions] = useState([]); // Estado para opciones de usuarios en el select
  const [ingenierosOptions, setIngenierosOptions] = useState([]);

  const initialForm = {
    id_registro: "",
    fecha_registro: "",
    tipo_solicitud: "",
    orden_de_compra: "",
    descripcion_solicitud: "",
    id_solicitante: "",
    id_user: "",
    id_ingeniero: "",
    id_activo: "",
    ticket_entrega: "",
    ticket_bodega: "",
    estado: "",
    serie: "",
    observacion: "",
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
      title: "Información Basica",
      fields: [
        { name: "id_registro", label: "Id Registro", type: "number" },
        { name: "fecha_registro", label: "Fecha Registro", type: "date" },
        {
          name: "tipo_solicitud",
          label: "Tipo de Solicitud",
          type: "select",
          options: ["BRM", "MAIL", "SERVICENOW"],
        },
        { name: "orden_de_compra", label: "Orden de Compra", type: "number" },
        {
          name: "descripcion_solicitud",
          label: "Descripción Solicitud",
          type: "text",
          transform: "sentence",
        },
      ],
    },

    {
      title: "Información Solicitante",
      fields: [

        {
          name: "id_solicitante",
          label: "Id Solicitante",
          type: "select",
          col: "col-8 mb-3",
          options: usuariosOptions,
          placeholder:
            usuariosOptions.length > 0
              ? "Seleccione un usuario"
              : "Cargando usuarios...",
          disabled: usuariosOptions.length === 0,
        },

        {
          name: "id_user",
          label: "Id Usuario",
          type: "select",
          col: "col-8 mb-3",
          options: usuariosOptions,
          placeholder:
            usuariosOptions.length > 0
              ? "Seleccione un usuario"
              : "Cargando usuarios...",
          disabled: usuariosOptions.length === 0,
        },
        {
          name: "id_ingeniero",
          label: "Id Ingeniero",
          type: "select",
          col: "col-8 mb-3",
          options: ingenierosOptions,
          placeholder:
            ingenierosOptions.length > 0
              ? "Seleccione un ingeniero"
              : "Cargando ingenieros...",
          disabled: ingenierosOptions.length === 0,
        },
      ],
    },

    {
      title: "Información Despacho",
      fields: [
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
        {
          name: "ticket_entrega",
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
        {
          name: "estado",
          label: "Estado",
          type: "select",
          options: ["EN COMPRA", "GESTIONADO", "PENDIENTE DESPACHO"],
        },
        { name: "serie", label: "SERIE", type: "text", transform: "uppercase" },
        {
          name: "observacion",
          label: "Observacion",
          type: "text",
          transform: "sentence",
        },
      ],
    },
  ];

  //FORMULARIO //
  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Gestión de Solicitudes" back="/inventarios" />

        <hr />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar ID o Serie"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Solicitud
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createSolicitudes}
          updateItem={updateSolicitudes}
          deleteItem={deleteSolicitudes}
          idField="id_registro"
          requiredFields={{
            id_registro: "Id Registro",
            fecha_registro: "Fecha Registro",
            tipo_solicitud: "Tipo de Solicitud",
            orden_de_compra: "Orden de Compra",
            descripcion_solicitud: "Descripción Solicitud",
            id_solicitante: "Id Solicitante",
            id_user: "Id Usuario",
            id_ingeniero: "Id Ingeniero",
            id_activo: "Id Activo",
            ticket_entrega: "Ticket Entrega",
            ticket_bodega: "Ticket Bodega",
            estado: "Estado",
            serie: "SERIE",
            observacion: "Observacion",
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
                onSelect={(user) => {
                  setFormData(user);
                  setEditando(true);
                }}
                searchFunction={searchSolicitudes}
                columns={[
                  { field: "id_registro", label: "Id Registro" },
                  { field: "fecha_registro", label: "Fecha Registro" },
                  {
                    field: "descripcion_Solicitud",
                    label: "Descripción Solicitud",
                  },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default Solicitudes;
