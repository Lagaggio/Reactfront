import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";



class Projeto_usuario extends Component {

    state = {
        listaProjeto_usuario: [],
        id_usuario: "",
		id: "",
		error: "",
		editando: false,
		id_projeto: "",
		id_projeto_user: ""
	};

	
    async componentDidMount() {
        const res = await api.get('/projeto_usuario');
        // console.log(res.data);
        this.setState({listaProjeto_usuario: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const body = {
			id_usuario: this.state.id_usuario,
			id_projeto: this.state.id_projeto
		} 
		if (!body.id_usuario || !body.id_projeto){
			this.setState({
				error: "Falta colocar uma id"
			});
		} else {
			try {
				await api.post("/projeto_usuario", body);
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
			id: this.state.id_projeto_user,
			id_usuario: this.state.id_usuario,
			id_projeto: this.state.id_projeto
		} 
		console.log(body)
		if (!body.id_usuario || !body.id_projeto) {
			this.setState({
				error: "Falta colocar algum valor"
			});
		} else {
			try {
				await api.put("/projeto_usuario", body);
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};

	deleteProjeto_usuario = async (id) => {
		await api.delete(`projeto_usuario?id=${id}`).then(resposta => {
			alert("Projeto usuario deletado com sucesso")
			window.location.reload();
		}, err => {
			alert("deu bosta")
		})
	}

   getProjeto_usuario = async (id) => {
		await api.get(`projeto_usuario?id=${id}`).then(resposta => {
			
			let projUser = resposta.data[0];
			//console.log(user)
			this.setState({
				id_projeto: projUser.id_projeto,
				id_usuario: projUser.id_usuario,
				id_projeto_user: projUser.id,
				editando: true,
			})
		}, err => {
			alert("deu bosta")
		})
	}

	
	render(){

        const {listaProjeto_usuario} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Projetos do usuario</h1>
                        <Container>
                        <ul>
                            {listaProjeto_usuario.map(projeto_usuario => (
                                <li>
                                    <h2>ID Projeto: {projeto_usuario.id_projeto}</h2>
                                    <h2>ID do Usuario: {projeto_usuario.id_usuario}</h2>
									<button onClick={() => this.deleteProjeto_usuario(projeto_usuario.id)}>Deletar</button>
                                    <button onClick={() => this.getProjeto_usuario(projeto_usuario.id)}>Editar</button>
                                </li>
                            ))}
                        </ul>
                        </Container>        
                    <form onSubmit={this.handleCadastro}>
                        { this.state.error && <p>{this.state.error}</p>}
						<p>ID de usuario
                        <input type="text"
                        onChange={e => this.setState({id_usuario: e.target.value})}/>
                        </p>
						<p>ID do Projeto
                        <input type="text"
                        onChange={e => this.setState({id_projeto: e.target.value})}/>
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
								<p>ID Projeto novo
									<input type="text"
									value={this.state.id_projeto}
									onChange={e => this.setState({id_projeto: e.target.value})}/>
								</p>
								<button type="submit">Editar</button>
							</form>
					}
                    
                    
                </div>
		);
	}
}

export default Projeto_usuario;
