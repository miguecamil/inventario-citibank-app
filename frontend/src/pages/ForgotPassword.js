import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/estilos.css";
import Logo from "../assets/img/Logo.png";
import api from "../api/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post("password-reset/request/", {
        email: email.trim().toLowerCase(),
      });

      setMessage(
        response.data.message ||
          "Si el correo es válido, recibirás instrucciones para cambiar tu contraseña."
      );
      setEmail("");
    } catch (requestError) {
      const backendMessage =
        requestError.response?.data?.email?.[0] ||
        requestError.response?.data?.message ||
        "No fue posible procesar la solicitud. Verifica tu correo corporativo e inténtalo de nuevo.";

      setError(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="text-start mb-4">
          <img src={Logo} alt="Citi" height="32" />
        </div>

        <h1 className="h5 mb-2">Recuperar contraseña</h1>
        <p className="helper-text mb-4">
          Ingresa tu correo corporativo para enviarte las instrucciones de cambio.
        </p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo corporativo</label>
            <input
              type="email"
              className="form-control"
              placeholder="usuario@citibank.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-btn btn-brand w-100 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
          </button>
        </form>

        <div className="mt-3 text-end">
          <Link to="/" className="forgot-link">
            Volver al inicio de sesión
          </Link>
        </div>

        <footer className="mt-4">© Citibank 2026 - Derechos Reservados</footer>
      </div>
    </div>
  );
}

export default ForgotPassword;
