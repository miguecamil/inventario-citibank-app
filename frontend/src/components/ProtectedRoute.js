import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, roles = [] }) {
  const { auth } = useAuth();

  // Obtener token desde contexto o localStorage
  const token = auth?.token || localStorage.getItem("token");
  const nivel = auth?.nivel || localStorage.getItem("nivel");

  // No autenticado
  if (!token) {
    return <Navigate to="/" />;
  }

  //  Validación de roles (si aplica)
  if (roles.length > 0 && !roles.includes(nivel)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;