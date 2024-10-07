import { Link } from "react-router-dom";
import Books from "../Book/Book";

function Header() {
	return (
		<>
			<div className="header">
				{/* Logo Icon */}
				<div className="logo">
					<Link to="/">
						<img src="/icons/Reading Realm Logo Copy.png" alt="logo" />
					</Link>
				</div>

				{/* Profile Icon */}
				<div className="user-section">
					<Link to="/">
						<button>
							<img src="/icons/user-line.svg" alt="user icon" />
						</button>
					</Link>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
					<Link to="/dashboard">Dashboard</Link>
				</div>
				<Books />
			</div>
		</>
	);
}

export default Header;
