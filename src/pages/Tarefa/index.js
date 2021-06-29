import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Container } from './styles';
import api from "../../services/api";
//import { withRouter } from "react-router-dom";
/*{id, titulo, descricao, id_projeto, id_criador, id_dev, tempo_estimado, 
    data_inicio, data_fim, id_pai_tarefa, id_tipo_tarefa, id_status_tarefa, 
    data_inicio_dev, data_fim_dev, tempo_realizado, authorized, id_prioridade, 
    complexidade, impacto, id_grupo}*/


class Tarefa extends Component {

    state = {
        listaTarefa: [],
        id: "", 
        titulo: "", 
        descricao: "", 
        id_projeto: "", 
        id_criador: "", 
        id_dev: "", 
        tempo_estimado: "", 
        data_inicio: "", 
        data_fim: "", 
        id_pai_tarefa: "", 
        id_tipo_tarefa: "", 
        id_status_tarefa: "", 
        data_inicio_dev: "", 
        data_fim_dev: "", 
        tempo_realizado: "", 
        authorized: "", 
        id_prioridade: "", 
        complexidade: "", 
        impacto: "", 
        id_grupo: "",
		error: "",
		editando: false
	};

	
    async componentDidMount() {
        const res = await api.get('/tarefa');
        // console.log(res.data);
        this.setState({listaTarefa: res.data});
    }

	handleCadastro = async e => {
		e.preventDefault();
		const body = {
			descricao: this.state.descricao,
            titulo: this.state.titulo,
            id: this.state.id || "NULL",
            id_criador: this.state.id_criador || "NULL",
            id_dev: this.state.id_dev || "NULL",
            id_projeto: this.state.id_projeto || "NULL",
            data_inicio: this.state.data_inicio,
            data_fim: this.state.data_fim,
            data_inicio_dev: this.state.data_inicio_dev,
            data_fim_dev: this.state.data_fim_dev,
            id_grupo: this.state.id_grupo || "NULL",
            id_prioridade: this.state.id_prioridade || "NULL",
            id_pai_tarefa: this.state.id_pai_tarefa || "NULL",
            id_status_tarefa: this.state.id_status_tarefa || "NULL",
            id_tipo_tarefa: this.state.id_tipo_tarefa || "NULL",
            authorized: this.state.authorized || "NULL",
            tempo_estimado: this.state.tempo_estimado || "NULL",
			tempo_realizado: this.state.tempo_realizado || "NULL",
			complexidade: this.state.complexidade || "NULL",
			impacto: this.state.id_impacto || "NULL"
		} 

        console.log(body)
		if (!body.descricao || !body.titulo ){
			this.setState({
				error: "Falta colocar uma descrição ou um título"
			});
		} else {
			try {
				await api.post("/tarefa", body);
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

        const {listaTarefa} = this.state;
        // console.log(listaUsers);

		return (
                <div>
                    
                        <h1>Lista de Tarefas</h1>
                        <Container>
                        <ul>
                            {listaTarefa.map(tarefa => (
                                <li>
                                    <h2>Título: {tarefa.titulo}</h2>
                                    <h2>Descrição: {tarefa.descricao}</h2>
                                    <h2>ID: {tarefa.id || ''}</h2>
                                    <h2>Tempo estimado: {tarefa.tempo_estimado}</h2>
                                    <h2>Tempo realizado: {tarefa.tempo_realizado}</h2>
                                    <h2>Complexidade: {tarefa.conplexidade}</h2>
                                    <h2>Impacto: {tarefa.impacto}</h2>

                                </li>
                            ))}
                        </ul>
                        </Container>        
                    {/*<form onSubmit={this.handleCadastro}>
                        { this.state.error && <p>{this.state.error}</p>}
						<p>Título
                        <input type="text"
                        onChange={e => this.setState({titulo: e.target.value})}/>
                        </p>
						<p>Descrição
                        <input type="text"
                        onChange={e => this.setState({descricao: e.target.value})}/>
                        </p>
                        <p>ID
                        <input type="text"
                        onChange={e => this.setState({id: e.target.value})}/>
                        </p>
                        <p>Tempo estimado
                        <input type="text"
                        onChange={e => this.setState({tempo_estimado: e.target.value})}/>
                        </p>
						<p>Tempo realizado
                        <input type="text"
                        onChange={e => this.setState({tempo_realizado: e.target.value})}/>
                        </p>
                        <p>Complexidade
                        <input type="text"
                        onChange={e => this.setState({complexidade: e.target.value})}/>
                        </p>
                        <p>Impacto
                        <input type="text"
                        onChange={e => this.setState({impacto: e.target.value})}/>
                        </p>
                        <p>ID Criador
                        <input type="text"
                        onChange={e => this.setState({id_criador: e.target.value})}/>
                        </p>
                        <p>ID Projeto
                        <input type="text"
                        onChange={e => this.setState({id_projeto: e.target.value})}/>
                        </p>
                        <p>ID Dev
                        <input type="text"
                        onChange={e => this.setState({id_dev: e.target.value})}/>
                        </p>
                        <p>Data Inicio
                        <input type="text"
                        onChange={e => this.setState({data_inicio: e.target.value})}/>
                        </p>
                        <p>Data Fim
                        <input type="text"
                        onChange={e => this.setState({data_fim: e.target.value})}/>
                        </p>
                        <p>Data inicio dev
                        <input type="text"
                        onChange={e => this.setState({data_inicio_dev: e.target.value})}/>
                        </p>
                        <p>Data fim dev
                        <input type="text"
                        onChange={e => this.setState({data_fim_dev: e.target.value})}/>
                        </p>
                        <p>ID grupo
                        <input type="text"
                        onChange={e => this.setState({id_grupo: e.target.value})}/>
                        </p>
                        <p>ID tipo de tarefa
                        <input type="text"
                        onChange={e => this.setState({id_tipo_tarefa: e.target.value})}/>
                        </p>
                        <p>ID pai da tarefa
                        <input type="text"
                        onChange={e => this.setState({id_pai_tarefa: e.target.value})}/>
                        </p>
                        <p>ID status
                        <input type="text"
                        onChange={e => this.setState({id_status_tarefa: e.target.value})}/>
                        </p>
                        <p>Authorized
                        <input type="text"
                        onChange={e => this.setState({authorized: e.target.value})}/>
                        </p>
                        <p>ID prioridade
                        <input type="text"
                        onChange={e => this.setState({id_prioridade: e.target.value})}/>
                        </p>
                        <button type="submit">Adicionar</button>
                    </form>
                            */}
                </div>
		);
	}
}

export default Tarefa;
