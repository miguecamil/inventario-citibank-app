import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importamos los estilos adaptables (puedes usar el mismo estilos2 o crear estilos3)
import "../assets/css/estilos3.css"; 
import Logo from "../assets/img/Logo.png";

function Campo({ logout }) {
  const navigate = useNavigate();
  
  // Recuperamos los datos del login
  const nombreUsuario = localStorage.getItem("nombre") || "nombre";
  const soeId = localStorage.getItem("usuario") || "usuario";

  const confirmExit = () => {
    if (window.confirm("¿Seguro que deseas salir del sistema?")) {
      logout ? logout() : navigate('/');
    }
      
  };

  return (
    <div className="menu-wrapper shadow">
      {/* Header Usuario */}
      <div className="menu-header d-flex justify-content-between align-items-center p-3 border-bottom bg-light rounded-top">
        <div className="d-flex align-items-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
            width="50" 
            alt="Usuario" 
            className="me-3" 
          />
          <div>
            <h6 className="mb-0 text-capitalize">{soeId}</h6>
            <small className="text-muted">{nombreUsuario} (Ing. Campo)</small>
          </div>
        </div>
        <Link to="/menu">
          <img src={Logo} alt="Citi" height="28" style={{ cursor: 'pointer' }} />
        </Link>
      </div>

      {/* Opciones de menú adaptables */}
      <div className="menu-options mt-4">
        {[
          { to: "/entrega-activos", icon: "bi-file-earmark-check", text: "Entrega Activos" },
          { to: "/devolucion-activos", icon: "bi-clipboard-x", text: "Devolución Activos" },
          { to: "/update-movimientos", icon: "bi-arrow-repeat", text: "Update Movimientos" },
          { to: "/mapa-sitio", icon: "bi-geo-alt-fill", text: "Mapa del Sitio" },
          { to: "/mis-tickets", icon: "bi-tools", text: "Mis Tareas" },
          { to: "/soporte", icon: "bi-headset", text: "Soporte Técnico" }
        ].map((item, index) => (
          <Link 
            key={index}
            to={item.to} 
            className="menu-item d-flex justify-content-between align-items-center"
          >
            <span><i className={`bi ${item.icon} me-2 text-primary`}></i> {item.text}</span>
            <i className="bi bi-chevron-right text-muted"></i>
          </Link>
        ))}
      </div>

      {/* Footer */}
        <footer className="menu-footer d-flex flex-column align-items-center mt-5 pb-4">

          <button
            onClick={confirmExit}
            className="logout-btn"
            title="Cerrar Sesión"
          >
            <i className="bi bi-power"></i>
          </button>

          <p className="mt-2 text-muted small">
            © Citibank 2026 - Derechos Reservados
          </p>

        </footer>
    </div>
  );
}

export default Campo;