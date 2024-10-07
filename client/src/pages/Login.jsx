import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
//connecting to the backend
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	// State to hold email and password input values
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	//handles user logic
	const loginUser = async (e) => {
		e.preventDefault();
		const { email, password } = data;
		try {
			// Send a POST request to the /login endpoint with email and password
			const { data } = await axios.post("/login", {
				email,
				password,
			});
			// Check if there is an error in the response
			if (data.error) {
				toast.error(data.error);
			} else {
				// Clear the form data
				setData({});
				// Navigate to the dashboard page
				navigate("/dashboard");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header />
			<form className="login-form" onSubmit={loginUser}>
				<label className="login-label">Email</label>
				<input
					className="login-input-email"
					type="email"
					placeholder="enter email..."
					value={data.email}
					onChange={(e) => setData({ ...data, email: e.target.value })}
				/>
				<label className="login-label">Password</label>
				<input
					className="login-input-password"
					type="password"
					placeholder="enter password..."
					value={data.password}
					onChange={(e) => setData({ ...data, password: e.target.value })}
				/>
				<button className="login-button" type="submit">
					Login
				</button>
				<Link to="/register" className="signup-link">
					Sign up
				</Link>
			</form>
		</>
	);
}
