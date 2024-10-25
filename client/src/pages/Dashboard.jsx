import Profile from "../components/Profile/Profile";
import { Link } from "react-router-dom";
import { LoginWrapper } from "./LoginWrapper";
import { People } from "../components/People/People";
import ReadingGoalsProfilePage from "../components/Profile/ReadingGoalsProfilePage";
import '../Styles/Dashboard.css'; // Adjust the path as needed

function Dashboard() {
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
			<People />
			{/* TODO: add Posts here */}

			<div className="d-card-bottom-right">
				<div className="bottom-right-title">Reading Goals</div>
				<div className="d-readingGoal">
					<ReadingGoalsProfilePage />
				</div>
			</div>
		</LoginWrapper>
	);
}

export default Dashboard;
