import { useAtom } from "jotai";
import { testAtom, updateUserAtom } from "../../atoms/testAtom";
import { atom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define an atom to store the username
const firstnameAtom = atom(localStorage.getItem("firstname") || "");
const lastnameAtom = atom(localStorage.getItem("lastname") || "");
const shortdescAtom = atom(localStorage.getItem("shortdesc") || "");
const longdescAtom = atom(localStorage.getItem("longdesc") || "");

function Descriptions() {
	//this atom calls the details in the user object 
	const [user] = useAtom(testAtom);
	//this atom is used to update info about the user
	const [, updateUser] = useAtom(updateUserAtom);
	//navigation
	const navigate = useNavigate();

	//local state to store the values
	const [firstname, setFirstName] = useAtom(firstnameAtom);
	const [lastname, setLastName] = useAtom(lastnameAtom);
	const [shortdesc, setShortDesc] = useAtom(shortdescAtom);
	const [longdesc, setLongDesc] = useAtom(longdescAtom);

	//update local storage whenever the username changes
	useEffect(() => {
		localStorage.setItem("firstname", firstname);
		localStorage.setItem("lastname", lastname);
		localStorage.setItem("shortdesc", shortdesc);
		localStorage.setItem("longdesc", longdesc);
	}, [firstname, lastname, shortdesc, longdesc]);

	// Handle changes and store it in local storage
	const handleFirstChange = (e) => {
        setFirstName(e.target.value);
    };
	const handleLastChange = (e) => {
        setLastName(e.target.value);
    };
	const handleShortDescChange = (e) => {
        setShortDesc(e.target.value);
    };
	const handleLongDescChange = (e) => {
        setLongDesc(e.target.value);
    };

	// Submit the updated username to the database
	const handleSubmit = () => {
		if (user) {
			const updatedUserDetails = { firstname: firstname, lastname: lastname, shortdesc: shortdesc, longdesc: longdesc};
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
			<div className="middle-username-title">First Name</div>
			<input
				className="middle-username-box"
				value={firstname}
				onChange={handleFirstChange}
			/>
			<div className="middle-username-title">Last Name</div>
			<input
				className="middle-username-box"
				value={lastname}
				onChange={handleLastChange}
			/>
			<div className="middle-username-title">Current position</div>
			<input
				className="middle-username-box"
				value={shortdesc}
				onChange={handleShortDescChange}
			/>

			<div className="middle-des-title">Description</div>
			<textarea
				className="middle-des-box"
				value={longdesc}
				onChange={handleLongDescChange}
			></textarea>
			
			<div className="middle-cancel-btn" onClick={handleCancel}>
				Cancel
			</div>
			<div className="middle-update-btn" onClick={handleSubmit} >
				Update
			</div>
		</>
	);
}

export default Descriptions;
