import { Link } from "react-router-dom";
import Logo from "../assets/img/Logo.png";

function Header({ title, back }) {

return(

<div className="form-header d-flex justify-content-between align-items-center mb-3">

<Link to={back} className="text-danger fs-3">
<i className="bi bi-arrow-left-circle-fill"></i>
</Link>

<h6 className="m-0 fw-bold text-dark">
{title}
</h6>

<img src={Logo} alt="Citi" height="30"/>

</div>

);

}

export default Header;