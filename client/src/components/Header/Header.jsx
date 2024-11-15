import { Link, useNavigate } from "react-router-dom";
import Books from "../Book/Book";

function Header() {

	const navigate = useNavigate();
	const handleReadingList = () => {
		navigate("/reading-list");
	};

	return (
		<>
			<div className="header">
				<div className="logo">
					<Link to="/">
						<img src="/icons/Reading Realm Logo Copy.png" alt="logo" />
					</Link>
				</div>
				<Books />
				<button className="reading-list-header-btn" onClick={handleReadingList}>Reading Lists</button>
			</div>
		</>
	);
}

export default Header;
