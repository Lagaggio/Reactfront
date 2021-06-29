import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
//import axios from 'axios';

import { Form, Container } from './styles';
import { login } from "../../services/auth";
import api from "../../services/api";
//import { withRouter } from "react-router-dom";

class Login extends Component {
	state = {
		user: "",
		senha_usuario: "",
		error: ""
	};
	
	handleLogin = async e => {
		e.preventDefault();
		const { user, senha_usuario } = this.state;
		if (!user || !senha_usuario){
			this.setState({
				error: "Falta username ou password"
			});
		} else {
			try {
				const response = await api.post("/auth", {user, senha_usuario});
				login(response.data.token);
				this.props.history.push("/app");
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
	};
	
	render(){
		return (
			<Container>
				<Form onSubmit={this.handleLogin}>
					{ this.state.error && <p>{this.state.error}</p>}
					<p>Usuário
					<input type="text"
					onChange={e => this.setState({user: e.target.value})}/>
					</p>
					<p>Senha
					<input type="password"
					onChange={e => this.setState({senha_usuario: e.target.value})}/>
					</p>
					<button type="submit">Entrar</button>
				</Form>
			</Container>
		);
	}
}
export default Login;
