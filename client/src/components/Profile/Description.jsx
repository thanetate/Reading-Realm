import { useContext } from "react";
import { UserContext } from "../../../context/userContext";


function Description() {

    const {user} = useContext(UserContext);

    console.log("Rendering profile", user);

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
