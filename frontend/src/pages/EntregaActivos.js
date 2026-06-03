import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";
import { getProduct } from "../api/productosApi";
import { getUsers } from "../api/usersApi";
import { getIngenieros } from "../api/ingenierosApi";
import { getEdificios } from "../api/edificiosApi";

import {
  createEntregaActivos,
  updateEntregaActivos,
  deleteEntregaActivos,
  searchEntregaActivos,
} from "../api/entregaActivosApi";

import "../assets/css/estilos4.css";

function EntregaActivos() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productosOptions, setProductosOptions] = useState([]);
  const [usuariosOptions, setUsuariosOptions] = useState([]);
  const [ingenierosOptions, setIngenierosOptions] = useState([]);
  const [edificiosOptions, setEdificiosOptions] = useState([]);
  const navigate = useNavigate();

  const initialForm = {
    soeid_ing: localStorage.getItem("usuario") || "",
    nombre: localStorage.getItem("nombre") || "",
    fecha_actualizacion: new Date().toISOString().split("T")[0],
    ticket_asignacion: "",
    soeid_destino: "",
    full_name: "",
    rems_usuario: "",
    edificio_usuario: "",
    area_usuario: "",
    piso_usuario: "",
    pto_usuario: "",
    tipo_activo: "",
    marca: "",
    modelo: "",
    serie: "",
    hostname: "",
    serial_dd: "",
    marca_dd: "",
    cap_dd: "",
    cap_ram: "",
    placa_activo: "",
    rems_activo: "",
    edificio_activo: "",
    area_activo: "",
    piso_activo: "",
    pto_activo: "",
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
      (producto) => [producto.id_activo, producto.tipo_activo, producto.marca],
      "Error cargando productos:"
    );

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
  }, []);

  const formSections = [
    {
      title: "Información Usuario",
      fields: [
        { name: "soeid_destino", label: "SOEID_DESTINO", type: "select", options: usuariosOptions, placeholder: usuariosOptions.length>0?"Seleccione usuario":"Cargando usuarios...", disabled: usuariosOptions.length===0 },
        { name: "full_name", label: "FULL NAME", type: "text" },
        { name: "rems_usuario", label: "REMS", type: "select", options: edificiosOptions, placeholder: edificiosOptions.length>0?"Seleccione edificio":"Cargando edificios...", disabled: edificiosOptions.length===0 },
        { name: "edificio_usuario", label: "EDIFICIO", type: "text" },
        { name: "area_usuario", label: "AREA", type: "text" },
        { name: "piso_usuario", label: "PISO", type: "number" },
        { name: "pto_usuario", label: "PTO", type: "text" },
      ],
    },
    {
      title: "Información Activo",
      fields: [
        { name: "tipo_activo", label: "TIPO_ACTIVO", type: "text" },
        { name: "marca", label: "MARCA", type: "text" },
        { name: "modelo", label: "MODELO", type: "text" },
        { name: "serie", label: "SERIE", type: "text", transform: "uppercase" },
        { name: "hostname", label: "HOSTNAME", type: "text", transform: "uppercase" },
        { name: "serial_dd", label: "SERIAL_DD", type: "text" },
        { name: "marca_dd", label: "MARCA_DD", type: "text" },
        { name: "cap_dd", label: "CAP_DD", type: "text" },
        { name: "cap_ram", label: "CAP_RAM", type: "text" },
        { name: "placa_activo", label: "PLACA_ACTIVO", type: "text" },
        { name: "rems_activo", label: "REMS", type: "select", options: edificiosOptions, placeholder: edificiosOptions.length>0?"Seleccione edificio":"Cargando edificios...", disabled: edificiosOptions.length===0 },
        { name: "edificio_activo", label: "EDIFICIO", type: "text" },
        { name: "area_activo", label: "AREA", type: "text" },
        { name: "piso_activo", label: "PISO", type: "number" },
        { name: "pto_activo", label: "PTO", type: "text" },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Entrega Activos" back="/campo" />

        <hr />

        <CrudForm
          initialForm={initialForm}
          createItem={createEntregaActivos}
          updateItem={updateEntregaActivos}
          deleteItem={deleteEntregaActivos}
          idField="serie"
          requiredFields={{
            serie: "Serie",
            hostname: "Hostname",
            soeid_destino: "SOEID_DESTINO",
            confirmado: "Confirmación de entrega",
          }}
        >
          {({ formData, handleChange, setFormData, setEditando }) => (
            <>
              <div className="entrega-top mb-3">
                <div className="row g-2">
                  <div className="col-md-2">
                    <label className="form-label">SOEID_ING</label>
                    <input
                      type="text"
                      name="soeid_ing"
                      value={formData.soeid_ing}
                      onChange={handleChange}
                      className="form-control"
                      readOnly
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">NOMBRE</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="form-control"
                      readOnly
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">FECHA ACTUALIZACION</label>
                    <input
                      type="date"
                      name="fecha_actualizacion"
                      value={formData.fecha_actualizacion}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">TICKET ASIGNACION</label>
                    <input
                      type="text"
                      name="ticket_asignacion"
                      value={formData.ticket_asignacion}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <SearchBar
                value={busqueda}
                onChange={setBusqueda}
                placeholder="Buscar serie o ticket"
              />

              <div className="mb-3">
                <button
                  className="btn btn-outline-primary me-2"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Buscar Entrega
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() => navigate("/devolucion-activos")}
                >
                  Devolucion Activos
                </button>
              </div>
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

              <div className="mt-3 d-flex align-items-center">
                <button type="submit" className="btn btn-success me-3">
                  CONFIRMAR ENTREGA A USUARIO
                </button>

                <div className="form-check ms-auto">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flagConfirm"
                    checked={!!formData.confirmado}
                    onChange={() => setFormData({ ...formData, confirmado: !formData.confirmado })}
                  />
                  <label className="form-check-label" htmlFor="flagConfirm">
                    Confirmado
                  </label>
                </div>
              </div>

              <SearchModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSelect={(item) => {
                  setFormData(item);
                  setEditando(true);
                }}
                searchFunction={searchEntregaActivos}
                columns={[
                  { field: "serie", label: "Serie" },
                  { field: "hostname", label: "Hostname" },
                  { field: "ticket_asignacion", label: "Ticket Entrega" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default EntregaActivos;
