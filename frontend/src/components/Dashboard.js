import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import api from '../api';
import moment from 'moment';


class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			postContent: "",
		};
	}
	componentDidMount() {
		if (!this.props.authToken) {
			this.props.history.push("/login");
		} else {
			this.loadPosts();
		}
	}
	loadPosts() {
		api.getPosts().then(response => {
			this.setState({
				posts: response.data.map(({ user, content, timestamp }) => ({
					user: {
						name: user.name,
						uid: user._id
					},
					content,
					timestamp,
				}))
			});
		});
	}
	postContentChangeHandler = event => {
		this.setState({
			postContent: event.target.value
		});
	}
	postStatusUpdate = () => {
		api.postStatus(this.state.postContent).then(response => {
			this.loadPosts();
		});
	}
	render() {
		return (
			<div className="dashboard-container">
				<div className="form-group">
					<label htmlFor="status">Update Your Status:</label>
					<textarea className="form-control" rows="5" id="status" onChange={this.postContentChangeHandler}></textarea>
					<button className="btn btn-primary" onClick={this.postStatusUpdate}>Post status Update</button>
				</div>
				<hr />
				{this.state.posts.map((post, index) => {
					return <div className="post" key={index}>
						<img src={"http://localhost:5000/" + post.user.uid + ".jpg"} alt="profile" />
						<span className="username">{post.user.name}</span>
						<span className="timestamp">{moment(post.timestamp).format("MMMM Do YYYY, h:mm:ss a")}</span>
						<div className="content">{post.content}</div>
					</div>
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token
	}
};

export default compose(
	withRouter,
	connect(mapStateToProps, null)
)(Dashboard);