import { useContext } from "react";
import { UserContext } from "../../../context/userContext";


function Email () {

    const {user} = useContext(UserContext);

    return (
        <>
            <div className="middle-username-title">Email</div>
			<div className="email-address">{user && <div>{user.email}</div>}</div>
        </>
    );
}

export default Email;