import React from "react";
import Menu from "../Menu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

class InternalPersonaGest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: '',
      nombre: '',
      apellido: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.params.dni) {
      let request = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json'
        }
      };

      fetch(`http://localhost:8080/api/persona/${this.props.params.dni}`, request)
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
              dni: result.body.dni,
              nombre: result.body.nombre,
              apellido: result.body.apellido,
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
        dni: '',
        nombre: '',
        apellido: ''
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      dni: this.state.dni,
      nombre: this.state.nombre,
      apellido: this.state.apellido
    };

    let request = {
      method: this.props.params.dni ? 'PUT' : 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      }
    };

    const url = this.props.params.dni?`http://localhost:8080/api/persona/${this.props.params.dni}`:"http://localhost:8080/api/persona";

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
          this.props.navigate("/persona/list");
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
    return (
      <div className="row">
        <div className="col">
          <h1>{this.props.params.dni ? "Modificando " + this.state.apellido : "Creando persona"}</h1>
          <form onSubmit={this.handleSubmit} method="POST">
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">DNI</label>
              <input type="text" className="form-control" id="dni" name="dni" value={this.state.dni} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.nombre} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido:</label>
              <input type="text" className="form-control" id="apellido" name="apellido" value={this.state.apellido} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" >
              <span class="material-symbols-outlined center-align" >
                save
              </span>
              <span>
                Guardar
              </span>
            </button> 
          </form>
        </div>
      </div>
    );
  }
}


export function PersonaGest(props) {
  const navigate = useNavigate();
  const params = useParams();

  return <InternalPersonaGest navigate={navigate} params={params} />
}

export default PersonaGest;