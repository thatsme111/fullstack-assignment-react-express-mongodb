import React, { Component } from 'react';
import api from "../api";
import { setToken, initUser } from "../store/modules/authModule";
import { bindActionCreators, compose } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			message: "",
		};
		this.username = React.createRef();
		this.password = React.createRef();
	}
	componentDidMount() {
		if (this.props.authToken) {
			this.props.history.push("/dashboard");
		}
	}
	handleLoginClick = async () => {
		this.setState({ message: "" });
		try {
			const response = await api.login(this.state.email, this.state.password);
			this.props.setToken(response.data.token);
			const { name } = (await api.getUser()).data;
			this.props.initUser({ name });
			this.props.history.push("/dashboard");
		} catch (error) {
			this.setState({
				message: "Invalid Username or Password"
			});
		}
	}
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value,
			message: ""
		});
	}
	handleKeyPress = event => {
		if ("Enter" === event.key) {
			this.handleLoginClick();
		}
	}
	render() {
		return (
			<div className="auth-container">
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input type="text" className="form-control" id="email" onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="username">Password:</label>
					<input type="password" className="form-control" id="password" onChange={this.handleChange}
						onKeyPress={this.handleKeyPress} />
				</div>
				<div className="btn btn-primary btn-block" onClick={this.handleLoginClick}>Login</div>
				<div className="text-center m-2">{this.state.message}</div>
				<hr />
				<div className="text-center">Want to <a href="/register">Register</a> instead?</div>
			</div >
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token
	}
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		setToken,
		initUser
	}, dispatch);
}

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Login);