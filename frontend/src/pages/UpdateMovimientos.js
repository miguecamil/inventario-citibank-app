import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";
import { getUsers } from "../api/usersApi";
import { getIngenieros } from "../api/ingenierosApi";
import { getEdificios } from "../api/edificiosApi";

import {
  createUpdateMovimientos,
  updateUpdateMovimientos,
  deleteUpdateMovimientos,
  searchUpdateMovimientos,
} from "../api/updateMovimientosApi";

import "../assets/css/estilos4.css";

function UpdateMovimientos() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [usuariosOptions, setUsuariosOptions] = useState([]);
  const [ingenierosOptions, setIngenierosOptions] = useState([]);
  const [edificiosOptions, setEdificiosOptions] = useState([]);
  const [areasOptions, setAreasOptions] = useState([]);
  const [pisosOptions, setPisosOptions] = useState([]);

  const initialForm = {
    tipo_activo: "",
    marca: "",
    modelo: "",
    serie: "",
    placa_activo: "",
    hostname: "",
    soeid_destino: "",
    full_name: "",
    rems: "",
    edificio: "",
    ciudad: "",
    area: "",
    piso: "",
    ubicacion_mapa: "",
    obs_estado_equipo: "",
    fecha_actualizacion: new Date().toISOString().split("T")[0],
    soeid_ing: "",
    nombre: "",
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

    cargarOpciones(
      getEdificios,
      setEdificiosOptions,
      (edificio) => edificio.rems,
      (edificio) => [edificio.rems, edificio.edificio],
      "Error cargando edificios:"
    );

    // Mock areas - idealmente viene de API
    setAreasOptions([
      { value: "TTS OPS", label: "TTS OPS" },
      { value: "CSIS", label: "CSIS" },
      { value: "RH", label: "RH" },
    ]);

    // Mock pisos
    setPisosOptions([
      { value: "1", label: "1 Piso" },
      { value: "2", label: "2 Piso" },
      { value: "3", label: "3 Piso" },
    ]);
  }, []);

  const formSections = [
    {
      title: "Información del Activo",
      fields: [
        { name: "tipo_activo", label: "TIPO_ACTIVO", type: "text" },
        { name: "marca", label: "MARCA", type: "text" },
        { name: "modelo", label: "MODELO", type: "text" },
        { name: "serie", label: "SERIE", type: "text", transform: "uppercase" },
        { name: "placa_activo", label: "PLACA_ACTIVO", type: "text" },
        { name: "hostname", label: "HOSTNAME", type: "text", transform: "uppercase" },
        {
          name: "soeid_destino",
          label: "SOEID_DESTINO",
          type: "select",
          options: usuariosOptions,
          placeholder: usuariosOptions.length > 0 ? "Seleccione usuario" : "Cargando usuarios...",
          disabled: usuariosOptions.length === 0,
        },
        { name: "full_name", label: "FULL_NAME", type: "text" },
        {
          name: "rems",
          label: "REMS",
          type: "select",
          options: edificiosOptions,
          placeholder: edificiosOptions.length > 0 ? "Seleccione edificio" : "Cargando edificios...",
          disabled: edificiosOptions.length === 0,
        },
        { name: "edificio", label: "EDIFICIO", type: "text" },
        { name: "ciudad", label: "CIUDAD", type: "text" },
      ],
    },
    {
      title: "Información a Actualizar",
      fields: [
        {
          name: "area",
          label: "AREA",
          type: "select",
          options: areasOptions,
          placeholder: "Seleccione área",
        },
        {
          name: "piso",
          label: "PISO",
          type: "select",
          options: pisosOptions,
          placeholder: "Seleccione piso",
        },
        { name: "ubicacion_mapa", label: "UBICACION_MAPA", type: "text" },
        { name: "obs_estado_equipo", label: "OBS_ESTADO_EQUIPO", type: "textarea" },
        { name: "fecha_actualizacion", label: "FECHA_ACTUALIZACION", type: "date", required: true },
        {
          name: "soeid_ing",
          label: "SOEID_ING",
          type: "select",
          options: ingenierosOptions,
          placeholder: ingenierosOptions.length > 0 ? "Seleccione ingeniero" : "Cargando ingenieros...",
          disabled: ingenierosOptions.length === 0,
        },
        { name: "nombre", label: "NOMBRE", type: "text" },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Update Movimientos" back="/campo" />

        <hr />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar serie o usuario"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Movimiento
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createUpdateMovimientos}
          updateItem={updateUpdateMovimientos}
          deleteItem={deleteUpdateMovimientos}
          idField="serie"
          requiredFields={{
            serie: "Serie",
            fecha_actualizacion: "Fecha Actualización",
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
                searchFunction={searchUpdateMovimientos}
                columns={[
                  { field: "serie", label: "Serie" },
                  { field: "tipo_activo", label: "Tipo Activo" },
                  { field: "soeid_destino", label: "Usuario" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default UpdateMovimientos;
