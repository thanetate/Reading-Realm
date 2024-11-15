import Title from "./Title";
import UserName from "./UserName";
import Email from "./Email";
import Password from "./Password";
import { testAtom } from "../../atoms/testAtom";
import { useAtom } from "jotai";

function Security() {
	//this atom calls the details in the user object
	const [user] = useAtom(testAtom);

	//to see what user info is
	console.log("Test Atom object:", user);


	return (
		<div className="security">
			<Title />
			{/* Get rid of this */}
			<div className="spacer"></div>
			<UserName />
			<Email />
			<Password />
		</div>
	);
}

export default Security;
