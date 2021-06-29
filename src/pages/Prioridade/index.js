import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";



class Propriedade extends Component {

    state = {
        listaPrioridade: [],
		descricao: "",
		error: "",
		novadesc: "",
		editando: false,
		id_prioridade: ""
	};

	
    async componentDidMount() {
        const res = await api.get('/prioridade');
        // console.log(res.data);
        this.setState({listaPrioridade: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const body = {
			descricao: this.state.descricao,
		} 
		if (!body.descricao){
			this.setState({
				error: "Falta colocar uma descrição"
			});
		} else {
			try {
				await api.post("/prioridade", body);
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
			id: this.state.id_prioridade,
			novadesc: this.state.novadesc,
		} 
		if (!body.novadesc) {
			this.setState({
				error: "Falta colocar algum valor"
			});
		} else {
			try {
				await api.put("/prioridade", body);
				window.location.reload();
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};


	deletePrioridade = async (id) => {
		await api.delete(`prioridade?id=${id}`).then(resposta => {
			alert("Prioridade deletada com sucesso")
			window.location.reload();
		}, err => {
			alert("Não pode ser deletada pois sua chave pertence a outra tabela")
		})
	}

	getPrioridade = async (id) => {
		await api.get(`prioridade?id=${id}`).then(resposta => {
			
			let priority = resposta.data[0];
			console.log(priority)
			this.setState({
				id_prioridade: priority.id,
				novadesc: priority.descricao,
				editando: true,
			})
		}, err => {
			alert("deu bosta")
		})
	}	

	
	
	render(){

        const {listaPrioridade} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Prioridades</h1>
                        <Container>
                        <ul>
                            {listaPrioridade.map(prioridade => (
                                <li>
                                    <h2>Prioridade: {prioridade.descricao}</h2>
                                    <button onClick={() => this.deletePrioridade(prioridade.id)}>Deletar</button>
									<button onClick={() => this.getPrioridade(prioridade.id)}>Editar</button>
                                </li>
                            ))}
                        </ul>
                        </Container>        
						<form onSubmit={this.handleCadastro}>
                        		{ this.state.error && <p>{this.state.error}</p>}
								<p>Nível de prioridade
                        			<input type="text"
                        			onChange={e => this.setState({descricao: e.target.value})}/>
                        		</p>
                        	<button type="submit">Adicionar</button>
                    	</form>
					{
						this.state.editando &&
							<form onSubmit={this.handleUpdate}>
								{ this.state.error && <p>{this.state.error}</p>}
								<p>Nova descrição
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

export default Propriedade;
