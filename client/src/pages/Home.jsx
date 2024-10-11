import Header from "../components/Header/Header";
import Recommendations from "../components/Recommendations/Recommendations"; // Import Recommendations
import Footer from "../components/Footer/Footer"
import UserRecommendations from "../components/Recommendations/UserRecommendations";

function Home() {
  return (
    <>
    <div>
      <Header />
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

