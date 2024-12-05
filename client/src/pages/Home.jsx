import "../Styles/Homepage.css";
import { useUser } from "../hooks/useUser";
import Header from "../components/Header/Header";
import HomePost from "../components/Posts/HomePosts";
import Popular from "../components/Popular/Popular";
import Feed from "../components/Feed/Feed";

function Home() {
	const { user } = useUser();
	console.log("User Information:", user);

	return (
		<div className="home">
			<Header />
			<div className="homepage">
				<div className="homepage-left">
					<HomePost />
					<Feed />
				</div>
				<div className="homepage-right">
					<Popular />
				</div>
				{/* TODO: Make Footer */}
			</div>
		</div>
	);
}

export default Home;
