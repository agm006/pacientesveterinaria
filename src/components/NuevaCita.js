import React,{ Component} from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const stateInicial = {
    cita : {
        mascota : "",
        propietario: "",
        fecha: "",
        hora: "",
        sintomas: ""
    },
    error: false
}

class NuevaCita extends Component {
    state = { ...stateInicial}
    

    // Cuando el usuario escribe en lo sinputs
    handleChange = e => {
        console.log(e.target.name + ':' + e.target.value);
        // colocar lo que el usuario escribe en el state
        this.setState({
                cita : {
                    ...this.state.cita,
                    [e.target.name] : e.target.value
                }
        })
    }

    //Cuando el usuario envia el formulario
    handleSubmit = e => {
        e.preventDefault();

        // extraer valores del state
        const {mascota, propietario, fecha, hora, sintomas} = this.state.cita;

        // validar que todos los campos esten llenos
        
        if(sintomas ==='' || mascota ==='' || propietario ==='' || fecha ==='' || hora ==='')
        {
            this.setState({
                error:true
            })

            // detener la ejecucion
            return;
        }
        
      
    
        // generar un objeto con los datos
        const nuevaCita={...this.state.cita};
        nuevaCita.id = uuid();
        
        // agregar la cita al state de la app
        this.props.crearNuevaCita(nuevaCita);

        // Colocar en el state el stateInicial
        this.setState({
            ...stateInicial
        })

    }
    render() {

        // extraer el valor del state
        const {error} = this.state;

        return (
            <div className="card mt-5 py-5">
                <div className="card-body">
                    <h2 className="card-tittle text-center mb-5">
                        crear una nueva cita
                    </h2>

                    {error ? <div className="alert alert-danger mt-2 mb-5 text-center">
                         Todos los campos son obligatorios</div> : null}

                    <form
                    onSubmit={this.handleSubmit}
                    >
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Nombre Mascota
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nueva mascota"
                                    name="mascota"
                                    onChange={this.handleChange}
                                    value={this.state.cita.mascota}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Nombre Dueño
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nueva del dueño "
                                    name="propietario"
                                    onChange={this.handleChange}
                                    value={this.state.cita.propietario}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Fecha
                            </label>
                            <div className="col-sm-8 col-lg-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fecha"
                                    onChange={this.handleChange}
                                    value={this.state.cita.fecha}
                                />
                            </div>
                     
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Hora
                            </label>
                            <div className="col-sm-8 col-lg-4">
                                <input
                                    type="time"
                                    className="form-control"
                                    name="hora"
                                    onChange={this.handleChange}
                                    value={this.state.cita.hora}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Sintomas
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <textarea
                                    placeholder="Escribe los sintomas "
                                    className="form-control"
                                    name="sintomas"
                                    onChange={this.handleChange}
                                    value={this.state.cita.sintomas}
                                ></textarea>
                            </div>
                        </div>

                        <input type="submit" className="py-3 mt-2 btn btn-success
                        btn-block" value="Agregar nueva cita" />

                    </form>
                </div>
            </div>
        );
    }
}

NuevaCita.propTypes = {
    crearNuevaCita : PropTypes.func.isRequired 
}
export default NuevaCita;
