// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../../../context/userContext";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Profile() {
	//navigating to settings page
	const navigate = useNavigate();
	
	const handleMoreClick = () => {
		navigate('/dashboard/settings');
	};

    //const { logout } = useContext(UserContext);
	//{!!user && <h2>Hi {user.name}!</h2>}
    return (
			<div className="d-page">
				<Header />
				<div className="d-card-main">
					<div className="main-banner">
						{/* Add img */}
					</div>
					<div className="main-profile-pic">
						<div className="innerlayer">{/* Add img */}</div>
					</div>
					<div className="main-desc-container">
						<div className="main-name">Tate Williams</div>
						<div className="main-title">Software Developer at Apple</div>
						<div className="main-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, rerum! Delectus veritatis ab labore in dicta ipsam officiis cum corrupti obcaecati! Nesciunt, laudantium? Itaque eligendi id nulla doloremque? Rerum, quod.</div>
						<div className="main-connections">
							<div className="followers-number">6,475</div>
							<div className="followers">followers</div>
							<div className="following-number">1,202</div>
							<div className="following">following</div>
						</div>
						<button className="more" onClick={handleMoreClick}>... More</button>
					</div>
				</div>

				{/* Update this to show dynamic users ~ for loop */}
				<div className="d-card-right">
					<div className="right-title">People</div>
					<div className="user">
						<div className="right-pic"></div>
						<div className="right-users">Billy Bob</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Joe Bob</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Michael Bob</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Bob Joe</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Bob Smith</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Bob Smith</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="showmore">
							<button>
								Show more
								<img src="/icons/downcarrot.svg" alt="down carrot" />
							</button>
						</div>
					</div>
				</div>


				<div className="d-card-post">
					<div className="post-name">Posts</div>
					<div className="post-main-container">
						<div className="post-container">
							<div className="post-img"></div>
							<div className="post-title">Title of post</div>
							<div className="post-desc">Loved this book!</div>
							<button className="post-heart"><img src="./icons/heart.svg" alt="heart icon" /></button>
						</div>
						<div className="post-container">
							<div className="post-img"></div>
							<div className="post-title">Title of post</div>
							<div className="post-desc">Loved this book!</div>
							<button className="post-heart"><img src="./icons/heart.svg" alt="heart icon" /></button>
						</div>
						<div className="post-container">
							<div className="post-img"></div>
							<div className="post-title">Title of post</div>
							<div className="post-desc">Loved this book!</div>
							<button className="post-heart"><img src="./icons/heart.svg" alt="heart icon" /></button>
						</div>
					</div>
				</div>

			</div>
	);
}

export default Profile
