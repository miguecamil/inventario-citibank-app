import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Menu from "./pages/Menu";
import Inventarios from "./pages/Inventarios";
import Campo from "./pages/Campo";
import GestionIngenieros from "./pages/GestionIngenieros";
import Usuarios from "./pages/Usuarios";
import Productos from "./pages/Productos";
import Solicitudes from "./pages/Solicitudes";
import Edificios from "./pages/Edificios";
import Proveedores from "./pages/Proveedores";
import Entradas from "./pages/Entradas";
import Salidas from "./pages/Salidas";
import Inventario from "./pages/Inventario";
import EntregaActivos from "./pages/EntregaActivos";
import DevolucionActivos from "./pages/DevolucionActivos";
import UpdateMovimientos from "./pages/UpdateMovimientos";
import ReasignacionTickets from "./pages/ReasignacionTickets";
import MapasEdificio from "./pages/MapasEdificio";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { auth, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!auth.token ? <Login /> : <Navigate to="/menu" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/menu"
          element={
            <ProtectedRoute roles={["Inventarios", "Ingeniero", "Superusuario"]}>
              <Menu logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventarios"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Inventarios logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/campo"
          element={
            <ProtectedRoute roles={["Ingeniero", "Superusuario"]} nivel={auth.nivel}>
              <Campo logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entrega-activos"
          element={
            <ProtectedRoute roles={["Ingeniero", "Superusuario"]} nivel={auth.nivel}>
              <EntregaActivos logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/devolucion-activos"
          element={
            <ProtectedRoute roles={["Ingeniero", "Superusuario"]} nivel={auth.nivel}>
              <DevolucionActivos logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-movimientos"
          element={
            <ProtectedRoute roles={["Ingeniero", "Superusuario"]} nivel={auth.nivel}>
              <UpdateMovimientos logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-tickets"
          element={
            <ProtectedRoute roles={["Ingeniero", "Superusuario"]} nivel={auth.nivel}>
              <ReasignacionTickets logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mapa-sitio"
          element={
            <ProtectedRoute roles={["Ingeniero", "Superusuario"]} nivel={auth.nivel}>
              <MapasEdificio logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ingenieros-lista"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <GestionIngenieros logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Usuarios logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Productos logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solicitudes"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Solicitudes logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edificios"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Edificios logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proveedores"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Proveedores logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entradas"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Entradas logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salidas"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Salidas logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventario"
          element={
            <ProtectedRoute roles={["Inventarios", "Superusuario"]} nivel={auth.nivel}>
              <Inventario logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
