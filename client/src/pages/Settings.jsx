import Header from "../components/Header/Header";
import AccountPreferences from "../components/AccountPreferences/AccountPreferences";
import Security from "../components/Signin&Security/Security";
import { Link } from "react-router-dom";
import { useState } from "react";

function Settings() {
	//i am single page rendering for the different tabs in settings
	const [currentCard, setCurrentCard] = useState("account-preferences");

	const handleNavigation = (card) => {
		setCurrentCard(card);
	};

	const renderCard = () => {
		switch (currentCard) {
			case "account-preferences":
				return <AccountPreferences />;
			case "sign-in-security":
				return <Security />;
			default:
				return <AccountPreferences />;
		}
	};

	return (
		<>
			<div className="settings-page-container">
				<Header />
				<div className="user-section">
					<Link to="/dashboard">
						<button>
							<img src="/icons/user-line.svg" alt="user icon" />
						</button>
					</Link>
				</div>
				<div className="left-nav">
					<div className="nav-title">Settings</div>
					<button
						className="nav-container"
						onClick={() => handleNavigation("account-preferences")}
					>
						<div className="nav-img">
							<img src="/icons/profile.svg" alt="profile icon" />
						</div>
						<div className="nav-name">Account Preferences</div>
					</button>
					<button
						className="nav-container"
						onClick={() => handleNavigation("sign-in-security")}
					>
						<div className="nav-img">
							<img src="/icons/security.svg" alt="security icon" />
						</div>
						<div className="nav-name">Sign in & security</div>
					</button>
				</div>
				<div className="settings-middle-container">
					<div className="settings-middle">{renderCard()}</div>
				</div>
			</div>
		</>
	);
}

export default Settings;
