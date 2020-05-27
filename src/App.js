import React, { Component } from 'react';
import api from './Services/api';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Screens/Home';
import Login from './Components/Registration/Login';
import Signup from './Components/Registration/Signup';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			user: {}
		};
	}

	componentDidMount() {
		this.loginStatus();
	}

	loginStatus = () => {
		api
			.get('/auth_logged_in', { withCredentials: true })
			.then((response) => {
				if (response.data.logged_in) {
					this.handleLogin(response);
					this.setState({ user: response.data.user });
				} else {
					this.handleLogout();
				}
			})
			.catch((error) => console.log('api errors:', error));
	};

	handleLogin = (data) => {
		this.setState({
			isLoggedIn: true,
			user: data.user
		});
	};

	handleLogout = () => {
		this.setState({
			isLoggedIn: false,
			user: {}
		});
	};

	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<Home
									{...props}
									handleLogout={this.handleLogout}
									loggedInStatus={this.state.isLoggedIn}
									user={this.state.user}
								/>
							)}
						/>

						<Route
							exact
							path="/login"
							render={(props) => (
								<Login
									{...props}
									handleLogin={this.handleLogin}
									loggedInStatus={this.state.isLoggedIn}
								/>
							)}
						/>
						<Route
							exact
							path="/signup"
							render={(props) => (
								<Signup
									{...props}
									handleLogin={this.handleLogin}
									loggedInStatus={this.state.isLoggedIn}
								/>
							)}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
