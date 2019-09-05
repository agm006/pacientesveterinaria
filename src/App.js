import React, {Component} from 'react';
import './bootstrap.min.css'
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

// utilizamos un class component con state
class App extends Component {
    state = {
        citas : []
    }

    // cuando la aplicacion cargue
    componentDidMount()  {
      const citasLS = localStorage.getItem('citas');
      if (citasLS){
        this.setState({
          citas : JSON.parse(citasLS)
        })
      }
    }

    // cuando eliminemos o agregamos una nueva cita
    componentDidUpdate()  {
      localStorage.setItem('citas', JSON.stringify(this.state.citas));
    }

    

    crearNuevaCita = datos => {
      //copiar el state actual
      const citas = [...this.state.citas, datos];

      // agregar nuevo state
      this.setState({
        citas
      })
    }

    // elimina las citas del state
    eliminarCita = id => {
      // tomar copia del state
      const citasActuales = [...this.state.citas];

      // utilizar filter para sacar el element odel arreglo
      // saco el que sea diferente al que yo le di click
      const citas = citasActuales.filter(cita => cita.id !== id);
      
      //actualizar el state
      this.setState({
          citas
      })
    
      
    }

    render() {
      return (
      <div className="container">
          <Header
            titulo = 'Administrador Pacientes Veterinaria'
          />
          <div className="row">
              <div className="col-md-10 mx-auto">
                  <NuevaCita
                  crearNuevaCita = {this.crearNuevaCita}
                  />
              </div>

              <div className="mt-5 col-md-10 mx-auto">
                  <ListaCitas 
                   citas ={this.state.citas}
                   eliminarCita={this.eliminarCita}
                  />
              </div>
          </div>
      </div>
      )
    };
  }
    




export default App;
