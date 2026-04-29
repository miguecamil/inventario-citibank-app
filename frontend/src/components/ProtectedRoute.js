import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ajusta la ruta si es necesario

function ProtectedRoute({ children, roles }) {
  const { auth } = useAuth();

  // Si no hay usuario logueado
  if (!auth.token) {
    return <Navigate to="/" />;
  }

  // Si el rol no está permitido, redirige a una página de no autorizado
  if (!roles.includes(auth.nivel)) {
    return <Navigate to="/unauthorized" />; // Nueva ruta
  }

  return children;
}

export default ProtectedRoute;