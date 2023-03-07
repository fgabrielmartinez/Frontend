import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class CursoInsc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnoToDelete: {},
      modalConfirmarEliminacion: false,
      alumno: [],
      persona: []
    };
    this.onDelete = this.onDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      modalConfirmarEliminacion: false
    });
  }
  handleOpen(alumno) {
    this.setState({
      alumnoToDelete: alumno,
      modalConfirmarEliminacion: true
    });
  }

  onDelete(alumno) {
    let alumnos_curso = [...this.state.alumnos_curso];
    alumnos_curso.splice(alumnos_curso.indexOf(alumno.id), 1);
    this.setState({
      alumnos_curso: alumnos_curso
    });
  }
  onAdd(alumno) {
    let alumnos_curso = [...this.state.alumnos_curso];
    alumnos_curso.push(alumno.id);
    this.setState({
      alumnos_curso: alumnos_curso
    })
  };

  componentDidMount() {
    //  let alumnos_curso = [4,5,6];

    //  this.setState({ alumnos_curso: alumnos_curso })
    let request2 = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization": sessionStorage.getItem('token')
      }
    };
    let id_curso=2
    fetch(`http://localhost:8080/api/curso/insc/`+id_curso, request2)
    .then(res => {
      return res.json().then(body => {
        return {
          status: res.status,
          ok: res.ok,
          headers: res.headers,
          body: body
        };
      });
    })
    .then(result => {
      if (result.ok) {
        let alumnos_curso=[];
       
         for(var i=0; i<result.body.length; i++){
           alumnos_curso.push(result.body[i].id_alumno)
         }
        this.setState({ alumnos_curso:alumnos_curso});
      } else {
        toast.error(result.body.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
      (error) => {
        console.log(error);
        this.setState({
          error,
          alumno: [],
          modalConfirmarEliminacion: false
        });
      }
    )



    let request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization": sessionStorage.getItem('token')
      }
    };
    fetch("http://localhost:8080/api/alumno", request)
      .then(res => {
        return res.json().then(body => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body
          };
        });
      })
      .then(result => {
        if (result.ok) {
          this.setState({
            modalConfirmarEliminacion: false,
            alumno: result.body // updated line
          });
        } else {
          toast.error(result.body.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      },
        (error) => {
          console.log(error);
          this.setState({
            error,
            alumno: [],
            modalConfirmarEliminacion: false
          });
        }
      )
  }
  render() {

    let rowsTable = this.state.alumno.map((alumno, index) => {
      let inscripto = this.state.alumnos_curso.indexOf(alumno.id) != -1;

      return (

        <tr key={index} className={inscripto ? "table-success" : ""}>
          <td>{alumno.id}</td>
          <td>{alumno.nombre}</td>
          <td>{alumno.apellido}</td>
          <td>{alumno.dni}</td>
          <td>
            <abbr title="Agregar Alumno">
              {!inscripto &&
                <button className="btn btn-primary" onClick={() => this.onAdd(alumno)}>
                  <span className="material-symbols-outlined">
                    add
                  </span>
                </button>
              }
            </abbr>

            <abbr title="Eliminar Alumno">
              {inscripto &&
                <button className="btn btn-danger" onClick={() => this.onDelete(alumno)}>
                  <span className="material-symbols-outlined">
                    Delete
                  </span>
                </button>
              }
            </abbr>
          </td>
        </tr>

      )
    });

    return (
      <>
        <h1>{"Gestión de inscriptos "}</h1>
        <table className="table table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Acciones</th>

            </tr>
          </thead>
          <tbody>
            {rowsTable}
          </tbody>
        </table>
        <div className="row">
          <div className="col">
            <abbr title="Guardar Inscripción">
              <button className="btn btn-primary" onClick={() => this.onDelete()}>
               <span>Guardar</span>
              </button>
            </abbr>
          </div>
        </div>
      </>

    );
  }
}


export default CursoInsc;