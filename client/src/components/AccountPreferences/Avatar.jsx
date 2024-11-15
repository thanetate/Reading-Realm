import { useAtom } from "jotai";
import Modal from "../IconModal/IconModal";
import { useState } from "react";
import { testAtom } from "../../atoms/testAtom";
import { updateUserAtom } from "../../atoms/testAtom";
import { useEffect } from "react";

function Avatar() {
	//this atom calls the details in the user object
	const [user, setUser] = useAtom(testAtom);
	//this atom is used to update info about the user
	const [, updateUser] = useAtom(updateUserAtom);

	//calls the function that updates the avatar change to the db
	const handleAvatarChange = (url) => {
		if (user) {
			const updatedUserDetails = { avatar: url };
			console.log("Updating user with ID:", user._id);
			updateUser({ userId: user._id, newDetails: updatedUserDetails });

			//update the user object in local storage
			const updatedUser = { ...user, avatar: url };
			localStorage.setItem("user", JSON.stringify(updatedUser));
			setUser(updatedUser); //update the atom state
		}
	};

	//load the avatar URL from local storage when the component mounts
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setUser(parsedUser);
		}
	}, [setUser]);

	//TODO; change useState to useAtom
	//modal
	const [showModal, setShowModal] = useState(false);
	const handleOpenModal = () => {
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className="profile-pic">
				{/* Calls avatar and bc avatar is set to a url we can just src the url */}
				{user?.avatar && <img src={user.avatar} alt="User Avatar" />}
			</div>
			<button className="middle-change-btn" onClick={handleOpenModal}>
				<img src="/icons/img.svg" alt="picture icon" />
				Change
			</button>
			<button className="middle-remove-btn">
				{/* onClick={() => setAvatar("")} */}
				<img src="/icons/trash.svg" alt="trash icon" />
				Remove
			</button>
			{/* TODO: make this a for loop */}
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
					<button className="modal-update-btn" onClick={handleCloseModal}>
						Update
					</button>
				</div>
			</Modal>
		</>
	);
}

export default Avatar;
