import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";



class Comentario extends Component {

    state = {
        listaComentario: [],
        id_usuario: "",
		id_tarefa: "",
		id_pai_comentario: "",
        novadesc: "",
		descricao: "",
		error: "",
		editando: false,
		id_comentario: ""
	};

	
    async componentDidMount() {
        const res = await api.get('/comentario');
        // console.log(res.data);
        this.setState({listaComentario: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const body = {
			descricao: this.state.descricao,
			id_tarefa: this.state.id_tarefa,
			id_usuario: this.state.id_usuario,
			id_pai_comentario: this.state.id_pai_comentario || "NULL"
		} 
		if (!body.descricao || !body.id_usuario || !body.id_tarefa){
			this.setState({
				error: "Falta colocar uma descrição"
			});
		} else {
			try {
				await api.post("/comentario", body);
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
			id: this.state.id_comentario,
			novadesc: this.state.novadesc,
			id_tarefa: this.state.id_tarefa,
			id_usuario: this.state.id_usuario,
			id_pai_comentario: this.state.id_pai_comentario || "NULL"
		} 
		if (!body.id_usuario || !body.id_tarefa || !body.novadesc) {
			this.setState({
				error: "Falta colocar algum valor"
			});
		} else {
			try {
				await api.put("/comentario", body);
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};


	deleteComentario = async (id) => {
		await api.delete(`comentario?id=${id}`).then(resposta => {
			alert("comentario deletado com sucesso")
			window.location.reload();
		}, err => {
			alert("deu bosta")
		})
	}

	getComentario = async (id) => {
		await api.get(`comentario?id=${id}`).then(resposta => {
			
				let comment = resposta.data[0];
			console.log(comment)
			this.setState({
				id_comentario: comment.id,
				id_usuario: comment.id_usuario,
				novadesc: comment.descricao,
				id_tarefa: comment.id_tarefa,
				editando: true,
				id_comentario_pai: comment.id_comentario_pai ? comment.id_comentario_pai : "",
			})
		}, err => {
			alert("deu bosta")
		})
	}
	
	render(){

        const {listaComentario} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Comentários</h1>
                        <Container>
                        <ul>
                            {listaComentario.map(comentario => (
                                <li>
                                    <h2>Comentario: {comentario.descricao}</h2>
                                    <h2>ID do Usuario: {comentario.id_usuario}</h2>
									<h2>ID da Tarefa: {comentario.id_tarefa}</h2>
									<h2>ID do Comentário pai: {comentario.id_pai_comentario || ''}</h2>
                                    <button onClick={() => this.deleteComentario(comentario.id)}>Deletar</button>
									<button onClick={() => this.getComentario(comentario.id)}>Editar</button>
                                </li>
                            ))}
                        </ul>
                        </Container>        
                    <form onSubmit={this.handleCadastro}>
                        { this.state.error && <p>{this.state.error}</p>}
						<p>ID de usuario existente
                        <input type="text"
                        onChange={e => this.setState({id_usuario: e.target.value})}/>
                        </p>
						<p>ID de tarefa existente
                        <input type="text"
                        onChange={e => this.setState({id_tarefa: e.target.value})}/>
                        </p>
                        <p>Comentario
                        <input type="text"
                        onChange={e => this.setState({descricao: e.target.value})}/>
                        </p>
						<p>Comentario pai
                        <input type="text"
                        onChange={e => this.setState({id_pai_comentario: e.target.value})}/>
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
								<p>Nova desc
									<input type="text"
									value={this.state.novadesc}
									onChange={e => this.setState({novadesc: e.target.value})}/>
								</p>
								<p>tarefa
									<input type="text"
									value={this.state.id_tarefa}
									onChange={e => this.setState({id_tarefa: e.target.value})}/>
								</p>
								<p>comentario pai
									<input type="text"
									value={this.state.id_comentario_pai}
									onChange={e => this.setState({id_comentario_pai: e.target.value})}/>
								</p>
								<button type="submit">Editar</button>
							</form>
					}
                    
                    
                </div>
		);
	}
}

export default Comentario;
