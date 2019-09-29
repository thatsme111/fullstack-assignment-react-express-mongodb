import React from 'react';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./components/App";

import "bootstrap/dist/css/bootstrap.css";
import "./index.scss"

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

