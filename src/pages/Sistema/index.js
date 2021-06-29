import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";

class Sistema extends Component {

    state = {
        listaSistema: [],
        id_sistema: "",
		nome: "",
		error: ""
	};

    async componentDidMount() {
        const res = await api.get('/sistema');
        // console.log(res.data);
        this.setState({listaSistema: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const { nome } = this.state;
		if (!nome){
			this.setState({
				error: "Falta colocar um nome"
			});
		} else {
			try {
				await api.post("/sistema", {nome});
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
			id_sistema: this.state.id,
			nome: this.state.novonome,
		} 
		if (!body.id_sistema || !body.nome) {
			this.setState({
				error: "Falta colocar algum valor"
			});
		} else {
			try {
				await api.put("/sistema", body);
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};

    deleteSistema = async (id) => {
		await api.delete(`sistema?id=${id}`).then(resposta => {
			alert("Sistema deletado com sucesso")
			window.location.reload();
		}, err => {
			alert("deu bosta")
		})
	}

    getSistema = async (id) => {
		await api.get(`sistema?id=${id}`).then(resposta => {
			
			let system = resposta.data[0];
			//console.log(user)
			this.setState({
				novonome: system.nome,
				id: system.id_sistema,
				editando: true,
			})
		}, err => {
			alert("deu bosta")
		})
	}
	
	render(){

        const {listaSistema} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Sistemas</h1>
                        <Container>
                        <ul>
                            {listaSistema.map(sistema => (
                                <li>
                                    <h2>Sistema: {sistema.nome}</h2>
                                    <p>id: {sistema.id_sistema}</p>
                                    <button onClick={() => this.deleteSistema(sistema.id_sistema)}>Deletar</button>
                                    <button onClick={() => this.getSistema(sistema.id_sistema)}>Editar</button>
                                </li>
                            ))}
                        </ul>
                        </Container>        
                    <form onSubmit={this.handleCadastro}>
                        { this.state.error && <p>{this.state.error}</p>}
                        <p>Descrição
                        <input type="text"
                        onChange={e => this.setState({nome: e.target.value})}/>
                        </p>
                        <button type="submit">Adicionar</button>
                    </form>
                    {
                    this.state.editando &&
                    <form onSubmit={this.handleUpdate}>
                        { this.state.error && <p>{this.state.error}</p>}
                        <p>Id do Sistema
                        <input type="text"
                        value={this.state.id}
                        onChange={e => this.setState({id: e.target.value})}/>
                        </p>
                        <p>Novo nome
                        <input type="text"
                        value={this.state.novonome}
                        onChange={e => this.setState({novonome: e.target.value})}/>
                        </p>
                        <button type="submit">Editar</button>
                    </form>
                    }
                </div>
		);
	}
}

export default Sistema;
