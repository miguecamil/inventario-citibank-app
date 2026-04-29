import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";
import { getEdificios } from "../api/edificiosApi";

import {
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
} from "../api/usersApi";

import "../assets/css/estilos4.css";

function Usuarios() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [edificiosOptions, setEdificiosOptions] = useState([]);

  const initialForm = {
    fecha_registro: new Date().toISOString().split("T")[0],
    id_user: "",
    full_name: "",
    vehiculo_legal: "",
    goc: "",
    empl_status: "",
    tipo_usuario: "",
    id_edificio: "",
    area: "",
    piso: "",
    puesto: "",
    id_manager: "",
    full_name_manager: "",
  };

  useEffect(() => {
    const cargarEdificios = async () => {
      try {
        const edificios = await getEdificios();

        const options = edificios.map((edificio) => ({
          value: edificio.rems,
          label: [edificio.rems, edificio.edificio, edificio.ciudad]
            .filter(Boolean)
            .join(" - "),
        }));

        setEdificiosOptions(options);
      } catch (error) {
        console.error("Error cargando edificios:", error);
        setEdificiosOptions([]);
      }
    };

    cargarEdificios();
  }, []);

  const formSections = [  /** Secciones del fomulario y elementos */
    {
      title: "Informacion Basica",
      fields: [
        { name: "fecha_registro", label: "Fecha Registro", type: "date" },
        { name: "id_user", label: "ID Usuario", type: "text", transform: "uppercase" },
        { name: "full_name", label: "Nombre Completo", type: "text", transform: "title" },
        { name: "id_manager", label: "ID Manager", type: "text", transform: "uppercase" },
        { name: "full_name_manager", label: "Full Name Manager", type: "text", transform: "title" },
      ],
    },
    {
      title: "Informacion Laboral",
      fields: [
        {
          name: "vehiculo_legal",
          label: "Vehiculo Legal",
          type: "select",
          options: ["COLREPFIN", "CITIBANK", "CITIVALORES", "CITRITRUST"],
        },
        { name: "goc", label: "GOC", type: "number" },
        { name: "empl_status", label: "Estado", type: "select", options: ["ACTIVO", "TERMINADO"] },
        { name: "tipo_usuario", label: "Tipo Contrato", type: "select", options: ["DIRECTO", "VENDOR"] },
      ],
    },
    {
      title: "Ubicacion de Usuario",
      fields: [
        {
          name: "id_edificio",
          label: "Edificio",
          type: "select",
          col: "col-12 mb-3",
          options: edificiosOptions,
          placeholder:
            edificiosOptions.length > 0
              ? "Seleccione un edificio"
              : "Cargando edificios...",
          disabled: edificiosOptions.length === 0,
        },
        { name: "area", label: "Area", type: "text", transform: "title" },
        { name: "puesto", label: "Puesto", type: "text", transform: "title" },
        { name: "piso", label: "Piso", type: "text", transform: "title" },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Gestion de Usuarios" back="/inventarios" />

        <hr />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar usuario por ID o nombre"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Usuario
        </button>

        <CrudForm           /** Determina los campos requerido u obligatorios */
          initialForm={initialForm}
          createItem={createUser}
          updateItem={updateUser}
          deleteItem={deleteUser}
          idField="id_user"
          requiredFields={{
            id_user: "ID Usuario",
            full_name: "Nombre Completo",
            vehiculo_legal: "Vehiculo Legal",
            goc: "GOC",
            empl_status: "Estado",
            tipo_usuario: "Tipo Contrato",
            id_edificio: "Edificio",
            area: "Area",
            piso: "Piso",
            puesto: "Puesto",
            id_manager: "Id Manager",
            full_name_manager: "Full Name Manager",
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
                searchFunction={searchUsers}
                columns={[
                  { field: "id_user", label: "ID" },
                  { field: "full_name", label: "Nombre" },
                  { field: "empl_status", label: "Estado" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default Usuarios;
