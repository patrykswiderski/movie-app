import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store";

//**setup axios */

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common[
	"Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTEyYTkwNTNiMmMyZjgyOTY0NjFkYTUyNTIxZWNhMCIsInN1YiI6IjY2NTViMWU4NWNhMjhlM2Q4MTE5ZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j_fSBMtYAysVKvcfNcdPk-fkPhWKJvRINHDxF6GV0tc`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
