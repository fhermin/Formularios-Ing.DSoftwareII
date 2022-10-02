import React from 'react';
import { Link } from 'react-router-dom';

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            datosCargados:false,
            usuarios:[]
        }
    }
borrarRegistros = (id) => {
    console.log(id);
    fetch("http://localhost/empleados/?borrar="+id)
    .then(respuesta=>respuesta.json())
    .then((datosRespuesta)=>{
        console.log(datosRespuesta)
        this.cargarDatos();
    })
    .catch(console.log)
}

cargarDatos() {

    fetch("http://localhost/empleados/")
    .then(respuesta=>respuesta.json())
    .then((datosRespuesta)=>{

        console.log(datosRespuesta)
        this.setState({ datosCargados:true,usuarios:datosRespuesta})
    })
    .catch(console.log)
}

componentDidMount(){
    this.cargarDatos();
}
    render() { 
        const{datosCargados, usuarios}=this.state
        if(!datosCargados){
            return(<div>Cargado...</div>);
        }else{
            
        
        return (
            <div className="card">
                <div className="card-header">
                    <Link className='btn btn-success' to={"/"}>Hacer nuevo formulario</Link>
                </div>
                <div className="card-body">
                    <h4>Lista de usuarios :</h4>
                <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(
                    (usuarios)=>(  
                    <tr key={usuarios.id}>
                        <td>{usuarios.id}</td>
                        <td>{usuarios.nombre}</td>
                        <td>{usuarios.correo}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="">  
                                <button type='button' class="btn btn-danger"
                                onClick={()=>this.borrarRegistros(usuarios.id)}
                                >Borrar</button>
                            </div>
                        </td>
                    </tr>
                    )
                )}
            </tbody>
            
        </table>
                </div>
                <div class="card-footer text-muted">
                </div>
            </div>
        );
        }
    }
}
 
export default Lists;