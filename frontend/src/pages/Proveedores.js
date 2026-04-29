import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";

import {
  createProveedor,
  updateProveedor,
  deleteProveedor,
  searchProveedores,
} from "../api/proveedoresApi";

import "../assets/css/estilos4.css";

function Proveedores() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    id_proveedor: "",
    nombre: "",
    direccion: "",
    contacto: "",
  };

  const formSections = [
    {
      title: "Informacion de Proveedor",
      fields: [
        { name: "id_proveedor", label: "Id Proveedor", type: "number" },
        { name: "nombre", label: "Nombre", type: "text", transform: "title" },
        {
          name: "direccion",
          label: "Direccion",
          type: "text",
          transform: "sentence",
          col: "col-md-6 mb-3",
        },
        {
          name: "contacto",
          label: "Contacto",
          type: "text",
          transform: "title",
          col: "col-md-6 mb-3",
        },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Gestion de Proveedores" back="/inventarios" />

        <hr />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar proveedor por ID o nombre"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Proveedor
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createProveedor}
          updateItem={updateProveedor}
          deleteItem={deleteProveedor}
          idField="id_proveedor"
          requiredFields={{
            id_proveedor: "Id Proveedor",
            nombre: "Nombre",
            direccion: "Direccion",
            contacto: "Contacto",
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
                searchFunction={searchProveedores}
                columns={[
                  { field: "id_proveedor", label: "Id Proveedor" },
                  { field: "nombre", label: "Nombre" },
                  { field: "contacto", label: "Contacto" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default Proveedores;
