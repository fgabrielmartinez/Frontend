import React from "react";
import Menu from "../Menu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";

class InternalCursoByid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      alumnoToDelete: {},
      modalConfirmarEliminacion: false,
      alumno: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    if (this.props.params.id) {
      let request = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json',

        }
      };

      fetch(`http://localhost:8080/api/curso/byid/${this.props.params.id}`, request)
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

              alumno: result.body

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
        })
    } else {
      this.setState({
        id: '',
        nombre: '',
        apellido: '',
        dni: ''
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      id: this.state.id,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      dni: this.state.dni,
    };

    let request = {
      method: this.props.params.id ? 'PUT' : 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      }
    };

    const url = this.props.params.id ? `http://localhost:8080/api/curso/${this.props.params.id}` : "http://localhost:8080/api/curso";

    fetch(url, request)
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
          this.props.navigate("/cursos");
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
        }
      );
  }

  render() {
    debugger
    let rowsTable = this.state.alumno.map((alumno, index) => {

      return (

        <tr key={index}>
          <td>{alumno.nombre}</td>
          <td>{alumno.apellido}</td>
          <td>{alumno.dni}</td>
        </tr>

      )
    });

    return (
      <>
        <h1>{"Inscriptos en curso " + this.props.params.nombre}

        </h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
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
export function CursoByid(props) {
  const navigate = useNavigate();
  const params = useParams();

  return <InternalCursoByid navigate={navigate} params={params} />
}

export default CursoByid;