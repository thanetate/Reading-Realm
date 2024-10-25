import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

function Buttons() {
	
    const {logout} = useContext(UserContext);

    //navigation for the settings page
	const navigate = useNavigate();
	const handleMoreClick = () => {
		navigate("/dashboard/settings");
	};

	//logout btn
	const handleLogout = () => {
		console.log("logging out...");
		//logout function already redirects you to login page
		logout();
	};
    
    
    return (
		<>
			<button className="logout" onClick={handleLogout}>
				Log out
			</button>
			<button className="more" onClick={handleMoreClick}>
				... More
			</button>
		</>
	);
}

export default Buttons;
