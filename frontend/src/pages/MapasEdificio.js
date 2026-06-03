import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import CrudForm from "../components/CrudForm";
import FormBuilder from "../components/FormBuilder";
import { getEdificios } from "../api/edificiosApi";
import { getMapasEdificios, getMapasEdificiosByEdificioAndPiso, createMapaArea, updateMapaArea, deleteMapaArea } from "../api/mapasEdificiosApi";

import "../assets/css/estilos4.css";

function MapasEdificio() {
  const [edificios, setEdificios] = useState([]);
  const [selectedEdificio, setSelectedEdificio] = useState(null);
  const [pisos, setPisos] = useState([]);
  const [selectedPiso, setSelectedPiso] = useState(null);
  const [mapa, setMapa] = useState(null);
  const [areasData, setAreasData] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const imgRef = useRef(null);

  const handleMapClick = (e) => {
    // Ignore clicks on hotspot buttons (they stop propagation by default because of the button element)
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (x < 0 || x > 1 || y < 0 || y > 1) return;

    const temp = {
      id: null,
      area: "",
      soSeats: "",
      neighborhood: "",
      x: parseFloat(x.toFixed(4)),
      y: parseFloat(y.toFixed(4)),
    };

    setSelectedArea(temp);
  };

  useEffect(() => {
    cargarEdificios();
  }, []);

  const cargarEdificios = async () => {
    try {
      const data = await getEdificios();
      setEdificios(data);
      if (data.length > 0) {
        setSelectedEdificio(data[0].rems);
      }
    } catch (error) {
      console.error("Error cargando edificios:", error);
    }
  };

  useEffect(() => {
    if (selectedEdificio) {
      cargarPisos();
    }
  }, [selectedEdificio]);

  const cargarPisos = async () => {
    try {
      const mockPisos = [
        { id: "1", piso: "PISO 1 MZZ NTE" },
        { id: "2", piso: "PISO 1 NTE" },
        { id: "3", piso: "PISO 2 NTE" },
        { id: "4", piso: "PISO 2 SUR" },
        { id: "5", piso: "PISO 3" },
      ];
      setPisos(mockPisos);
      if (mockPisos.length > 0) {
        setSelectedPiso(mockPisos[0].id);
      }
    } catch (error) {
      console.error("Error cargando pisos:", error);
    }
  };

  useEffect(() => {
    if (selectedEdificio && selectedPiso) {
      cargarMapa();
    }
  }, [selectedEdificio, selectedPiso]);

  const cargarMapa = async () => {
    try {
      // request areas from backend
      const resp = await getMapasEdificiosByEdificioAndPiso(selectedEdificio, selectedPiso);

      setMapa({
        edificio: selectedEdificio,
        piso: selectedPiso,
        imagen: "https://via.placeholder.com/1100x800?text=Mapa+de+Piso",
      });

      const mapped = (resp || []).map((r) => ({
        id: r.id,
        area: r.area,
        soSeats: r.so_seats,
        neighborhood: r.neighborhood,
        x: r.x,
        y: r.y,
        rems: r.rems,
        piso: r.piso,
      }));

      if (mapped.length > 0) setSelectedArea(mapped[0]);
      setAreasData(mapped);
    } catch (error) {
      console.error("Error cargando mapa:", error);
    }
  };

  const edificioActual = edificios.find((e) => e.rems === selectedEdificio);

  const initialForm = {
    id: null,
    area: "",
    soSeats: "",
    neighborhood: "",
    x: "",
    y: "",
  };

  const createItem = async (item) => {
    try {
      const payload = {
        rems: selectedEdificio,
        piso: selectedPiso,
        area: item.area,
        so_seats: item.soSeats || null,
        neighborhood: item.neighborhood || "",
        x: parseFloat(item.x) || 0,
        y: parseFloat(item.y) || 0,
      };

      const resp = await createMapaArea(payload);
      const cliente = {
        id: resp.id,
        area: resp.area,
        soSeats: resp.so_seats,
        neighborhood: resp.neighborhood,
        x: resp.x,
        y: resp.y,
        rems: resp.rems,
        piso: resp.piso,
      };
      setAreasData((prev) => [...prev, cliente]);
      setSelectedArea(cliente);
    } catch (err) {
      console.error("Error creando área:", err);
      alert("Error creando área en servidor");
    }
  };

  const updateItem = async (id, item) => {
    try {
      const payload = {
        rems: selectedEdificio,
        piso: selectedPiso,
        area: item.area,
        so_seats: item.soSeats || null,
        neighborhood: item.neighborhood || "",
        x: parseFloat(item.x) || 0,
        y: parseFloat(item.y) || 0,
      };

      const resp = await updateMapaArea(id, payload);
      const cliente = {
        id: resp.id,
        area: resp.area,
        soSeats: resp.so_seats,
        neighborhood: resp.neighborhood,
        x: resp.x,
        y: resp.y,
        rems: resp.rems,
        piso: resp.piso,
      };
      setAreasData((prev) => prev.map((a) => (a.id === id ? cliente : a)));
      setSelectedArea(cliente);
    } catch (err) {
      console.error("Error actualizando área:", err);
      alert("Error actualizando área en servidor");
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteMapaArea(id);
      setAreasData((prev) => prev.filter((a) => a.id !== id));
      setSelectedArea(null);
    } catch (err) {
      console.error("Error eliminando área:", err);
      alert("Error eliminando área en servidor");
    }
  };

  const fields = [
    { name: "area", label: "Área", placeholder: "Nombre del área", col: "col-md-6" },
    { name: "soSeats", label: "SO Seats", type: "number", col: "col-md-3" },
    { name: "neighborhood", label: "Neighborhood", col: "col-md-12" },
    { name: "x", label: "Posición X (0-1)", type: "number", col: "col-md-6" },
    { name: "y", label: "Posición Y (0-1)", type: "number", col: "col-md-6" },
  ];

  return (
    <div className="ingenieros-body">
      <div className="form-wrapper shadow">
        <Header title="Mapas Edificios" back="/campo" />

        <hr />

        <div className="mapa-controls mb-3">
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <label className="form-label">EDIFICIO</label>
              <select
                className="form-select"
                value={selectedEdificio || ""}
                onChange={(e) => setSelectedEdificio(e.target.value)}
              >
                {edificios.map((e) => (
                  <option key={e.rems} value={e.rems}>
                    {e.edificio}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">PISO</label>
              <select
                className="form-select"
                value={selectedPiso || ""}
                onChange={(e) => setSelectedPiso(e.target.value)}
              >
                {pisos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.piso}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pisos-tabs mb-3">
            <div className="btn-group" role="group">
              {pisos.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`btn btn-sm ${selectedPiso === p.id ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setSelectedPiso(p.id)}
                >
                  {p.piso}
                </button>
              ))}
            </div>
          </div>
        </div>

        {mapa && (
          <div className="mapa-container mb-3 p-3 border rounded bg-light">
            <h6 className="mb-3">
              {edificioActual?.edificio} - {selectedPiso}
            </h6>

            <div style={{ position: "relative" }} className="mb-3">
              <h2 className="mapa-title">{edificioActual?.edificio || "EDIFICIO"} {selectedPiso} .</h2>
              <img
                ref={imgRef}
                onClick={handleMapClick}
                src={mapa.imagen}
                alt="Mapa de Piso"
                className="img-fluid rounded"
                style={{ cursor: "crosshair", maxHeight: "600px", width: "100%", objectFit: "contain" }}
              />

              {areasData.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`btn btn-sm btn-danger mapa-hotspot`}
                  onClick={() => {
                    setSelectedArea(a);
                  }}
                  style={{
                    position: "absolute",
                    left: `${a.x * 100}%`,
                    top: `${a.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    padding: "6px 8px",
                    opacity: 0.95,
                  }}
                >
                  {a.id}
                </button>
              ))}
            </div>

            <div className="row">
              <div className="col-md-7">
                <h6 className="section-title">Áreas y Ocupación</h6>
                <hr />
                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Área</th>
                        <th>SO Seats</th>
                        <th>Neighborhood</th>
                      </tr>
                    </thead>
                    <tbody>
                      {areasData.map((area, idx) => (
                        <tr key={area.id} onClick={() => setSelectedArea(area)} style={{ cursor: "pointer" }}>
                          <td>{area.id}</td>
                          <td>{area.area}</td>
                          <td>{area.soSeats}</td>
                          <td>{area.neighborhood}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-md-5">
                <h6 className="section-title">Editar Área</h6>
                <hr />

                <CrudForm
                  key={selectedArea ? selectedArea.id : "new"}
                  initialForm={selectedArea || initialForm}
                  createItem={createItem}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                  idField="id"
                  requiredFields={["area"]}
                >
                  {({ formData, handleChange, setFormData, editando, setEditando }) => (
                    <>
                      <FormBuilder fields={fields} formData={formData} handleChange={handleChange} />

                      <div className="mt-2">
                        <small className="text-muted">Puedes hacer clic en un punto del mapa o seleccionar una fila para editar.</small>
                      </div>
                    </>
                  )}
                </CrudForm>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapasEdificio;
