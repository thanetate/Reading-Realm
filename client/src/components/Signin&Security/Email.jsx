import { testAtom } from "../../atoms/testAtom";
import { useAtom } from "jotai";

function Email () {

    //we aren't changing the users data so no need for setUser
    const [user] = useAtom(testAtom);

    return (
        <>
            <div className="settingsSecurityEmailTitle">Email</div>
			<div className="settingsSecurityEmail">{user && <div>{user.email}</div>}</div>
        </>
    );
}

export default Email;