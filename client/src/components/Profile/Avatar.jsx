import { useContext } from "react";
import { UserContext } from "../../../context/userContext";


function Avatar() {

    //get user info from atom
   const {user} = useContext(UserContext);

	return (
		<>
			<div className="main-profile-pic">
				{user.avatar && <img src={user.avatar} alt="User Avatar" />}
			</div>
		</>
	);
}

export default Avatar;
