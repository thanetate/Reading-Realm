import Banner from "./Banner";
import Avatar from "./Avatar";
import { Posts } from "../Posts/Posts";
import Description from "./Description";
import Buttons from "./Buttons";
import "./Profile.css";

function Profile() {
	return (
		<div className="dashboardPageContainer">
			<div className="dashboardCardContainer">
				<div className="dashboardCardMain">
					<Banner />
					<Avatar />
					<Description />
					<Buttons />
				</div>
				<Posts />
			</div>
		</div>
	);
}

export default Profile;
