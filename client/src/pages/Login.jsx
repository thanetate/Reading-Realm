import { useAtom } from "jotai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../components/Header/Header";
import { testAtom } from "../atoms/testAtom";

export default function Login() {
	//access the userAtom to set user state upon successful login
	const [, setUser] = useAtom(testAtom);
	
	//navigation
	const navigate = useNavigate();

	//local state to handle form inputs
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	//handle login form submission
	const loginUser = async (e) => {
		e.preventDefault();
		const { email, password } = data;

		try {
			//sends POST request to /login endpoint
			const res = await axios.post("/login", { email, password });

			if (res.data.error) {
				toast.error(res.data.error);
			} else {
				console.log("Login response", res.data);
				setData({ email: "", password: "" });

				//update the userAtom with the logged-in user data
				setUser(res.data.user);

				navigate("/dashboard");
			}
		} catch (error) {
			toast.error("An error occurred during login.");
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


