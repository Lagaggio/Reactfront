import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";

class Usuario extends Component {

    state = {
        listaUsers: [],
        id_usuario: "",
		nome: "",
        novoNome: "",
		error: ""
	};

    async componentDidMount() {
        const res = await api.get('/usuario');
        // console.log(res.data);
        this.setState({listaUsers: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const { nome } = this.state;
		if (!nome){
			this.setState({
				error: "Falta colocar o username"
			});
		} else {
			try {
				await api.post("/usuario", {nome});
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
		const { id_usuario, novoNome } = this.state;
		if (!id_usuario || !novoNome) {
			this.setState({
				error: "Falta colocar algum valor"
			});
		} else {
			try {
				await api.put("/usuario", {id_usuario, novoNome});
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};

    deleteUsuario = async (id) => {
		await api.delete(`usuario?id=${id}`).then(resposta => {
			alert("Usuario deletado com sucesso")
			window.location.reload();
		}, err => {
			alert("deu bosta")
		})
	}

    getUsuario = async (id) => {
		await api.get(`usuario?id=${id}`).then(resposta => {
			
			let User = resposta.data[0];
			//console.log(user)
			this.setState({
				novoNome: User.nome,
				id_usuario: User.id_usuario,
				editando: true,
			})
		}, err => {
			alert("deu bosta")
		})
	}
	
	render(){

        const {listaUsers} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Usuários</h1>
                        <Container>
                        <ul>
                            {listaUsers.map(user => (
                                <li>
                                    <h2>Nome: {user.nome}</h2>
                                    <p>id: {user.id_usuario}</p>
                                    <button onClick={() => this.deleteUsuario(user.id_usuario)}>Deletar</button>
                                    <button onClick={() => this.getUsuario(user.id_usuario)}>Editar</button>
                                </li>
                            ))}
                        </ul>
                        </Container>        
                    <form onSubmit={this.handleCadastro}>
                        { this.state.error && <p>{this.state.error}</p>}
                        <p>Nome do Usuário
                        <input type="text"
                        onChange={e => this.setState({nome: e.target.value})}/>
                        </p>
                        <button type="submit">Adicionar</button>
                    </form>
                    {
                    this.state.editando &&
                    <form onSubmit={this.handleUpdate}>
                        { this.state.error && <p>{this.state.error}</p>}
                        <p>Id do Usuário
                        <input type="text"
                        value={this.state.id_usuario}
                        onChange={e => this.setState({id_usuario: e.target.value})}/>
                        </p>
                        <p>Novo Nome
                        <input type="text"
                        value={this.state.novoNome}
                        onChange={e => this.setState({novoNome: e.target.value})}/>
                        </p>
                        <button type="submit">Editar</button>
                    </form>
                    }
                </div>
		);
	}
}

export default Usuario;
