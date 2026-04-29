import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../assets/css/estilos.css"
import logo from "../assets/img/Logo.png"

function Menu(){

const navigate = useNavigate()
/*const { auth, logout } = useAuth()*/
const { auth } = useAuth()

return(



<div className="role-wrapper">

<div className="role-card">

<div className="text-start mb-4">
<a href="/">
<img src={logo} alt="Citi" height="32"/>
</a>
</div>

<h2 className="h6 mb-2">Acceso Autorizado</h2>

<p className="mb-4">
Seleccione su rol para ingresar al módulo.
</p>

{/* BOTON INVENTARIOS */}

{ (auth.nivel === "Inventarios" || auth.nivel === "Superusuario") && (

<div className="mb-4 text-center">

<svg xmlns="http://www.w3.org/2000/svg" height="50" fill="currentColor"
className="bi bi-clipboard-check" viewBox="0 0 16 18">

<path fillRule="evenodd"
d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>

<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>

</svg>

<button
className="login-btn btn-brand w-100 py-2"
onClick={()=>navigate("/inventarios")}
>
Equipo Inventarios
</button>

</div>

)}

{/* BOTON INGENIERIA */}

{ (auth.nivel === "Ingeniero" || auth.nivel === "Superusuario") && (

<div className="mb-2 text-center">

<svg xmlns="http://www.w3.org/2000/svg" height="50" fill="currentColor"
className="bi bi-person-square" viewBox="0 0 16 18">

<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>

<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>

</svg>

<button
className="login-btn btn-brand w-100 py-2"
onClick={()=>navigate("/campo")}
>
Ingeniería de Campo
</button>

</div>

)}

<footer className="mt-4">
© Citibank 2025 - Derechos Reservados
</footer>

</div>

</div>

)

}

export default Menu