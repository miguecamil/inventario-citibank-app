import { useState } from "react";
import "../assets/css/estilos.css";
import Logo from "../assets/img/Logo.png";

import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("login/", {
        username: username,
        password: password,
      });

      console.log(response.data); //VERIFICAR RESPUESTA

      if (response.data.status === "success") {
        login(response.data);
        console.log("TOKEN GUARDADO:", response.data.token);

        navigate("/menu");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Por favor verifique que las credenciales se encuentren correctas");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="text-start mb-4">
          <img src={Logo} alt="Citi" height="32" />
        </div>

        <h1 className="h5 mb-4">
          Bienvenido al Sistema de Gestión de Inventarios
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">SOEID</label>

            <input
              type="text"
              className="form-control"
              placeholder="User@citi.com"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Contraseña</label>

            <input
              type="password"
              className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 text-end">
            <button type="button" className="forgot-link btn btn-link p-0">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button type="submit" className="login-btn btn-brand w-100 py-2">
            Iniciar Sesión
          </button>
        </form>

        <footer className="mt-4">© Citibank 2026 - Derechos Reservados</footer>
      </div>
    </div>
  );
}

export default Login;
