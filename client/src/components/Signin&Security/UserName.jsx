import { testAtom } from "../../atoms/testAtom";
import { useAtom } from "jotai";
import { updateUserAtom } from "../../atoms/testAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { atom } from "jotai";

// Define an atom to store the username
const usernameAtom = atom(localStorage.getItem("username") || "");

function UserName() {
	//this atom calls the details in the user object
	const [user] = useAtom(testAtom);
	//this atom is used to update info about the user
	const [, updateUser] = useAtom(updateUserAtom);
	//local state to store the username
	const [username, setUsername] = useAtom(usernameAtom);
	//for navigating to dashboard
	const navigate = useNavigate();

	//update local storage whenever the username changes
	useEffect(() => {
		localStorage.setItem("username", username);
	}, [username]);

	// Handle username change and store it in local storage
	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	// Submit the updated username to the database
	const handleSubmit = () => {
		if (user) {
			const updatedUserDetails = { name: username };
			console.log("Updating user with ID:", user._id);
			updateUser({ userId: user._id, newDetails: updatedUserDetails });
		}
		navigate("/dashboard");
	};
	//cancel button
	const handleCancel = () => {
		navigate("/dashboard");
	};

	return (
		<>
			<div className="settingsDescriptionTitle">User name</div>
			<input
				className="settingsDescriptionInput"
				value={username}
				onChange={handleUsernameChange}
			/>
			<div className="settingsDescriptionButtonsContainer">
				<div className="settingsSecurityCancel" onClick={handleCancel}>
					Cancel
				</div>
				<div className="settingsSecurityUpdate" onClick={handleSubmit}>
					Update
				</div>
			</div>
		</>
	);
}

export default UserName;
