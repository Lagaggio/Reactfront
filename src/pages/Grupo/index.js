import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";



class Grupo extends Component {

    state = {
        listaGrupo: [],
		descricao: "",
		error: "",
		editando: false,
		id_projeto: "",
		novadesc: "",
		id_grupo: ""
	};

	
    async componentDidMount() {
        const res = await api.get('/grupo');
        // console.log(res.data);
        this.setState({listaGrupo: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const body = {
			descricao: this.state.descricao,
			id_projeto: this.state.id_projeto || "NULL"
		} 
		if (!body.descricao){
			this.setState({
				error: "Falta colocar uma descrição"
			});
		} else {
			try {
				await api.post("/grupo", body);
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
			id: this.state.id_grupo,
			novadesc: this.state.novadesc,
			id_projeto: this.state.id_projeto || "NULL"
		} 
		if (!body.novadesc) {
			this.setState({
				error: "Falta colocar algum valor"
			});
		} else {
			try {
				await api.put("/grupo", body);
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};


	deleteGrupo = async (id) => {
		await api.delete(`grupo?id=${id}`).then(resposta => {
			alert("Grupo deletado com sucesso")
			window.location.reload();
		}, err => {
			alert("Não pode ser deletado pois possue chave em outra tabela")
		})
	}

	getGrupo = async (id) => {
		await api.get(`grupo?id=${id}`).then(resposta => {
			
			let group = resposta.data[0];
			console.log(group)
			this.setState({
				id_grupo: group.id,
				novadesc: group.descricao,
				editando: true,
				id_projeto: group.id_projeto ? group.id_projeto : "",
			})
		}, err => {
			alert("deu bosta")
		})
	}	

	
	
	render(){

        const {listaGrupo} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Grupos</h1>
                        <Container>
                        <ul>
                            {listaGrupo.map(grupo => (
                                <li>
                                    <h2>Grupo: {grupo.descricao}</h2>
                                    <h2>ID do Projeto: {grupo.id_projeto}</h2>
                                    <button onClick={() => this.deleteGrupo(grupo.id)}>Deletar</button>
									<button onClick={() => this.getGrupo(grupo.id)}>Editar</button>
                                </li>
                            ))}
                        </ul>
                        </Container>        
						<form onSubmit={this.handleCadastro}>
                        		{ this.state.error && <p>{this.state.error}</p>}
								<p>Descrição do Grupo
                        			<input type="text"
                        			onChange={e => this.setState({descricao: e.target.value})}/>
                        		</p>
								<p>ID de projeto
                        			<input type="text"
                        			onChange={e => this.setState({id_projeto: e.target.value})}/>
                        		</p>
                        	<button type="submit">Adicionar</button>
                    	</form>
					{
						this.state.editando &&
							<form onSubmit={this.handleUpdate}>
								{ this.state.error && <p>{this.state.error}</p>}
								<p>Id do projeto
									<input type="text"
									value={this.state.id_projeto}
									onChange={e => this.setState({id_projeto: e.target.value})}/>
								</p>	
								<p>Nova desc
									<input type="text"
									value={this.state.novadesc}
									onChange={e => this.setState({novadesc: e.target.value})}/>
								</p>
								<button type="submit">Editar</button>
							</form>
					}
                    
                    
                </div>
		);
	}
}

export default Grupo;
