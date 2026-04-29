import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";

//Importa los elementos del Api

import {
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} from "../api/productosApi";

import "../assets/css/estilos4.css";

function Productos() {
  //Estados

  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    categoria_activo: "",
    id_activo: "",
    tipo_activo: "",
    marca: "",
    modelo: "",
    eovs: "",
  };

  const formSections = [
    {
      title: "Información de Activo",
      fields: [
        {
          name: "id_activo",
          label: "ID Activo",
          type: "text",
          transform: "uppercase",
        },
        {
          name: "categoria_activo",
          label: "Categoría Activo",
          type: "select",
          options: ["ADS COMPUTER", "ADS TELECOM", "ACCESORIES"],
        },
        {
          name: "tipo_activo",
          label: "Tipo de Activo",
          type: "text",
          transform: "title",
        },
        { name: "marca", label: "Marca", type: "text", transform: "title" },
        { name: "modelo", label: "Modelo", type: "text", transform: "title" },
        { name: "eovs", label: "EOVS", type: "date" },
      ],
    },
  ];

  //FORMULARIO //
  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Gestión de Productos" back="/inventarios" />

        <hr />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar producto por ID o Nombre"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Producto
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createProduct}
          updateItem={updateProduct}
          deleteItem={deleteProduct}
          idField="id_activo"
          requiredFields={{
            categoria_activo: "Categoría Activo",
            id_activo: "ID Activo",
            tipo_activo: "Tipo de Activo",
            marca: "Marca",
            modelo: "Modelo",
            eovs: "EOVS",
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
                searchFunction={searchProduct}
                columns={[
                  { field: "id_activo", label: "Id Activo" },
                  { field: "tipo_activo", label: "Tipo Activo" },
                  { field: "marca", label: "Marca" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default Productos;
