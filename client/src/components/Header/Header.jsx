import { Link } from "react-router-dom";
import Books from "../Book/Book";

function Header() {

	return (
		<>
		{/* Import fas fa-book icon */}
		<link
  			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  			rel="stylesheet"/>

			<div className="header">
				<div className="logo">
					<Link to="/">
						<img src="/icons/Reading Realm Logo Copy.png" alt="logo" />
					</Link>
				</div>
				<div className="small-logo">
					<Link to="/">
						<img src="/icons/RR_Logo_Small.png" alt="logo" />
					</Link>
				</div>
				<Books />
				<div className="user-section">
				<Link to="/dashboard">
					<button>
						<img src="/icons/user-line.svg" alt="user icon" />
					</button>
				</Link>
			</div>
			</div>
		</>
	);
}

export default Header;
