import Header from "../Header/Header";
import { fetchPosts } from "../../store/actions";
import Banner from "./Banner";
import Avatar from "./Avatar";
import { Posts } from "../Posts/Posts";
import Description from "./Description";
import Connections from "./Connections";
import Buttons from "./Buttons";

function Profile() {
	return (
		<div className="d-page">
			<Header />
			{/* Button using atoms to get posts */}
			<button className="updatepostsbtn" onClick={() => {fetchPosts();}}>UPDATE POSTS</button>
			<div className="d-card-container">
				<div className="d-card-main"> {/* Main profile card */}
					<Banner />
					<Avatar />
					<Description />
					<Connections />
					<Buttons />
				</div>
				{/* TODO: MOVE THIS TO DASH PAGE */}
				<Posts /> {/* Posts card */}
			</div>
		</div>
	);
}

export default Profile;
