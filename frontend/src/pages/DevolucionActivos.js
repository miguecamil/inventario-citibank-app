import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";
import { getProduct } from "../api/productosApi";
import { getUsers } from "../api/usersApi";
import { getIngenieros } from "../api/ingenierosApi";

import {
  createDevolucionActivos,
  updateDevolucionActivos,
  deleteDevolucionActivos,
  searchDevolucionActivos,
} from "../api/devolucionActivosApi";

import "../assets/css/estilos4.css";

function DevolucionActivos() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productosOptions, setProductosOptions] = useState([]);
  const [usuariosOptions, setUsuariosOptions] = useState([]);
  const [ingenierosOptions, setIngenierosOptions] = useState([]);

  const initialForm = {
    soeid_user: "",
    serie: "",
    tipo_activo: "",
    marca: "",
    modelo: "",
    placa_activo: "",
    hostname: "",
    cap_ram: "",
    marca_dd: "",
    serial_dd: "",
    cap_dd: "",
    estado_ram: "",
    estado_hdd: "",
    fecha: new Date().toISOString().split("T")[0],
    ticket_traslado: "",
    soeid_ing: "",
    escenario_retorno: "",
    obs_estado_equipo: "",
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
      getUsers,
      setUsuariosOptions,
      (usuario) => usuario.id_user,
      (usuario) => [usuario.id_user, usuario.full_name],
      "Error cargando usuarios:"
    );

    cargarOpciones(
      getIngenieros,
      setIngenierosOptions,
      (ingeniero) => ingeniero.id_ingeniero,
      (ingeniero) => [ingeniero.id_ingeniero, ingeniero.nombre],
      "Error cargando ingenieros:"
    );
  }, []);

  const formSections = [
    {
      title: "Información Activo",
      fields: [
        { name: "soeid_user", label: "SOEID_USER", type: "text" },
        { name: "serie", label: "SERIE", type: "text", transform: "uppercase" },
        { name: "tipo_activo", label: "TIPO_ACTIVO", type: "text" },
        { name: "marca", label: "MARCA", type: "text" },
        { name: "modelo", label: "MODELO", type: "text" },
        { name: "placa_activo", label: "PLACA_ACTIVO", type: "text" },
        { name: "hostname", label: "HOSTNAME", type: "text", transform: "uppercase" },
        { name: "cap_ram", label: "CAP_RAM", type: "text" },
        { name: "marca_dd", label: "MARCA_DD", type: "text" },
        { name: "serial_dd", label: "SERIAL_DD", type: "text" },
        { name: "cap_dd", label: "CAP_DD", type: "text" },
        {
          name: "estado_ram",
          label: "ESTADO_RAM",
          type: "select",
          options: ["Bueno", "Defectuoso", "Precario"],
        },
        {
          name: "estado_hdd",
          label: "ESTADO_HDD",
          type: "select",
          options: ["Bueno", "Defectuoso", "Precario"],
        },
      ],
    },
    {
      title: "Información Traslado",
      fields: [
        { name: "fecha", label: "FECHA", type: "date", required: true },
        { name: "ticket_traslado", label: "TICKET_TRASLADO", type: "text", transform: "uppercase" },
        {
          name: "soeid_ing",
          label: "SOEID_ING",
          type: "select",
          options: ingenierosOptions,
          placeholder: ingenierosOptions.length > 0 ? "Seleccione ingeniero" : "Cargando ingenieros...",
          disabled: ingenierosOptions.length === 0,
        },
        {
          name: "escenario_retorno",
          label: "ESCENARIO_RETORNO",
          type: "select",
          options: ["Devolucion", "Garantia", "Cambio", "Bajas"],
        },
        { name: "obs_estado_equipo", label: "OBS_ESTADO_EQUIPO", type: "textarea" },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Devolución Activos" back="/campo" />

        <hr />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar serie o ticket"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Devolución
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createDevolucionActivos}
          updateItem={updateDevolucionActivos}
          deleteItem={deleteDevolucionActivos}
          idField="serie"
          requiredFields={{
            serie: "Serie",
            tipo_activo: "Tipo Activo",
            fecha: "Fecha",
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
                searchFunction={searchDevolucionActivos}
                columns={[
                  { field: "serie", label: "Serie" },
                  { field: "tipo_activo", label: "Tipo Activo" },
                  { field: "ticket_traslado", label: "Ticket Traslado" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default DevolucionActivos;
