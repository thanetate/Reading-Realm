import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Login() {

	const { setUser } = useContext(UserContext);

	//navigate
	const navigate = useNavigate();
	//state to hold email and password input values
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	//handles login page
	const loginUser = async (e) => {
		//prevents default form submit
		e.preventDefault();
		//destruct's the name email and password
		const { email, password } = data;
		try {
			//sends a POST request to the /login endpoint
			const res = await axios.post("/login", {
				email,
				password,
			});
			//toast error
			if (res.data.error) {
				toast.error(data.error);
			} else {
				console.log('Login response', res.data);
				//clear the form data
				setData({});
				setUser(res.data.user);
				navigate("/dashboard");
			}
		} catch (error) {
			//display toast error
			toast.error("An error occurred during registration.");
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
};
