import React from "react";

function FormBuilder({ fields, formData, handleChange }) {      /** Componente genérico para construir formularios dinámicos a partir de una configuración de campos, manejando transformaciones de texto y opciones para selects */
  const transformValue = (value, transform) => {         
    if (!value) return value;

    if (transform === "uppercase") {    
      return value.toUpperCase();
    }

    if (transform === "sentence") {   
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    if (transform === "title") {  
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return value;
  };

  return (
    <div className="row">   
      {fields.map((field) => {
        if (field.type === "select") {  
          return (
            <div className={field.col || "col-md-4 mb-3"} key={field.name}>   
              <label className="form-label text-dark small fw-bold">
                {field.label}
              </label>

              <select
                className="form-select"   
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                disabled={field.disabled}
              >
                <option value="">
                  {field.placeholder || "Seleccione"}
                </option>

                {field.options.map((opt) => {
                  const value = typeof opt === "object" ? opt.value : opt;
                  const label = typeof opt === "object" ? opt.label : opt;

                  return (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }

        return (
          <div className={field.col || "col-md-4 mb-3"} key={field.name}>
            <label className="form-label text-dark small fw-bold">
              {field.label}
            </label>

            <input
              type={field.type || "text"}
              className="form-control"
              name={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => {
                let value = e.target.value;

                if (field.transform) {
                  value = transformValue(value, field.transform);
                }

                handleChange({
                  target: {
                    name: field.name,
                    value: value,
                  },
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FormBuilder;
