import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Cursos2 extends React.Component {
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
        "Accept": 'application/json'
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
       
          <td>{curso.nombre}</td>
          <td>{curso.descripcion}</td>
          <td>{curso.anio}</td>
         
        </tr>
        
      )
    });

    
    return (
      <>
        <h1>Lista de Cursos</h1>
        <table className="table table-striped">
          <thead>
            <tr>
          
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            {rowsTable}
          </tbody>
        </table>
     
      </>

    );
  }
}


export default Cursos2;