import { Link, useHistory } from "react-router-dom";
import React, {Component} from 'react'
import { Container } from './styles';

class App extends Component {
    
    /*const history = useHistory()
    const fazLogout = () => {
        localStorage.setItem(`chave_no_localStorage`, '')
        history.push('')
    }*/

    render () {
        return (
        <Container>   
            <>
     
                <button><Link style={{ textDecoration: "none" }} to="/usuarios">
                <p className="whiteText">Usuarios</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/comentarios">
                <p className="whiteText">Comentários</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/grupos">
                <p className="whiteText">Grupos</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/prioridades">
                <p className="whiteText">Prioridades</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/tarefas">
                <p className="whiteText">Tarefas</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/status_tarefa">
                <p className="whiteText">Status das tarefas</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/tipo_tarefa">
                <p className="whiteText">Tipos de tarefas</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/projetos">
                <p className="whiteText">Projetos</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/projetos_usuario">
                <p className="whiteText">Projetos do usuário</p>
                </Link></button>
                <button><Link style={{ textDecoration: "none" }} to="/sistemas">
                <p className="whiteText">Sistemas</p>
                </Link></button>
            </>
            </Container>     
        )
    }

}
export default App;