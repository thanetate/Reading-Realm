import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import Books from "../Book/Book";

function Header() {
	const { user } = useContext(UserContext);

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
				{user ? (
					<Link to="/dashboard">
						<button>
							<img src="/icons/user-line.svg" alt="user icon" />
						</button>
					</Link>
				) : (
					<Link to="/login">
						<button>
							<img src="/icons/user-line.svg" alt="user icon" />
						</button>
					</Link>
				)}
				</div>
				<Books />
			</div>
		</>
	);
}

export default Header;
