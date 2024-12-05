import Header from "../components/Header/Header";
import AccountPreferences from "../components/AccountPreferences/AccountPreferences";
import Security from "../components/Signin&Security/Security";
import { useState } from "react";
import "../Styles/Settings.css";

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
			<div className="settingsPageContainer">
				<Header />
				<div className="settingsCardContainer">
					<div className="settingsPageNavBar">
					<h1 className="navBarTitle">Settings</h1>
						<button
							 className={`navBarRedirectionContainer ${currentCard === "account-preferences" ? "active" : ""}`}
							onClick={() => handleNavigation("account-preferences")}
						>
							<div className="navBarRedirectionName">Account Preferences</div>
						</button>
						<button
							 className={`navBarRedirectionContainer ${currentCard === "sign-in-security" ? "active" : ""}`}
							onClick={() => handleNavigation("sign-in-security")}
						>
							<div className="navBarRedirectionName">Sign In & Security</div>
						</button>
					</div>
					<div className="settingsMainCard">
						<div>{renderCard()}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Settings;
