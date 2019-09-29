import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../api';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: this.props.userName,
			profilePictureFile: null,
			message: "",
		};
	}
	componentDidMount() {
		if (!this.props.authToken) {
			this.props.history.push("/login");
		}
	}
	profilePictureChangeHandler = event => {
		this.setState({
			message: "",
			profilePictureFile: event.target.files[0]
		});
	}
	userNameChangeHandler = event => {
		this.setState({
			userName: event.target.value
		});
	}
	saveProfile = async () => {
		this.setState({ message: "" });
		// profile details
		if (this.state.userName) {
			try {
				await api.updateUser({ name: this.state.userName });
			} catch (error) {
				this.setState({ message: error.response.data.message || error.message });
			}
		}

		// profile picture 
		if (this.state.profilePictureFile) {
			const formData = new FormData();
			formData.append("profile-picture", this.state.profilePictureFile);
			try {
				await api.uploadProfilePicture(formData);
				document.querySelector("#profile-picture").src = this.getProfilePicturePath() + "?" + Math.round(Math.random() * 1000000);
			} catch (error) {
				this.setState({ message: error.response.data.message || error.message });
			}
		}
		this.setState({ message: "Profile Saved Successfully" });
	}
	getProfilePicturePath() {
		return "http://localhost:5000/" + this.props.userUid + ".jpg";
	}
	render() {
		return (
			<div className="profile-container">
				<div className="form-group">
					<label htmlFor="name">Username:</label>
					<input type="text" className="form-control" id="name" defaultValue={this.props.userName} onChange={this.userNameChangeHandler} />
				</div>
				<div className="form-group">
					<label htmlFor="name">Profile Picture:</label>
					<img id="profile-picture" src={this.getProfilePicturePath()} alt="profile" />
					<div className="m-2">Select file to change profile picture</div>
					<input type="file" className="form-control" onChange={this.profilePictureChangeHandler} />
				</div>
				<button type="submit" className="btn btn-primary btn-block" onClick={this.saveProfile}>Save Changes</button>
				<div className="text-center m-2">{this.state.message}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token,
		userUid: state.auth.userUid,
		userName: state.auth.name,
	}
};

export default connect(mapStateToProps, null)(Profile);