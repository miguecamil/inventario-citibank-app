import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";
import { getUsers } from "../api/usersApi";
import { getIngenieros } from "../api/ingenierosApi";

import {
  createReasignacionTickets,
  updateReasignacionTickets,
  deleteReasignacionTickets,
  searchReasignacionTickets,
} from "../api/reasignacionTicketsApi";

import "../assets/css/estilos4.css";

function ReasignacionTickets() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [usuariosOptions, setUsuariosOptions] = useState([]);
  const [ingenierosOptions, setIngenierosOptions] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const initialForm = {
    soeid_ing: localStorage.getItem("usuario") || "",
    nombre: localStorage.getItem("nombre") || "",
    fecha_actualizacion: new Date().toISOString().split("T")[0],
    tipo_activo: "",
    marca: "",
    modelo: "",
    serie: "",
    placa_activo: "",
    estado: "",
    soeid_destino: "",
    full_name: "",
    entregado_a_usuario: "",
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
        { name: "tipo_activo", label: "TIPO_ACTIVO", type: "text" },
        { name: "marca", label: "MARCA", type: "text" },
        { name: "modelo", label: "MODELO", type: "text" },
        { name: "serie", label: "SERIE", type: "text", transform: "uppercase" },
        { name: "placa_activo", label: "PLACA_ACTIVO", type: "text" },
        {
          name: "estado",
          label: "ESTADO",
          type: "select",
          options: ["BODEGA", "CAMPO", "PRODUCCION", "SALIDA", "DEVOLUCION"],
        },
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
          name: "entregado_a_usuario",
          label: "ENTREGADO_A_USUARIO",
          type: "select",
          options: ["SI", "NO"],
        },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Reasignación Tickets" back="/campo" />

        <hr />

        <div className="reasignacion-header mb-3">
          <div className="row g-2">
            <div className="col-md-2">
              <label className="form-label">SOEID_ING</label>
              <input type="text" value={initialForm.soeid_ing} className="form-control" readOnly />
            </div>
            <div className="col-md-4">
              <label className="form-label">NOMBRE</label>
              <input type="text" value={initialForm.nombre} className="form-control" readOnly />
            </div>
            <div className="col-md-3">
              <label className="form-label">FECHA_ACTUALIZACION</label>
              <input type="date" value={initialForm.fecha_actualizacion} className="form-control" readOnly />
            </div>
          </div>
        </div>

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar serie, tipo activo o usuario"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Ticket
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createReasignacionTickets}
          updateItem={updateReasignacionTickets}
          deleteItem={deleteReasignacionTickets}
          idField="serie"
          requiredFields={{
            serie: "Serie",
            soeid_destino: "SOEID_DESTINO",
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

              <div className="mt-4">
                <h6 className="section-title">Registros Encontrados</h6>
                <hr />
                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>TIPO_ACTIVO</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>SERIE</th>
                        <th>PLACA_ACTIVO</th>
                        <th>ESTADO</th>
                        <th>FECHA_ACTUALIZACION</th>
                        <th>SOEID_DESTINO</th>
                        <th>FULL_NAME</th>
                        <th>SOEID_ING</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTable.length > 0 ? (
                        dataTable.map((row, idx) => (
                          <tr key={idx}>
                            <td>{row.tipo_activo}</td>
                            <td>{row.marca}</td>
                            <td>{row.modelo}</td>
                            <td>{row.serie}</td>
                            <td>{row.placa_activo}</td>
                            <td>{row.estado}</td>
                            <td>{row.fecha_actualizacion}</td>
                            <td>{row.soeid_destino}</td>
                            <td>{row.full_name}</td>
                            <td>{row.soeid_ing}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="text-center text-muted">
                            No hay registros
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <SearchModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSelect={(item) => {
                  setFormData(item);
                  setEditando(true);
                }}
                searchFunction={searchReasignacionTickets}
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

export default ReasignacionTickets;
