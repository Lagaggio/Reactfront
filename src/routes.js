import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//npm install react-router-dom axios styled-components prop-types font-awesome

import { isAuthenticated } from "./services/auth";
import Login from "./pages/Login";
import Usuario from "./pages/Usuario";
import Comentario from "./pages/Comentario";
import Grupo from "./pages/Grupo";
import Prioridade from "./pages/Prioridade";
import Tarefa from "./pages/Tarefa";
import Projeto from "./pages/Projeto";
import Projeto_usuario from "./pages/Projeto_usuario"
import Sistema from "./pages/Sistema";
import Status_tarefa from "./pages/Status_tarefa";
import Tipo_tarefa from "./pages/Tipo_tarefa";
import App from "./pages/App";



const PrivateRoute = ({ component: Component, ...rest}) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/", state: { from: props.location } }} />
			)
		}
	/>
);

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Login} />
			<PrivateRoute path="/app" component={App} />
			<PrivateRoute path="/usuarios" component={Usuario} />
			<PrivateRoute path="/comentarios" component={Comentario} />
			<PrivateRoute path="/grupos" component={Grupo} />
			<PrivateRoute path="/prioridades" component={Prioridade} />
			<PrivateRoute path="/projetos_usuario" component={Projeto_usuario} />
			<PrivateRoute path="/projetos" component={Projeto} />
			<PrivateRoute path="/sistemas" component={Sistema} />
			<PrivateRoute path="/status_tarefa" component={Status_tarefa} />
			<PrivateRoute path="/tipo_tarefa" component={Tipo_tarefa} />
			<PrivateRoute path="/tarefas" component={Tarefa} />
			<Route path="*" component={() => <h3>404 não encontrado</h3>} />
		</Switch>
	</BrowserRouter>
)

export default Routes;
