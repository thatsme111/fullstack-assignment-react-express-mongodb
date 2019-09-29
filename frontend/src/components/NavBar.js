import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { clearToken } from "../store/modules/authModule";

class NavBar extends Component {
	logout = event => {
		event.preventDefault();
		this.props.clearToken();
		this.props.history.push("/login");
	}
	render() {
		if (this.props.authToken) {
			const pathname = this.props.location.pathname;
			return (
				<div className="nav-bar-container">
					<ul>
						<li className="username">Hi {this.props.userName}!</li>
						<li><a onClick={this.logout} href="/">Logout</a></li>
						<li><a className={"/profile" === pathname ? "active" : ""} href="/profile">Profile</a></li>
						<li><a className={"/dashboard" === pathname ? "active" : ""} href="/dashboard">Dashboard</a></li>
					</ul >
				</div>
			);
		}
		return "";
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token,
		userName: state.auth.name,
	}
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		clearToken
	}, dispatch);
}

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(NavBar);