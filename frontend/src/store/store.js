import { createStore, combineReducers } from "redux";
import auth from "./modules/authModule";

const reducers = combineReducers({
	auth
});

export default createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);