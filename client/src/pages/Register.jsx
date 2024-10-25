import { useState } from "react";
import Header from "../components/Header/Header";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//register page
export default function Register() {
	//navigate
	const navigate = useNavigate();

	//default data
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});

	//function that registers the user to the db
	const registerUser = async (e) => {
		//prevents default form submit
		e.preventDefault();
		//destruct's the name email and password
		const { name, email, password } = data;
		try {
			//sends a POST request to the /register endpoint
			const response = await axios.post("/register", {
				name,
				email,
				password,
			});
			//check if response contains an error
			if (response.data.error) {
				//display toast error
				toast.error(response.data.error);
			} else {
				//clear the form data
				setData({ name: "", email: "", password: ""});
				toast.success("Registration Success!");
				//nav to login page
				navigate("/login");
			}
		} catch (error) {
			//display toast error
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
};
