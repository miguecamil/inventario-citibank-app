import React, { useState, useEffect } from "react";

function SearchModal({
  show,
  onClose,
  onSelect,
  searchFunction,
  columns = [],
}) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (show && searchFunction) {
      searchFunction(search)
        .then((res) => {
          setData(res.data || []);
        })
        .catch((error) => {
          console.error("Error buscando datos:", error);
        });
    }
  }, [search, show, searchFunction]);

  if (!show) return null;

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Buscar</h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <input
              className="form-control mb-3"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <table className="table table-hover">
              <thead>
                <tr>
                  {columns?.map((col) => (
                    <th key={col.field}>{col.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data?.map((item, index) => (
                  <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                  >
                    {columns?.map((col) => (
                      <td key={col.field}>{item[col.field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
