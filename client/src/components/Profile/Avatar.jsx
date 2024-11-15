import { testAtom } from "../../atoms/testAtom";
import { useAtom } from "jotai";

function Avatar() {
	//passing userAtom object as initial state
	const [user] = useAtom(testAtom);


	return (
		<>
			<div className="main-profile-pic">
				{user.avatar && <img src={user.avatar} alt="User Avatar" />}
			</div>
		</>
	);
}

export default Avatar;
