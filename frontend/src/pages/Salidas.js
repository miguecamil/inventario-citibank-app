import React from "react";
import InventarioEstadoPage from "../components/InventarioEstadoPage";

function Salidas() {
  const getFormSections = (catalogoOptions) => [
    {
      title: "Datos de Salida",
      fields: [
        { name: "fecha_asignacion", label: "Fecha Asignacion", type: "date" },
        { name: "serie", label: "Serie", type: "text", transform: "uppercase" },
        {
          name: "id_activo",
          label: "Activo",
          type: "select",
          col: "col-12 mb-3",
          options: catalogoOptions.productos,
          placeholder: "Seleccione un activo",
        },
        {
          name: "ticket_asignacion",
          label: "Ticket Asignacion",
          type: "text",
          transform: "uppercase",
        },
        {
          name: "ticket_bodega",
          label: "Ticket Bodega",
          type: "text",
          transform: "uppercase",
        },
        {
          name: "id_ingeniero",
          label: "Ingeniero",
          type: "select",
          col: "col-md-6 mb-3",
          options: catalogoOptions.ingenieros,
          placeholder: "Seleccione un ingeniero",
        },
        {
          name: "estado",
          label: "Estado",
          type: "select",
          options: ["SALIDA", "CAMPO"],
        },
        {
          name: "id_user",
          label: "Usuario",
          type: "select",
          col: "col-md-6 mb-3",
          options: catalogoOptions.usuarios,
          placeholder: "Seleccione un usuario",
        },
      ],
    },
  ];

  const tableColumns = [
    { field: "fecha_asignacion", label: "Fecha Asignacion" },
    { field: "serie", label: "Serie" },
    { field: "id_activo_label", label: "Activo" },
    { field: "ticket_asignacion", label: "Ticket Asignacion" },
    { field: "ticket_bodega", label: "Ticket Bodega" },
    { field: "id_ingeniero_label", label: "Ingeniero" },
    { field: "estado", label: "Estado" },
    { field: "id_user_label", label: "Usuario" },
  ];

  const searchColumns = [
    { field: "serie", label: "Serie" },
    { field: "ticket_asignacion", label: "Ticket Asignacion" },
    { field: "ticket_bodega", label: "Ticket Bodega" },
    { field: "id_activo", label: "Id Activo" },
    { field: "id_user", label: "Id Usuario" },
  ];

  return (
    <InventarioEstadoPage
      title="Gestion de Salidas"
      estadoFiltro="SALIDA"
      getFormSections={getFormSections}
      tableColumns={tableColumns}
      searchColumns={searchColumns}
      searchPlaceholder="Buscar por serie o ticket de asignacion"
    />
  );
}

export default Salidas;
