import { useState } from "react";
import Header from "../components/Header/Header";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();

	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});

	// const registerUser = async (e) => {
	// 	e.preventDefault();
	// 	const { name, email, password } = data;
	// 	try {
	// 		const { data } = await axios.post("/register", {
	// 			name,
	// 			email,
	// 			password,
	// 		});
	// 		if (data.error) {
	// 			toast.error(toast.error);
	// 		} else {
	// 			setData({});
	// 			toast.success("Login Success!");
	// 			navigate("/login");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error during registration:", error);
	// 		toast.error("Registration failed. Please try again.");
	// 	}
	// };
	const registerUser = async (e) => {
		e.preventDefault();
		const { name, email, password } = data;
		try {
			const response = await axios.post("/register", {
				name,
				email,
				password,
			});
			if (response.data.error) {
				toast.error(response.data.error);
			} else {
				setData({ name: "", email: "", password: "" });
				toast.success("Registration Success!");
				navigate("/login");
			}
		} catch (error) {
			toast.error("An error occurred during registration.");
			console.error(error);
		}
	};

	return (
		<>
			<Header />
			<form className="register-form" onSubmit={registerUser}>
				<label className="register-label">Name</label>
				<input
					className="register-input-name"
					type="text"
					placeholder="enter name..."
					value={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				<label className="register-label">Email</label>
				<input
					className="register-input-email"
					type="email"
					placeholder="enter email..."
					value={data.email}
					onChange={(e) => setData({ ...data, email: e.target.value })}
				/>
				<label className="register-label">Password</label>
				<input
					className="register-input-password"
					type="password"
					placeholder="enter password..."
					value={data.password}
					onChange={(e) => setData({ ...data, password: e.target.value })}
				/>
				<button className="register-button" type="submit">
					Submit
				</button>
			</form>
		</>
	);
}
