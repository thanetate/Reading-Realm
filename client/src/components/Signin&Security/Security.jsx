import Title from "./Title";
import UserName from "./UserName";
import Email from "./Email";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import { useState } from "react";
import Password from "./Password";

function Security() {
	//move these into Actions folder
	//access user information inside of context
	const { user, updateUser } = useContext(UserContext);
	console.log("User object:", user);

	// State that manages input values
	const [name, setName] = useState(user ? user.name : "");

	//handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (user && user._id) {
			//create an object with the new details
			const newDetails = { name };
			//log new details for error handling
			console.log("Submitting new details:", newDetails); // Add logging
			//call the update user function
			updateUser(user._id, newDetails);
			//TODO: add some sort of loading spinner
			//for now we will just redirect to dashboard
			navigate("/dashboard");
		} else {
			console.error("User ID is not available");
		}
	};

	//cancel button navigates to dashboard page
	const navigate = useNavigate();
	const handleCancel = () => {
		navigate("/dashboard");
	};

	return (
		<div className="security">
			<Title />
			{/* Get rid of this */}
			<div className="spacer"></div>
			<UserName name={name} setName={setName} />
			<Email />
			<Password />
			{/* Buttons that update the db */}
			<div className="middle-cancel-btn" onClick={handleCancel}>
				Cancel
			</div>
			<div className="middle-update-btn" onClick={handleSubmit}>
				Update
			</div>
		</div>
	);
}

export default Security;
