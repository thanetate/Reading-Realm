import { useAtom } from "jotai";
import Avatar from "./Avatar";
import Descriptions from "./Descriptions";
import { testAtom } from "../../atoms/testAtom";

function AccountPreferences() {
	//this gets the users profile from the atom
	const [user] = useAtom(testAtom);

	//console.log to see atom object on account preferences component
	console.log("Account Preferences object:", user);

	return (
		<div>
			<button className="cardTitle">
				<div className="cardTitleImg">
					<img src="/icons/profile.svg" alt="profile icon" />
				</div>
				<h1>Account Preferences</h1>
			</button>
			<Avatar />
			<Descriptions />
		</div>
	);
}

export default AccountPreferences;
