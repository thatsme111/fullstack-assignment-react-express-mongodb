import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar"
import Profile from "./Profile"
import { initUser } from "../store/modules/authModule"
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import api from "../api";

class App extends Component {
	componentDidMount() {
		if (this.props.authToken) {
			api.getUser().then(response => {
				const user = response.data;
				this.props.initUser({
					name: user.name
				});
			});
		}
	}
	render() {
		return (
			<div className="container-fluid">
				<Router>
					<NavBar />
					<Route path="/" exact><Redirect to="/dashboard" /></Route>
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/dashboard" exact component={Dashboard} />
					<Route path="/profile" exact component={Profile} />
				</Router>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		initUser
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);