import Modal from "../IconModal/IconModal"
import { useContext, useState} from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

function AccountPreferences() {

	//access user information inside of context
	const { user, updateUser } = useContext(UserContext);
	console.log("User object:", user);

	//state that manages input values
	const[shortdesc, setShortDesc] = useState(user ? user.shortdesc : "");
	const[longdesc, setLongDesc] = useState(user ? user.longdesc : "");
	const[avatar, setAvatar] = useState(user ? user.avatar : "");
	const[firstname, setFirstName] = useState(user ? user.firstname : "");
	const[lastname, setLastName] = useState(user ? user.lastname : "");

	//handle input changes
	const handleShortDescChange = (e) => setShortDesc(e.target.value);
	const handleLongDescChange = (e) => setLongDesc(e.target.value);
	const handleAvatarChange = (url) => setAvatar(url);
	const handleFirstChange = (e) => setFirstName(e.target.value);
	const handleLastChange = (e) => setLastName(e.target.value);

	//handle form submission
	const handleSubmit = (e) => {
		//prevent default form submission behavior
		e.preventDefault();
		//check if user object already exists and has a valid id
		if (user && user._id) {
			//create an object with the new details
			const newDetails = { shortdesc, longdesc, avatar, firstname, lastname};
			//log new details for error handling
			console.log("Submitting new details:", newDetails);
			//call the update user function
			updateUser(user._id, newDetails);
			//TODO: add some sort of loading spinner
			//for now lets just redirect them to dashboard
			navigate("/dashboard");
		} else {
			console.error("User ID is not available");
		}
	};

	//cancel button navigates to dashboard
	const navigate = useNavigate();
	const handleCancel = () => {
		navigate("/dashboard");
	};

	//modal
	const [showModal, setShowModal] = useState(false);
	const handleOpenModal = () => {
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<button className="nav-container">
				<div className="nav-img">
					<img src="/icons/profile.svg" alt="profile icon" />
				</div>
				<div className="nav-name">Account Preferences</div>
			</button>
			<div className="profile-pic">
				{/* Calls avatar and bc avatar is set to a url we can just src the url */}
				{avatar && <img src={avatar} alt="User Avatar" />}
			</div>
			<button className="middle-change-btn" onClick={handleOpenModal}>
				<img src="/icons/img.svg" alt="picture icon" />
				Change
			</button>
			<button className="middle-remove-btn" onClick={() => setAvatar("")}>
				<img src="/icons/trash.svg" alt="trash icon" />
				Remove
			</button>
			<div className="spacer"></div>
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
			<div className="middle-cancel-btn" onClick={handleCancel}>
				Cancel
			</div>
			<div className="middle-update-btn" onClick={handleSubmit}>
				Update
			</div>

			<div className="middle-des-title">Description</div>
			<textarea
				className="middle-des-box"
				value={longdesc}
				onChange={handleLongDescChange}
			></textarea>

			{/* This is here so that its rendered when the page is rendered*/}
			<Modal show={showModal} onClose={handleCloseModal}>
				<div className="icons-container">
					<button onClick={() => handleAvatarChange("/icons/icon1.svg")}>
						<img
							className="profile-pic"
							src="/icons/icon1.svg"
							alt="Avatar 1"
						/>
					</button>
					<button onClick={() => handleAvatarChange("/icons/icon2.svg")}>
						<img
							className="profile-pic"
							src="/icons/icon2.svg"
							alt="Avatar 2"
						/>
					</button>
					<button onClick={() => handleAvatarChange("/icons/icon3.svg")}>
						<img
							className="profile-pic"
							src="/icons/icon3.svg"
							alt="Avatar 3"
						/>
					</button>
					<button onClick={() => handleAvatarChange("/icons/icon4.svg")}>
						<img
							className="profile-pic"
							src="/icons/icon4.svg"
							alt="Avatar 4"
						/>
					</button>
				</div>
				<div className="icons-container">
					<button onClick={() => handleAvatarChange("/icons/icon5.svg")}>
						<img
							className="profile-pic"
							src="/icons/icon5.svg"
							alt="Avatar 5"
						/>
					</button>
					<button onClick={() => handleAvatarChange("/icons/icon6.svg")}>
						<img
							className="profile-pic"
							src="/icons/icon6.svg"
							alt="Avatar 6"
						/>
					</button>
					<button onClick={() => handleAvatarChange("/icons/icon7.svg")}>
						<img
							className="profile-pic"
							src="/icons/icon7.svg"
							alt="Avatar 7"
						/>
					</button>
					<button onClick={() => handleAvatarChange("/icons/icon8.svg")}>
						<img
							className="profile-pic"
							src="/icons/icon8.svg"
							alt="Avatar 8"
						/>
					</button>
				</div>
				<div className="modal-btn-wrapper">
					<button className="modal-cancel-btn" onClick={handleCloseModal}>
						Cancel
					</button>
					<button className="modal-update-btn" onClick={handleCloseModal}>Update</button>
				</div>
			</Modal>
		</div>
	);
}

export default AccountPreferences
