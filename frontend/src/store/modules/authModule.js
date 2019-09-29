const initialState = {
	token: "",
	userUid: "",
	email: "",
	name: "",
};

const decodeToken = token => {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
};

const token = localStorage.getItem("token");
if (token) {
	const user = decodeToken(token);
	initialState.token = token;
	initialState.userUid = user.user_uid || "";
	initialState.email = user.email || "";
}

const SET_TOKEN = "AUTH/SET_TOKEN";
const CLEAR_TOKEN = "AUTH/CLEAR_TOKEN";
const INIT_USER = "AUTH/INIT_USER";

export const setToken = (token) => {
	return {
		type: SET_TOKEN,
		payload: {
			token
		}
	}
};

export const clearToken = () => ({ type: CLEAR_TOKEN });

export const initUser = ({ name }) => ({ type: INIT_USER, payload: { name } });

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TOKEN:
			localStorage.setItem("token", action.payload.token);
			return { ...state, token: action.payload.token };
		case CLEAR_TOKEN:
			localStorage.setItem("token", "");
			return { ...state, token: "" };
		case INIT_USER:
			return { ...state, name: action.payload.name }
		default:
			return state;
	}
};