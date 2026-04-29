import React from "react";
import InventarioEstadoPage from "../components/InventarioEstadoPage";

function Entradas() {
  const getFormSections = (catalogoOptions) => [
    {
      title: "Datos de Entrada",
      fields: [
        { name: "fecha_devolucion", label: "Fecha Devolucion", type: "date" },
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
          name: "id_user",
          label: "Usuario",
          type: "select",
          col: "col-md-6 mb-3",
          options: catalogoOptions.usuarios,
          placeholder: "Seleccione un usuario",
        },
        {
          name: "id_ingeniero_devolucion",
          label: "Ingeniero Devolucion",
          type: "select",
          col: "col-md-6 mb-3",
          options: catalogoOptions.ingenieros,
          placeholder: "Seleccione un ingeniero",
        },
        {
          name: "ticket_devolucion",
          label: "Ticket Devolucion",
          type: "text",
          transform: "uppercase",
        },
        {
          name: "estado_devolucion",
          label: "Estado Devolucion",
          type: "select",
          options: ["Nuevo", "Reuso", "Garantia", "Bajas"],
        },
      ],
    },
  ];

  const tableColumns = [
    { field: "fecha_devolucion", label: "Fecha Devolucion" },
    { field: "serie", label: "Serie" },
    { field: "id_activo_label", label: "Activo" },
    { field: "id_user_label", label: "Usuario" },
    {
      field: "id_ingeniero_devolucion_label",
      label: "Ingeniero Devolucion",
    },
    { field: "ticket_devolucion", label: "Ticket Devolucion" },
    { field: "estado_devolucion", label: "Estado Devolucion" },
  ];

  const searchColumns = [
    { field: "serie", label: "Serie" },
    { field: "ticket_devolucion", label: "Ticket Devolucion" },
    { field: "id_activo", label: "Id Activo" },
    { field: "id_user", label: "Id Usuario" },
    { field: "id_ingeniero_devolucion", label: "Ingeniero Devolucion" },
  ];

  return (
    <InventarioEstadoPage
      title="Gestion de Entradas"
      estadoFiltro="DEVOLUCION"
      getFormSections={getFormSections}
      tableColumns={tableColumns}
      searchColumns={searchColumns}
      searchPlaceholder="Buscar por serie o ticket de devolucion"
    />
  );
}

export default Entradas;
