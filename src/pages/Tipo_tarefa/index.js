import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";

class Tipo_tarefa extends Component {

    state = {
        listaTipo_tarefa: [],
        descricao: "",
        id: "",
		error: ""
	};

    async componentDidMount() {
        const res = await api.get('/tarefa_tipo');
        // console.log(res.data);
        this.setState({listaTipo_tarefa: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const { descricao } = this.state;
		if (!descricao){
			this.setState({
				error: "Falta colocar uma descricao"
			});
		} else {
			try {
				await api.post("/tarefa_tipo", {descricao});
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};

    handleUpdate = async e => {
		e.preventDefault();
		const body = {
			id: this.state.id,
			descricao: this.state.novadesc,
		} 
		if (!body.id || !body.descricao) {
			this.setState({
				error: "Falta colocar algum valor"
			});
		} else {
			try {
				await api.put("/tarefa_tipo", body);
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};

    deleteTipo_tarefa = async (id) => {
		await api.delete(`tarefa_tipo?id=${id}`).then(resposta => {
			alert("Status deletado com sucesso")
			window.location.reload();
		}, err => {
			alert("deu bosta")
		})
	}

    getTipo_tarefa = async (id) => {
		await api.get(`tarefa_tipo?id=${id}`).then(resposta => {
			
			let tipo = resposta.data[0];
			//console.log(user)
			this.setState({
				novadesc: tipo.descricao,
				id: tipo.id,
				editando: true,
			})
		}, err => {
			alert("deu bosta")
		})
    }

	render(){

        const {listaTipo_tarefa} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Tipos</h1>
                        <Container>
                        <ul>
                            {listaTipo_tarefa.map(tipo_tarefa => (
                                <li>
                                    <h2>Tipo: {tipo_tarefa.descricao}</h2>
                                    <p>ID: {tipo_tarefa.id}</p>
                                    <button onClick={() => this.deleteTipo_tarefa(tipo_tarefa.id)}>Deletar</button>
                                    <button onClick={() => this.getTipo_tarefa(tipo_tarefa.id)}>Editar</button>
                                </li>
                            ))}
                        </ul>
                        </Container>        
                    <form onSubmit={this.handleCadastro}>
                        { this.state.error && <p>{this.state.error}</p>}
                        <p>Tipo
                        <input type="text"
                        onChange={e => this.setState({descricao: e.target.value})}/>
                        </p>
                        <button type="submit">Adicionar</button>
                    </form>
                    {
                    this.state.editando &&
                    <form onSubmit={this.handleUpdate}>
                        { this.state.error && <p>{this.state.error}</p>}
                        <p>Novo Tipo
                        <input type="text"
                        value={this.state.novadesc}
                        onChange={e => this.setState({novadesc: e.target.value})}/>
                        </p>
						<p>ID do Tipo
                        <input type="text"
                        value={this.state.id}
                        onChange={e => this.setState({id: e.target.value})}/>
                        </p>
                        <button type="submit">Editar</button>
                    </form>
                    }
                </div>
		);
	}
}

export default Tipo_tarefa;
