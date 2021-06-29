import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";

class Status_tarefa extends Component {

    state = {
        listaStatus_tarefa: [],
        descricao: "",
        id: "",
		error: ""
	};

    async componentDidMount() {
        const res = await api.get('/tarefa_status');
        // console.log(res.data);
        this.setState({listaStatus_tarefa: res.data});
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
				await api.post("/tarefa_status", {descricao});
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
		if (!body.descricao || !body.id) {
			this.setState({
				error: "Falta colocar algum valor"
			});
		} else {
			try {
				await api.put("/tarefa_status", body);
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};

    deleteStatus_tarefa = async (id) => {
		await api.delete(`tarefa_status?id=${id}`).then(resposta => {
			alert("Status deletado com sucesso")
			window.location.reload();
		}, err => {
			alert("deu bosta")
		})
	}

    getStatus_tarefa = async (id) => {
		await api.get(`tarefa_status?id=${id}`).then(resposta => {
			console.log(resposta.data)
			let status = resposta.data[0];
			//console.log(user)
			this.setState({
				novadesc: status.descricao,
				id: status.id,
				editando: true,
			})
		}, err => {
			alert("deu bosta")
		})
    }
	
	render(){

        const {listaStatus_tarefa} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Status</h1>
                        <Container>
                        <ul>
                            {listaStatus_tarefa.map(status_tarefa => { 
								return (
                                <li>
                                    <h2>Status: {status_tarefa.descricao}</h2>
                                    <p>id: {status_tarefa.id}</p>
                                    <button onClick={() => this.deleteStatus_tarefa(status_tarefa.id)}>Deletar</button>
                                    <button onClick={() => this.getStatus_tarefa(status_tarefa.id)}>Editar</button>
                                </li>
								)
							})}
                        </ul>
                        </Container>        
                    <form onSubmit={this.handleCadastro}>
                        { this.state.error && <p>{this.state.error}</p>}
                        <p>Status
                        <input type="text"
                        onChange={e => this.setState({descricao: e.target.value})}/>
                        </p>
                        <button type="submit">Adicionar</button>
                    </form>
                    {
                    this.state.editando &&
                    <form onSubmit={this.handleUpdate}>
                        { this.state.error && <p>{this.state.error}</p>}
                        <p>Novo status
                        <input type="text"
                        value={this.state.novadesc}
                        onChange={e => this.setState({novadesc: e.target.value})}/>
                        </p>
						<p>ID do status
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

export default Status_tarefa;
