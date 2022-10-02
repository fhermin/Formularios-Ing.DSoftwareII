import React from 'react';
import { Link } from "react-router-dom";

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            nombre: "",
            correo: "",
            errores:[]
         }
    }
        CambioValor= (e) =>{
            const state=this.state;
            state[e.target.name]=e.target.value;
            this.setState({ state,errores:[]});
        }
        verificarError(elemento){
            return this.state.errores.indexOf(elemento) !==-1;
        }

        enviarDatos = (e) =>{
            e.preventDefault();
            console.log("Formulario enviado...");
            const{nombre,correo}=this.state;
            console.log(nombre);
            console.log(correo);

            var errores=[];
            if(!nombre)errores.push("error_nombre");
            if(!correo)errores.push("error_correo");

            this.setState({errores:errores});
            if(errores.length>1)return false;
            var datosEnviar={nombre:nombre,correo:correo}

            fetch("http://localhost/empleados/?insertar=1",{
                    method: "POST",
                    body: JSON.stringify(datosEnviar)
            })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
        console.log(datosRespuesta)
        this.props.history.push("/sistema");
    })
    .catch(console.log)
        }

    render() {  
        const{nombre,correo}=this.state;
        return ( <div className="card">
            <div className="card-header">
                Formulario
            </div>
            <div className="card-body">
                <form method='Post' onSubmit={this.enviarDatos} >
                    <div className="form-group">
                      <label htmlFor="">Nombre :</label>
                      <input type="text" name="nombre" id="nombre" onChange={this.CambioValor} value={nombre} className={((this.verificarError("error_nombre"))?"is-invalid":"")+ " form-control"} placeholder="" aria-describedby="helpId"/>
                      <small id="helpId" className="invalid-feedback">Escribe el nombre</small>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="">Correo</label>
                      <input type="email" className={ ((this.verificarError("error_correo"))?"is-invalid":"" )+" form-control" } name="correo" value={correo} onChange={this.CambioValor} id="correo" aria-describedby="emailHelpId" placeholder=""/>
                      <small id="emailHelpId" className="invalid-feedback">Ingrese un correo</small>
                    </div>

                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Finalizar</button>
                        <Link to={"/sistema"} type="button" className="btn btn-danger">Cancelar</Link>

                    </div>
                    
                </form>
            </div>
            <div className="card-footer text-muted">
            </div>
        </div> );
    }
}
 
export default Crear;