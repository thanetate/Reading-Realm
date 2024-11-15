import "../Styles/Homepage.css";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Header from "../components/Header/Header";
import HomePost from "../components/Posts/HomePosts";
import Popular from "../components/Popular/Popular";
import Feed from "../components/Feed/Feed";
// import Bookshelf from "../components/Bookshelf/Bookshelf";
// import Footer from "../components/Footer/Footer";

function Home() {
	const { user } = useUser();
	console.log("User Information:", user);

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
			<HomePost />
			<Feed />
			{/* <Bookshelf /> MOVE THIS TO PROFILE*/}
			<Popular />
		</div>
	);
}

export default Home;
