import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './contexts/AuthContext';


//Importación de paginas

import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Inventarios from "./pages/Inventarios";
import Campo from "./pages/Campo";
import GestionIngenieros from './pages/GestionIngenieros';
import Usuarios from "./pages/Usuarios";
import Productos from "./pages/Productos";
import Solicitudes from "./pages/Solicitudes";
import Edificios from "./pages/Edificios";
import Proveedores from "./pages/Proveedores";
import Entradas from "./pages/Entradas";
import Salidas from "./pages/Salidas";
import Inventario from "./pages/Inventario";
import Unauthorized from './pages/Unauthorized';


//Seguridad de acceso a rutas

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  const { auth, logout } = useAuth();

  

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA */}
        <Route 
          path="/" 
          element={!auth.token ? <Login /> : <Navigate to="/menu" />} 
        />

        <Route path="/unauthorized" element={<Unauthorized />} />


        {/* RUTAS PROTEGIDAS */} 
        
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

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
