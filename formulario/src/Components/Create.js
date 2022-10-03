import React from 'react';
import { Link } from "react-router-dom";

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            nombre: "",
            correo: "",
            carrera: "",
            genero: "",
            fecha:"",
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
            const{nombre,correo,carrera,genero,fecha}=this.state;
            console.log(nombre);
            console.log(correo);
            console.log(carrera);
            console.log(genero);
            console.log(fecha);

            var errores=[];
            if(!nombre)errores.push("error_nombre");
            if(!correo)errores.push("error_correo");
            if(!carrera)errores.push("error_carrera");
            if(!genero)errores.push("error_genero");
            if(!fecha)errores.push("error_fecha");

            this.setState({errores:errores});
            if(errores.length>1)return false;
            var datosEnviar={nombre:nombre,correo:correo,carrera:carrera,genero:genero,fecha:fecha}

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
        const{nombre,correo,carrera,genero,fecha}=this.state;
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
                   
                    <div class="form-group">
                      <label for="">Carrera</label>
                      <select class="form-control" name="carrera" id="carrera" value={carrera} onChange={this.CambioValor} className={ ((this.verificarError("error_carrera"))?"is-invalid":"" )+" form-control" }>
                        <option >Selecciona una</option>
                        <option >Pepe</option>
                        <option>Mario</option>
                        <option>Marioneta</option>
                      </select>
                      <small className="invalid-feedback">Ingrese un opcion</small>
                    </div>

                    <div class="form-group">
                      <label for="">Genero</label>
                      <select class="form-control" name="genero" id="genero" value={genero} onChange={this.CambioValor} className={ ((this.verificarError("error_genero"))?"is-invalid":"" )+" form-control" }>
                        <option >Selecciona una</option>
                        <option >Hombre</option>
                        <option>Mujer</option>
                      </select>
                      <small className="invalid-feedback">Ingrese un opcion</small>
                    </div>

                    <div>
                    <label for="birthday">Fecha de nacimiento:</label>
                        <input type="date" id="fecha" name="fecha" min="1950-01-01" max="2022-12-31" value={fecha} onChange={this.CambioValor} className={ ((this.verificarError("error_genero"))?"is-invalid":"" )+" form-control" } ></input>
                        <small className="invalid-feedback">Ingrese un opcion</small>
                        </div>

                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Finalizar</button>
                        <Link to={"/sistema"} type="button" className="btn btn-danger">Cancelar</Link>
                    </div>
                    
                
                    
                </form>
            </div>
        </div> );
    }
}
 
export default Crear;