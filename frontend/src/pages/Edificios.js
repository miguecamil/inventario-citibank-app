import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchModal from "../components/SearchModal";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";

import {
  createEdificio,
  updateEdificio,
  deleteEdificio,
  searchEdificios,
} from "../api/edificiosApi";

import "../assets/css/estilos4.css";

function Edificios() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    rems: "",
    edificio: "",
    ciudad: "",
    direccion: "",
  };

  const formSections = [
    {
      title: "Informacion de Edificio",
      fields: [
        { name: "rems", label: "REMS", type: "number" },
        { name: "edificio", label: "Edificio", type: "text", transform: "title" },
        { name: "ciudad", label: "Ciudad", type: "text", transform: "title" },
        {
          name: "direccion",
          label: "Direccion",
          type: "text",
          transform: "sentence",
          col: "col-12 mb-3",
        },
      ],
    },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Gestion de Edificios" back="/inventarios" />

        <hr />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar edificio por REMS, nombre o ciudad"
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Buscar Edificio
        </button>

        <CrudForm
          initialForm={initialForm}
          createItem={createEdificio}
          updateItem={updateEdificio}
          deleteItem={deleteEdificio}
          idField="rems"
          requiredFields={{
            rems: "REMS",
            edificio: "Edificio",
            ciudad: "Ciudad",
            direccion: "Direccion",
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
                searchFunction={searchEdificios}
                columns={[
                  { field: "rems", label: "REMS" },
                  { field: "edificio", label: "Edificio" },
                  { field: "ciudad", label: "Ciudad" },
                ]}
              />
            </>
          )}
        </CrudForm>
      </div>
    </div>
  );
}

export default Edificios;
