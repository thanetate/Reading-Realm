import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

function Profile() {
    const { logout } = useContext(UserContext);

	//{!!user && <h2>Hi {user.name}!</h2>}
    return (
		<div className="dash-page">
			<div className="dash-user-section">
					<Link to="/">
						<button>
							<img src="/icons/user-line.svg" alt="user icon" />
						</button>
					</Link>
			</div>
			<div className="dash-main-card">
				<div className="card-left-long">
					<div className="profile-pic"></div>
					<div className="card-name">Billy Bob</div>
					<div className="card-shortdesc">Lover of Cats</div>
					<div className="card-quote">I opened myself to the gentle indifference of the world. ―Albert Camus, The Stranger</div>
					<div className="logout-btn">
						<button onClick={logout}>Logout</button>
					</div>
				</div>
				<div className="card-middle-container">
					<div className="card-middle-1">
						<div className="card-title">Bio</div>
						<div className="card-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero neque dignissimos nisi facilis itaque aut illo perferendis ipsa enim quia asperiores veritatis ullam saepe repellat obcaecati quibusdam dolorum, et esse?</div>
					</div>
					<div className="card-middle-2">
						<div className="card-title">Books</div>
					</div>
				</div>
				<div className="card-right-container">
					<div className="card-right-1">
						<div className="card-title">Friends</div>
					</div>
					<div className="card-right-2">
						<div className="card-title">Goals</div>
					</div>
					<div className="card-right-3">
						<div className="card-title">Links</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile
