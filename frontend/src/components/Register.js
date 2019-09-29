import React, { Component } from 'react';
import api from "../api";
import { compose } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			message: "",
			registerSuccess: false
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
		let message = "";
		if (!this.state.name) message = "Please Provide Name";
		if (!this.state.email) message = "Please Provide Email";
		if (!this.state.password) message = "Please Provide Password";
		this.setState({ message });
		if (message) return;

		try {
			await api.register(
				this.state.name,
				this.state.email,
				this.state.password
			);
			this.setState({
				registerSuccess: true
			});
		} catch (error) {
			this.setState({
				message: error.response.data.message || "Invalid Username or Password"
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
					<label htmlFor="name">Name:</label>
					<input type="text" className="form-control" id="name" onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input type="text" className="form-control" id="email" onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="username">Password:</label>
					<input type="password" className="form-control" id="password" onChange={this.handleChange}
						onKeyPress={this.handleKeyPress} />
				</div>
				<div className="btn btn-primary btn-block" onClick={this.handleLoginClick}>Register</div>
				<div className="text-center m-2">{this.state.message}</div>
				{this.state.registerSuccess ?
					<div className="text-center m-2">Successfully Registered now <a href="/login">Login</a></div> : ""}
				<hr />
				<div className="text-center">Want to <a href="/login">Login</a> instead?</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token
	}
};

// const mapDispatchToProps = dispatch => {
// 	return bindActionCreators({

// 	}, dispatch);
// }

export default compose(
	withRouter,
	connect(mapStateToProps, null)
)(Register);