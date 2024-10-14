import Header from "../components/Header/Header";
import Recommendations from "../components/Recommendations/Recommendations"; // Import Recommendations
import Footer from "../components/Footer/Footer"
import UserRecommendations from "../components/Recommendations/UserRecommendations";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
    <div>
      <Header />
      <div className="user-section">
        <Link to="/dashboard">
            <button>
              <img src="/icons/user-line.svg" alt="user icon" />
            </button>
        </Link>
      </div>
      <div>
        {/* Home Page */}
      </div>
      <div>
        <Recommendations />
        <UserRecommendations />
      </div>
      <Footer/>
      </div>
    </>
  );
}

export default Home;

