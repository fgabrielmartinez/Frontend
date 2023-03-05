import { BrowserRouter, Routes, Route, Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cursos from './cursos/Cursos';
import Cursos2 from './cursos/Cursos2';
import Alumno from './alumnos/Alumno';
import Home from './Home';
import Login from './Login';
import Menu from './Menu';
import AlumnoGest from './alumnos/AlumnoGest';
import CursoGest from './cursos/CursoGest';
import CursoByid from './cursos/CursoByid';
import CursoInsc from './cursos/CursoInsc';


function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cursos" element={<Cursos />} />
          <Route path="/Cursos2" element={<Cursos2 />} />
          <Route path="/alumno" element={<Alumno />} />
          <Route path="/alumno/gest/:id" element={<AlumnoGest />} />
          <Route path="/alumno/gest" element={<AlumnoGest />} />
          <Route path="/curso/gest/:id" element={<CursoGest />} />
          <Route path="/curso/gest" element={<CursoGest />} />
          <Route path="/curso/byid/:id/:nombre" element={<CursoByid />} />
          <Route path="/curso/insc/:id/:nombre" element={<CursoInsc />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}
  
export default App;
