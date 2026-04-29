import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Asegúrate de que las rutas a tus assets sean correctas
import "../assets/css/estilos2.css";
import Logo from "../assets/img/Logo.png";

function Inventarios({ logout }) {
  const navigate = useNavigate();
  
  // Recuperamos el nombre del usuario o nivel guardado en el localStorage
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
            <small className="text-muted">{nombreUsuario} (Team Inventarios)</small>
          </div>
        </div>
        <Link to="/menu">
          <img src={Logo} alt="Citi" height="28" style={{ cursor: 'pointer' }} />
        </Link>
      </div>

      {/* Opciones de menú */}
      <div className="menu-options mt-4">
        {/* Usamos un mapeo o lista limpia para las opciones */}
        {[
          { to: "/solicitudes", icon: "bi-journal-text", text: "Registro Solicitudes" },
          { to: "/inventario", icon: "bi-bar-chart-line", text: "Inventario Total" },
          { to: "/productos", icon: "bi-box", text: "Productos" },
          { to: "/edificios", icon: "bi-building", text: "Edificios" },
          { to: "/proveedores", icon: "bi-truck", text: "Proveedores" },
          { to: "/usuarios", icon: "bi-people", text: "Staff" },
          { to: "/ingenieros-lista", icon: "bi-person-lines-fill", text: "Ingenieros" },
          { to: "/entradas", icon: "bi-cart-check", text: "Entradas" },
          { to: "/salidas", icon: "bi-cart-dash", text: "Salidas" }
        ].map((item, index) => (
          <Link 
            key={index}
            to={item.to} 
            className="menu-item d-flex justify-content-between align-items-center p-3 text-decoration-none border rounded mb-2 text-dark shadow-sm bg-white"
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

export default Inventarios;
