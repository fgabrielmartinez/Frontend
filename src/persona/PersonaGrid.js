import React from "react";
import { Link } from "react-router-dom";
import Menu from "../Menu";

class PersonaGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personas: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/persona")
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          personas: result
        });
      },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log(error);
          this.setState({
            error,
            personas: []
          });
        }
      )
  }
  render() {
    return (
      <>
        <h1>Lista de personas</h1>
        {
              this.state.personas.map((persona, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col">
                    <strong>DNI: </strong><span>{persona.dni}</span><br/>
                    <strong>Nombre: </strong><span>{persona.nombre}</span><br/>
                    <strong>apellido: </strong><span>{persona.apellido}</span>
                    <hr/>
                    </div> 
                  </div>
                )
              })
            }
      </>

    );
  }
}

export default PersonaGrid;