import { useContext } from "react";
import { UserContext } from "../../context/userContext";

//TODO: make this look nice and add more functionality
function Dashboard() {
	const { user } = useContext(UserContext);
	return (
		<>
			<div>Dashboard</div>
			{!!user && <h2>Hi {user.name}!</h2>}
		</>
	);
}

export default Dashboard;
