import React, { Component } from 'react';
import api from '../../Services/api';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: ''
		};
	}

	componentWillMount() {
		return this.props.loggedInStatus ? this.redirect() : null;
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const { email, password } = this.state;

		let user = {
			email: email,
			password: password
		};

		api
			.post('/auth_login', { user }, { withCredentials: true })
			.then((response) => {
				if (response.data.logged_in) {
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
			<Message>
				<Message.Header>Erro</Message.Header>
				<Message.List>
					{this.state.errors.map((error) => {
						return <Message.Item key={error}>{error}</Message.Item>;
					})}
				</Message.List>
			</Message>
		);
	};

	render() {
		const { email, password } = this.state;
		return (
			<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						React Auth
					</Header>
					{this.state.errors ? this.handleErrors() : null}
					<Form size="large" onSubmit={this.handleSubmit}>
						<Segment stacked>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="E-mail"
								name="email"
								value={email}
								onChange={this.handleChange}
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Senha"
								type="password"
								name="password"
								value={password}
								onChange={this.handleChange}
							/>
							<Button color="teal" fluid size="large">
								Entrar
							</Button>
						</Segment>
					</Form>
					<Message>
						Não possui uma Conta? <Link to="/signup">Cadastre-se</Link>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Login;
