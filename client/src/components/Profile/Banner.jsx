import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import Modal from "../IconModal/IconModal";
import { useNavigate} from 'react-router-dom';
 
function Banner() {

    //TODO: move all of this into actions

    const { user, updateUser } = useContext(UserContext);
    //navigation for the settings page
	const navigate = useNavigate();
	//state that manages input value
	const [background, setBackground] = useState(user ? user.background : "");
    //handles input changes
	const handleBackgroundChange = (url) => setBackground(url);
    //handle form submissions
	const handleSubmit = (e) => {
		//prevent default form submission behavior
		e.preventDefault();
		//check if user object already exists and has a valid id
		if (user && user._id) {
			//create an object with the new details
			const newDetails = { background };
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
				{background && (
					<img src={background} alt="Background Image" className="background" />
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
					<button className="modal-update-btn" onClick={handleSubmit}>
						Update
					</button>
				</div>
			</Modal>
		</>
	);
}

export default Banner;