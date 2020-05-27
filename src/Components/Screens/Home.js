import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../Services/api';
import { Button } from 'semantic-ui-react';
import './styles.css';

class Home extends Component {
	handleClick = () => {
		api
			.delete('/auth_logout', { withCredentials: true })
			.then((response) => {
				this.props.handleLogout();
				this.props.history.push('/');
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<div className="container_page">
				<h1>Home Page - React Auth</h1>
				{this.props.loggedInStatus ? (
					<div>
						<br />
						<Link to="/logout" onClick={() => this.handleClick()}>
							<Button negative>Sair</Button>
						</Link>
						{this.props.user && <p>Logado como: {this.props.user.email}</p>}
					</div>
				) : (
					<div>
						<Link to="/login">
							<Button primary>Entrar</Button>
						</Link>
						<Link to="/signup">
							<Button secondary>Cadastrar</Button>
						</Link>
					</div>
				)}
			</div>
		);
	}
}

export default Home;
