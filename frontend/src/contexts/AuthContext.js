import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    nivel: null,
    usuario: null,
    nombre: null,
  });

  // Carga inicial desde localStorage - REMOVIDO para evitar auto-login
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const nivel = localStorage.getItem('nivel');
  //   const usuario = localStorage.getItem('usuario');
  //   const nombre = localStorage.getItem('nombre');

  //   if (token) {
  //     setAuth({ token, nivel, usuario, nombre });
  //   }
  // }, []);

  // Función para login
  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('nivel', data.nivel);
    localStorage.setItem('usuario', data.usuario);
    localStorage.setItem('nombre', data.nombre);
    setAuth({
      token: data.token,
      nivel: data.nivel,
      usuario: data.usuario,
      nombre: data.nombre,
    });
  };

  // Función para logout
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setAuth({ token: null, nivel: null, usuario: null, nombre: null });
  };

  // Verifica si el usuario tiene un rol permitido
  const hasRole = (roles) => {
    return auth.nivel && roles.includes(auth.nivel);
  };

  const value = {
    auth,
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};