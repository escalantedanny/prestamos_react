import React, {Component, Fragment} from 'react';
import './normalize.css';
import './skeleton.css';
import Formulario from './componentes/Formulario';
import { calcularTotal } from './helpers/HelpersFuntions';
import Resultado from "./componentes/Resultado";
import Mensaje from "./componentes/Mensaje";
import Spinner from "./componentes/Spinner";


class App extends Component{
    state = {
        total: '',
        cantidad:'',
        plazo:'',
        cargando: false
    }
    // asignamos el props para enviar del datos padre al dato hijo
    datosPrestamo = (cantidad, plazo) => {
        const total = calcularTotal(cantidad,plazo);

        //colocar el resultado en el state junto a la cantidad y el plazo
        this.setState({
            cargando: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    total,
                    cantidad,
                    plazo,
                    cargando: false
                })
            }, 3000);
        })
    }

    render() {
        const {total, cantidad, plazo, cargando} = this.state;

        // cargar componente condicionalmente
        let componente;
        if (total === '' && !cargando) {
            componente = <Mensaje/>
        } else if(cargando){
            componente = <Spinner/>
        }else{
            componente = <Resultado
                            total={total}
                            cantidad={cantidad}
                            plazo={plazo}
                        />
                    }
        return (
            <Fragment>
                <h1><strong>Cotizador de Prestamos</strong></h1>
                <div className="container">
                    <Formulario
                    /* un props consiste en 2 partes
                    * 1: identificador
                    * 2: nombre o datos los cuales enviaran en la funcion
                    */
                        datosPrestamo={this.datosPrestamo}
                    />
                    <div className="mensajes">
                        {componente}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default App;