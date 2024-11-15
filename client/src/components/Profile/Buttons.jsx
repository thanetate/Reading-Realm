import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { logoutUserAtom } from "../../atoms/testAtom";

function Buttons() {
	//logout function inside of Atoms
	const [, logoutUser] = useAtom(logoutUserAtom);

	//navigation for the settings page
	const navigate = useNavigate();
	const handleMoreClick = () => {
		navigate("/dashboard/settings");
	};

	//logout btn
	const handleLogout = () => {
		console.log("logging out...");
		logoutUser();
		navigate("/login");
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
