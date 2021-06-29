import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";


class Projeto extends Component {

    state = {
        listaProjeto: [],
        id: "",
        descricao: "",
        id_criador: "",
        data_inicio: "", 
        data_fim: "",
        id_sistema: "",
		error: "",
		editando: false
	};

	
    async componentDidMount() {
        const res = await api.get('/projeto');
        // console.log(res.data);
        this.setState({listaProjeto: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const body = {
			descricao: this.state.descricao,
            id_sistema: this.state.id_sistema || "NULL",
			data_fim: this.state.data_fim,
			id_criador: this.state.id_criador || "NULL"
		} 
		if (!body.descricao){
			this.setState({
				error: "Falta colocar uma descrição"
			});
		} else {
			try {
				await api.post("/projeto", body);
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};


	
	
	render(){

        const {listaProjeto} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Projetos</h1>
                        <Container>
                        <ul>
                            {listaProjeto.map(projeto => (
                                <li>
                                    <h2>Título: {projeto.titulo}</h2>
                                    <h2>ID do sistema: {projeto.id_sistema}</h2>
                                    <h2>ID do criador: {projeto.id_criador}</h2>
                                    <h2>Data de início: {projeto.data_inicio}</h2>
                                    <h2>Data de fim: {projeto.data_fim}</h2>
                                    <h2>ID: {projeto.id || ''}</h2>
                                </li>
                            ))}
                        </ul>
                        </Container>        
                   {/* <form onSubmit={this.handleCadastro}>
                        { this.state.error && <p>{this.state.error}</p>}
						<p>Descrição
                        <input type="text"
                        onChange={e => this.setState({descricao: e.target.value})}/>
                        </p>
						<p>ID do sistema
                        <input type="text"
                        onChange={e => this.setState({id_sistema: e.target.value})}/>
                        </p>
                        <p>ID do criador
                        <input type="text"
                        onChange={e => this.setState({id_criador: e.target.value})}/>
                        </p>
                        <p>Data de fim
                        <input type="text"
                        onChange={e => this.setState({data_fim: e.target.value})}/>
                        </p>
                        <button type="submit">Adicionar</button>
                    </form>
                            */}
                </div>
		);
	}
}

export default Projeto;
