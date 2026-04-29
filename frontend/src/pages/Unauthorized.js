function Unauthorized() {
  return (
    <div className="text-center mt-5">
      <h1>Acceso Denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <a href="/menu">Volver al menú</a>
    </div>
  );
}

export default Unauthorized;