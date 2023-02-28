import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faArrowRightFromBracket, faCar, faCarBurst, faCartShopping, faCoffee } from '@fortawesome/free-solid-svg-icons'

function Menu() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    const intervalId = setInterval(()=>{
        let t = sessionStorage.getItem('token');
        if(t!==token){
            setToken(t);
        }
    },1000);

    useEffect(() => { 
        return ()=>{
            clearInterval(intervalId);
        };
    });

    function salir() {
        console.log("salir");
        sessionStorage.removeItem("token");
        setToken("");
        //navigate("/"); 
    }

    if (token!=="" && token !== null) {
        var decoded = jwt_decode(token); 
        return <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src="/logo.png" className="nav-img-main" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Cursos" className="nav-link">Cursos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/persona/list" className="nav-link">Listar Personas</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/persona/grid" className="nav-link">Grilla Personas</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/persona/gest" className="nav-link">Gestion Personas</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => salir()}>
                                    {decoded.nickname}&nbsp; 
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    } else {
        return <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src="/logo.png" className="nav-img-main" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Cursos" className="nav-link">Cursos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Alumno" className="nav-link">Alumnos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Ingresar                  
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    }

}

export default Menu;