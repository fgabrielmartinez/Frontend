import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Cursos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursoToDelete:{},
      modalConfirmarEliminacion:false,
      curso: []
    };
    this.onDelete = this.onDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose(){
    this.setState({
      modalConfirmarEliminacion: false
    });
  }
  handleOpen(curso){
    this.setState({
      cursoToDelete: curso,
      modalConfirmarEliminacion: true
    });
  }

  onDelete() {
    let request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization": sessionStorage.getItem('token')
      }
    };

    fetch(`http://localhost:8080/api/curso/${this.state.cursoToDelete.id}`, request)
      .then(res => {
        return res.json().then(body => {
          return {
            status: res.status,
            ok: res.ok,// = true => status >=200 && status < 300
            headers: res.headers,
            body: body
          };
        });
      })
      .then(result => {
        if (result.ok) {
          toast.success(result.body.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          this.componentDidMount();
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
      });
  }

  componentDidMount() {
    let request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization":sessionStorage.getItem('token')
      }
    }; 
    fetch("http://localhost:8080/api/curso",request)
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
            curso: result.body // updated line
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
          curso: [],
          modalConfirmarEliminacion: false
        });
      }
    )
  }
  render() {
    
   
    let rowsTable = this.state.curso.map((curso, index) => {
      return (
        
        <tr key={index}>
          <td>{curso.id}</td>
          <td>{curso.nombre}</td>
          <td>{curso.descripcion}</td>
          <td>{curso.anio}</td>
          <td>
            <Link to={`/curso/gest/${curso.id}`}>
            <abbr title="Editar Curso">
              <button className="btn btn-primary">
                <span className="material-symbols-outlined">
                  edit
                </span>
              </button>
              </abbr>
            </Link>
            <abbr title="Eliminar Curso">
            <button type="submit" className="btn btn-danger" onClick={() => this.handleOpen(curso)}>
              <span className="material-symbols-outlined center-align">
                delete_forever
              </span>
              <span>
              </span>
            </button>
            </abbr>
            <Link to={`/curso/byid/${curso.id}/${curso.nombre}`}>
            <abbr title="Ver Inscriptos">
              <button className="btn btn-primary">
                <span className="material-symbols-outlined">
                  search
                </span>
              </button>
              </abbr>
            </Link>
            <Link to={`/curso/insc/${curso.id}/${curso.nombre}`}>
            <abbr title="Gestionar Inscriptos">
              <button className="btn btn-primary">
                <span className="material-symbols-outlined">
                  settings
                </span>
              </button>
              </abbr>
            </Link>
          </td>
        </tr>
        
      )
    });

    
    return (
      <>
        <h1>Lista de Cursos</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>A??o</th>
              <th>Acciones</th>
              <th><Link to={`/curso/gest`}>
              <abbr title="Agregar Curso">
                <button className="btn btn-primary">
                  <span className="material-symbols-outlined">
                  add_circle
                  </span>
                </button>
                </abbr>
              </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {rowsTable}
          </tbody>
        </table>
        <Modal
          show={this.state.modalConfirmarEliminacion}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="dark-content">
            <Modal.Title>Confirmar eliminacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Esta seguro que desea eliminar el curso: <strong> {this.state.cursoToDelete.nombre}</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.onDelete}>Eliminar</Button>
          </Modal.Footer>
        </Modal>
      </>

    );
  }
}


export default Cursos;