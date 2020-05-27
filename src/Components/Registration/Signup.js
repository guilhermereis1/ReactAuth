import React, { Component } from 'react';
import api from '../../Services/api';
import { Button, Message, Form } from 'semantic-ui-react';
import './styles.css';
import { Link } from 'react-router-dom';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			password_confirmation: '',
			errors: ''
		};
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const { username, email, password, password_confirmation } = this.state;

		let user = {
			username: username,
			email: email,
			password: password,
			password_confirmation: password_confirmation
		};

		api
			.post('/users', { user }, { withCredentials: true })
			.then((response) => {
				if (response.data.status === 'created') {
					this.props.handleLogin(response.data);
					this.redirect();
				} else {
					this.setState({
						errors: response.data.errors
					});
				}
			})
			.catch((error) => console.log('api errors:', error));
	};

	redirect = () => {
		this.props.history.push('/');
	};

	handleErrors = () => {
		return (
			<Message attached="bottom" warning>
				{this.state.errors.map((error) => {
					return (
						<ul>
							<li key={error}>{error}</li>
						</ul>
					);
				})}
			</Message>
		);
	};

	render() {
		const { username, email, password, password_confirmation } = this.state;
		return (
			<div className="signup_container">
				<Message attached header="Bem Vindo React Auth" content="Cadastre-se" />
				<Form onSubmit={this.handleSubmit} className="attached fluid segment">
					<Form.Field>
						<label>Nome de Usuário</label>
						<input
							placeholder="username"
							type="text"
							name="username"
							value={username}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Email</label>
						<input
							placeholder="Email"
							type="text"
							name="email"
							value={email}
							onChange={this.handleChange}
						/>
					</Form.Field>

					<Form.Field>
						<label>Senha</label>
						<input
							placeholder="Senha"
							type="password"
							name="password"
							value={password}
							onChange={this.handleChange}
						/>
					</Form.Field>

					<Form.Field>
						<label>Confirme a Senha</label>
						<input
							placeholder="Confirmação de Senha"
							type="password"
							name="password_confirmation"
							value={password_confirmation}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Button type="submit" placeholder="submit" color="blue">
						Registrar
					</Button>
					<Link to="/">
						<Button type="submit" placeholder="submit">
							Home
						</Button>
					</Link>
				</Form>
				{this.state.errors ? this.handleErrors() : null}
			</div>
		);
	}
}
export default Signup;
