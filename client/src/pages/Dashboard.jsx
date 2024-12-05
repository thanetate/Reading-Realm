import "../Styles/Dashboard.css";
import { useUser } from "../hooks/useUser";
import { LoginWrapper } from "./LoginWrapper";
import Profile from "../components/Profile/Profile";
import ReadingGoalsProfilePage from "../components/Profile/ReadingGoalsProfilePage";
import ReadingList from "../components/ReadingList/ReadingList";
import Header from "../components/Header/Header";

function Dashboard() {
	const { user, localStorageUser } = useUser();

	console.log("User:", user);
	console.log("LS User:", localStorageUser);

	return (
		<div className="dash">
			<LoginWrapper>
				<Header />
				<div className="dashboard">
					<div className="dashboard-left">
						<Profile />
					</div>
					<div className="dashboard-right">
						<ReadingGoalsProfilePage />
						<ReadingList />
					</div>
				</div>
			</LoginWrapper>
		</div>
	);
}

export default Dashboard;
