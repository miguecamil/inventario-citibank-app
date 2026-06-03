const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const buildTableHead = (columns) =>
  columns
    .map((column) => `<th>${escapeHtml(column.label)}</th>`)
    .join("");

const buildTableRow = (columns, record) =>
  columns
    .map((column) => `<td>${escapeHtml(record[column.field])}</td>`)
    .join("");

const buildPrintMarkup = ({
  reportTitle,
  generatedAt,
  record,
  detailFields,
  logoSrc,
}) => `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(reportTitle)}</title>
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 18px;
        font-family: Arial, Helvetica, sans-serif;
        color: #111827;
        background: #fff;
      }

      .preview-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-bottom: 14px;
      }

      .preview-actions button {
        border: 1px solid #374151;
        background: #fff;
        color: #111827;
        padding: 8px 14px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 4px;
        cursor: pointer;
      }

      .preview-actions button.primary {
        background: #111827;
        color: #fff;
      }

      .report-shell {
        border: 1px solid #4b5563;
      }

      .report-header {
        display: grid;
        grid-template-columns: 190px 1fr 180px;
        min-height: 70px;
      }

      .report-header > div {
        border-right: 1px solid #6b7280;
        border-bottom: 1px solid #6b7280;
        padding: 8px 10px;
      }

      .report-header > div:last-child {
        border-right: 0;
      }

      .logo-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .logo-box img {
        max-width: 140px;
        max-height: 42px;
        object-fit: contain;
      }

      .header-spacer {
        background-image: radial-gradient(#d1d5db 0.8px, transparent 0.8px);
        background-size: 6px 6px;
      }

      .date-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 11px;
      }

      .date-box strong {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #374151;
      }

      .date-box span {
        margin-top: 4px;
        font-size: 13px;
      }

      .report-title {
        border-bottom: 1px solid #6b7280;
        padding: 8px 12px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }

      .report-subtitle {
        border-bottom: 1px solid #6b7280;
        padding: 5px 12px;
        font-size: 11px;
        color: #4b5563;
        text-align: center;
      }

      .movement-table {
        width: 100%;
        border-collapse: collapse;
      }

      .movement-table th,
      .movement-table td {
        border-top: 1px solid #9ca3af;
        border-right: 1px solid #9ca3af;
        padding: 7px 8px;
        font-size: 10px;
        text-align: left;
        vertical-align: top;
        word-break: break-word;
      }

      .movement-table th:last-child,
      .movement-table td:last-child {
        border-right: 0;
      }

      .movement-table thead th {
        background: #f3f4f6;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        text-align: center;
      }

      .signatures {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
        padding: 34px 18px 20px;
      }

      .signature-box {
        text-align: center;
        font-size: 12px;
      }

      .signature-line {
        border-top: 1px solid #111827;
        margin-bottom: 6px;
        height: 24px;
      }

      @media print {
        body {
          padding: 0;
        }

        .preview-actions {
          display: none;
        }

        .report-shell {
          border: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="preview-actions">
      <button type="button" onclick="window.close()">Cerrar</button>
      <button type="button" class="primary" onclick="window.print()">Imprimir</button>
    </div>
    <div class="report-shell">
      <div class="report-header">
        <div class="logo-box">
          <img src="${escapeHtml(logoSrc)}" alt="Logo" />
        </div>
        <div class="header-spacer"></div>
        <div class="date-box">
          <strong>Fecha</strong>
          <span>${escapeHtml(generatedAt)}</span>
        </div>
      </div>
      <div class="report-title">${escapeHtml(reportTitle)}</div>
      <div class="report-subtitle">Formato de movimientos de inventario</div>

      <table class="movement-table">
        <thead>
          <tr>${buildTableHead(detailFields)}</tr>
        </thead>
        <tbody>
          <tr>${buildTableRow(detailFields, record)}</tr>
        </tbody>
      </table>

      <div class="signatures">
        <div class="signature-box">
          <div class="signature-line"></div>
          ENTREGA
        </div>
        <div class="signature-box">
          <div class="signature-line"></div>
          RECIBE
        </div>
        <div class="signature-box">
          <div class="signature-line"></div>
          AUTORIZA
        </div>
      </div>

    </div>
  </body>
</html>`;

export const printMovementReport = ({
  reportTitle,
  record,
  detailFields,
  logoSrc,
}) => {
  const generatedAt = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  const printableRecord = Object.entries(record).reduce((acc, [key, value]) => {
    acc[key] = key.toLowerCase().includes("fecha") ? formatDate(value) : value ?? "";
    return acc;
  }, {});

  const printWindow = window.open("", "_blank", "width=1100,height=850");
  if (!printWindow) {
    alert("No fue posible abrir la ventana de impresión. Verifique el bloqueador de ventanas.");
    return;
  }

  const markup = buildPrintMarkup({
    reportTitle,
    generatedAt,
    record: printableRecord,
    detailFields,
    logoSrc,
  });

  printWindow.document.open();
  printWindow.document.write(markup);
  printWindow.document.close();
  printWindow.focus();
};
