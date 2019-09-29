import axios from "axios";
import store from "./store/store"

const http = axios.create({
	baseURL: "http://localhost:5000"
});

http.interceptors.request.use(request => {
	const token = store.getState().auth.token;
	if (token) {
		request.headers.Authorization = "Bearer " + token;
	}
	return request;
});

export default {
	login: (username, password) => {
		return http.post("/auth/login", { email: username, password });
	},
	register: (name, email, password) => {
		return http.post("/auth/register", { name, email, password });
	},
	uploadProfilePicture: formData => {
		return http.post("/users/profile-picture", formData);
	},
	updateUser: ({ name }) => {
		return http.put("/users", { name });
	},
	getUser: () => {
		return http.get("/users");
	},
	getPosts: () => {
		return http.get("/posts");
	},
	postStatus: content => {
		return http.post("/posts", { content });
	}
};