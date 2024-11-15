import { useAtom } from "jotai";
import { testAtom } from "../../atoms/testAtom";

function Description() {
	//doesn't change any data so no need for setUser
	const [user] = useAtom(testAtom);

	return (
		<>
			<div className="main-desc-container">
				<div className="main-name">{user.name || "No name provided"}</div>
				<div className="main-title">
					{user.shortdesc || "No description provided"}
				</div>
				<div className="main-desc">
					{user.longdesc || "No description provided"}
				</div>
			</div>
		</>
	);
}

export default Description;
