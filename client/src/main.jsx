import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "../context/userContext";
import { Toaster } from "react-hot-toast";

// Connecting front end to backend server
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
	<UserContextProvider>
		<React.StrictMode>
			<BrowserRouter>
				<Toaster
					position="bottom-center"
					toastOptions={{
						duration: 2000,
						style: {
							background: "#333",
							color: "#fff",
						},
					}}
				/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/search-page" element={<SearchPage />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</UserContextProvider>
);
