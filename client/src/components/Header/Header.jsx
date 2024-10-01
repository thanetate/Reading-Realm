import { Link } from "react-router-dom";
import Books from "../Book/Book"

function Header() {

    return (
    <>
       <div className="header">
            <div className="user-section">
                <Link to="/profile">
                    <button>
                        <img src='/icons/user-line.svg' alt='user icon'/>
                    </button>
                </Link>
            </div>
            <Books/>
       </div>
    </>
    );
};

export default Header;