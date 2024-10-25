import Header from "../components/Header/Header";
// import Recommendations from "../components/Recommendations/Recommendations"; // Import Recommendations
// import Footer from "../components/Footer/Footer";
// import UserRecommendations from "../components/Recommendations/UserRecommendations";
import { Link } from "react-router-dom";
import HomePost from "../components/Posts/HomePosts";
import '../Styles/Homepage.css';
/* <Recommendations />
<UserRecommendations />
	<Footer />
*/

function Home() {
	return (
		<div className="homepage">
				<Header />
				<div className="user-section">
					<Link to="/dashboard">
						<button>
							<img src="/icons/user-line.svg" alt="user icon" />
						</button>
					</Link>
				</div>
				{/*
					<Post />
					<Feed />
					<Bookshelf />
					<Popular />
				*/}
				<HomePost />
		</div>
	);
}

export default Home;
