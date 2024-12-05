import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { testAtom } from "../../atoms/testAtom";
import "./ReadingList.css";

function ReadingList() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [user] = useAtom(testAtom);

    useEffect(() => {
        if (user && user._id) {
            const fetchFavorites = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/books/list/${user._id}/favorites`
                    );
                    setFavorites(response.data);
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            };
            fetchFavorites();
        }
    }, [user]);

    const handleReadingList = () => {
        navigate("/reading-list");
    };

    return (
        <div className="bookshelf">
        <div className="bookshelfContainer">
            <h1>Bookshelf</h1>
            <div className="bookshelfScroll">
                {favorites.length > 0 ? (
                    <div className="bookshelfBooks">
                        {favorites.map((book) => (
                            <div key={book.id} className="bookshelfBook">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="bookshelfCover"
                                />
                                <span className="bookshelfBookTitle">{book.title}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="bookshelfNoFavorites">No favorites yet</p>
                )}
            </div>
            <div className="navigateContainer">
					<button className="navigateToReadingGoalsPage" onClick={handleReadingList}>
						Reading List Page
					</button>
				</div>
        </div>
        </div>
    );
}

export default ReadingList;




