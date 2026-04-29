import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";

import {
  createIngeniero,
  updateIngeniero,
  deleteIngeniero,
  searchIngenieros,
} from "../api/ingenierosApi";



function Ingenieros() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    id_ingeniero: "",
    nombre: "",
    nivel: "",
    password: "",
  };

  const formSections = [
    {
      title: "Datos del Perfil",
      fields: [
        {
          name: "id_ingeniero",
          label: "ID Ingeniero",
          type: "text",
          transform: "uppercase",
        },

        {
          name: "nivel",
          label: "Nivel",
          type: "select",
          options: ["Ingeniero", "Inventarios", "Superusuario"],
        },

        {
          name: "nombre",
          label: "Nombre Completo",
          type: "text",
          transform: "title",
        },

        { name: "password", label: "Password", type: "password" },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Gestión de Ingenieros" back="/inventarios" />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar ingeniero"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Ingeniero
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createIngeniero}
          updateItem={updateIngeniero}
          deleteItem={deleteIngeniero}
          idField="id_ingeniero"
          requiredFields={{
            id_ingeniero: "ID Ingeniero",
            nombre: "Nombre Completo",
            nivel: "Nivel",
            password: "Password",
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
                onSelect={(ing) => {
                  setFormData(ing);
                  setEditando(true);
                }}
                searchFunction={searchIngenieros}
                columns={[
                  { field: "id_ingeniero", label: "ID" },
                  { field: "nombre", label: "Nombre" },
                  { field: "nivel", label: "Nivel" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default Ingenieros;
