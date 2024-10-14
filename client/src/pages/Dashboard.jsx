import Profile from "../components/Profile/Profile";
import { Link } from "react-router-dom";

function Dashboard() {
	return (
		<>
			<Profile/>
			<div className="user-section">
       			 <Link to="/">
            		<button>
              			<img src="/icons/user-line.svg" alt="user icon" />
            		</button>
        		</Link>
     		 </div>
		</>
	);
}

export default Dashboard;
