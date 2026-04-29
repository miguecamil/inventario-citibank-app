import React, { useState } from "react";

function CrudForm({
  initialForm,
  createItem,
  updateItem,
  deleteItem,
  idField,
  requiredFields = [],
  children,
}) {

  const [formData, setFormData] = useState(initialForm);
  const [editando, setEditando] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const validarCampos = () => {

  for (const campo in requiredFields) {

    if (!formData[campo] || formData[campo].toString().trim() === "") {

      alert(`El campo "${requiredFields[campo]}" es obligatorio`);
      return false;

    }

  }

  return true;

};


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validarCampos()) return;

    try {

      if (editando) {

        await updateItem(formData[idField], formData);
        alert("Registro actualizado");

      } else {

        await createItem(formData);
        alert("Registro guardado");

      }

      setFormData(initialForm);
      setEditando(false);

    } catch (error) {

      const detalleError = error.response?.data
        ? JSON.stringify(error.response.data)
        : error.message;

      console.error("Error guardando datos:", error.response?.data || error);
      alert(`Error guardando datos: ${detalleError}`);

    }

  };

  const eliminar = async () => {

    if (!window.confirm("¿Desea eliminar este registro?")) return;

    try {

      await deleteItem(formData[idField]);
      alert("Registro eliminado");

      setFormData(initialForm);
      setEditando(false);

    } catch {

      alert("Error eliminando");

    }

  };

  return (

    <form onSubmit={handleSubmit}>

      {children({
        formData,
        handleChange,
        setFormData,
        editando,
        setEditando,
      })}

      <div className="mt-4">

        <button className="btn btn-primary me-2">
          {editando ? "Actualizar" : "Guardar"}
        </button>

        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => {
            setFormData(initialForm);
            setEditando(false);
          }}
        >
          Limpiar
        </button>

        {editando && (

          <button
            type="button"
            className="btn btn-danger"
            onClick={eliminar}
          >

            Eliminar

          </button>

        )}

      </div>

    </form>

  );

}

export default CrudForm;
