import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class alumnos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnoToDelete:{},
      modalConfirmarEliminacion:false,
      alumno: []
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
  handleOpen(alumno){
    this.setState({
      alumnoToDelete: alumno,
      modalConfirmarEliminacion: true
    });
  }

  onDelete() {
    let request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      }
    };

    fetch(`http://localhost:8080/api/alumno/${this.state.alumnoToDelete.id}`, request)
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
    fetch("http://localhost:8080/api/alumno",request)
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
      return (
        
        <tr key={index}>
          {/* <td>{alumno.id}</td> */}
          <td>{alumno.nombre}</td>
          <td>{alumno.apellido}</td>
          <td>
            <Link to={`/alumno/gest/${alumno.id}`}>
              <button className="btn btn-primary">
                <span className="material-symbols-outlined">
                  edit
                </span>
              </button>
            </Link>
            <button type="submit" className="btn btn-danger" onClick={() => this.handleOpen(alumno)}>
              <span className="material-symbols-outlined center-align">
                delete_forever
              </span>
              <span>
              </span>
            </button>
          </td>
        </tr>
        
      )
    });

    return (
      <>
        <h1>Lista de alumnos</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
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
            Esta seguro que desea eliminar el alumno: <strong> {this.state.alumnoToDelete.nombre}</strong>
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


export default alumnos;