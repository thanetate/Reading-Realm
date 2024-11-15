import { useState } from "react";
import Modal from "../IconModal/IconModal";
import { useAtom } from "jotai";
import { testAtom } from "../../atoms/testAtom";
import { updateUserAtom } from "../../atoms/testAtom";

function Banner() {
	//this atom calls the details in the user object
	const [user] = useAtom(testAtom);
	//this atom is used to update info about the user
	const [, updateUser] = useAtom(updateUserAtom);

	//calls the function that updates the background change to the db
	const handleBackgroundChange = (url) => {
		if (user) {
			const updatedUserDetails = { background: url };
			console.log("Updating user with ID:", user._id);
			updateUser({ userId: user._id, newDetails: updatedUserDetails });
		}
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
		<>
			<div className="main-banner">
				{user.background && (
					<img
						src={user.background}
						alt="Background Image"
						className="background"
					/>
				)}
				<button className="icon-container" onClick={handleOpenModal}>
					<img src="./icons/gear.svg" alt="Gear Icon" />
				</button>
			</div>

			{/* TODO: Make this a for loop */}
			<Modal show={showModal} onClose={handleCloseModal}>
				<div className="background-container">
					<button
						onClick={() => handleBackgroundChange("/icons/background-1.png")}
					>
						<img
							className="background-img"
							src="/icons/background-1.png"
							alt="Background 1"
						/>
					</button>
					<button
						onClick={() => handleBackgroundChange("/icons/background-2.png")}
					>
						<img
							className="background-img"
							src="/icons/background-2.png"
							alt="Background 2"
						/>
					</button>
					<button
						onClick={() => handleBackgroundChange("/icons/background-3.png")}
					>
						<img
							className="background-img"
							src="/icons/background-3.png"
							alt="Background 3"
						/>
					</button>
					<button
						onClick={() => handleBackgroundChange("/icons/background-5.png")}
					>
						<img
							className="background-img"
							src="/icons/background-5.png"
							alt="Background 4"
						/>
					</button>
				</div>
				<div className="background-container">
					<button
						onClick={() => handleBackgroundChange("/icons/background-6.png")}
					>
						<img
							className="background-img"
							src="/icons/background-6.png"
							alt="Background 5"
						/>
					</button>
					<button
						onClick={() => handleBackgroundChange("/icons/background-7.png")}
					>
						<img
							className="background-img"
							src="/icons/background-7.png"
							alt="Background 6"
						/>
					</button>
					<button
						onClick={() => handleBackgroundChange("/icons/background-8.png")}
					>
						<img
							className="background-img"
							src="/icons/background-8.png"
							alt="Background 7"
						/>
					</button>
					<button
						onClick={() => handleBackgroundChange("/icons/background-9.png")}
					>
						<img
							className="background-img"
							src="/icons/background-9.png"
							alt="Background 8"
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

export default Banner;
