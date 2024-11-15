import "../Styles/Dashboard.css";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { LoginWrapper } from "./LoginWrapper";
import Profile from "../components/Profile/Profile";
//import ReadingGoalsProfilePage from "../components/Profile/ReadingGoalsProfilePage";

function Dashboard() {
	const { user, localStorageUser } = useUser();

	console.log("User:", user);
	console.log("LS User:", localStorageUser);

	return (
		<LoginWrapper>
			<div className="user-section">
				<Link to="/">
					<button>
						<img src="/icons/user-line.svg" alt="user icon" />
					</button>
				</Link>
			</div>
			<Profile />
			{/* <ReadingGoalsProfilePage /> */}
		</LoginWrapper>
	);
}

export default Dashboard;
