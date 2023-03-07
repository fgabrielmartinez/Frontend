import React from "react";
import Menu from "../Menu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class InternalCursoInsc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      alumnoToDelete: {},
      modalConfirmarEliminacion: false,
      alumno: [],
      alumno2: [],
      data: []
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);

  }




  onDelete(a) {
let alumno=[...this.state.alumno];
alumno.splice(alumno.indexOf(a.id),1);
this.setState({
  alumno:alumno
});


    // let data = {

    //   "id": [...this.state.alumno.map(al => al.id)]
    // };



  //   const request = {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   };

  //   fetch(`http://localhost:8080/api/curso/${this.props.params.id}`, request)
  //     .then(res => {
  //       return res.json().then(body => {
  //         return {
  //           status: res.status,
  //           ok: res.ok,
  //           headers: res.headers,
  //           body: body
  //         };
  //       });
  //     })
  //     .then(result => {
  //       if (result.ok) {
  //         toast.success(result.body.message, {
  //           position: "bottom-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         this.componentDidMount();
  //       } else {
  //         toast.error(result.body.message, {
  //           position: "bottom-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //     });
  }

  onAdd(a) {
    let alumno=[...this.state.alumno];
    alumno.push(a.id);
    this.setState({
      alumno:alumno
    })};


  componentDidMount() {

    let request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization": sessionStorage.getItem('token')

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

    let request2 = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',

      }
    };

    fetch(`http://localhost:8080/api/alumno`, request2)
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

            alumno2: result.body

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



  }



  render() {
    const { alumno, alumno2 } = this.state;
    const tableRows2 = alumno2.map((a) => {
      const exists = alumno.find((a2) => a2.dni === a.dni);
      const isDifferent = !exists;

      const rowStyle = {
        backgroundColor: isDifferent ? 'white' : 'lightblue',

      };

      return (
        <tr style={rowStyle} key={a.id}>
          <td>{a.id}</td>
          <td>{a.nombre}</td>
          <td>{a.apellido}</td>
          <td>{a.dni}</td>
          <td>

            {isDifferent &&
              <button className="btn btn-primary" onClick={() => this.onAdd(a)}>
                <span className="material-symbols-outlined">
                  add
                </span>
              </button>
            }
            {!isDifferent &&
              <button className="btn btn-danger" onClick={() => this.onDelete(a)}>
               <span className="material-symbols-outlined">
                  Delete
                </span>
              </button>
            }
          </td>
        </tr>
      );
    });

    return (
      <div>

        <div className="container">
          <h1>{"Gestión de inscriptos en " + this.props.params.nombre}</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{tableRows2}</tbody>
          </table>

        </div>
      </div>
    );
  }



};



export function CursoInsc(props) {
  const navigate = useNavigate();
  const params = useParams();

  return <InternalCursoInsc navigate={navigate} params={params} />
}

export default CursoInsc;