import { Link } from "react-router-dom";
import Menu from "./Menu";

function Home() {
    return <>
        <div>
            <h1>Bienvenido a la  Plataforma de Gestión de Cursos de Silicon Misiones</h1>
            <h2>Creando talento IT en el nordeste Argentino</h2>
        </div>

        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">

                    <img src="https://siliconmisiones.gob.ar/wp-content/uploads/2022/07/working-on-code-1024x683.jpg" class="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="2000">

                    <img src="https://siliconmisiones.gob.ar/wp-content/uploads/2022/05/render-home-1.jpg" class="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>


    </>;
}

export default Home;