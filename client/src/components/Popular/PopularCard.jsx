
import { useNavigate } from 'react-router-dom';
// import '../../styles/PopularCard.css';

//change this
const PopularCard = (props) => {
    // useNavigate hook to navigate to the individual book page
    const navigate = useNavigate();
    const bookIMG = `https://books.google.com/books/publisher/content/images/frontcover/${encodeURIComponent(
		props.id
	)}?fife=w450-h650&source=gbs_api`;
    // Navigate to the individual book page
    const handleClick = () => {
        const volumeID = props.id;
        console.log(volumeID); // debug
        navigate(`/book/${volumeID}`, { state: { bookId: volumeID } });
    };

    return (
        <div>
            <div className="popular-book-card-container"> 
                <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <div className="popular-book-img">
                        <img src={bookIMG || "./icons/NO_COVER.jpeg"} alt={props.title || "No Title Available"} 
                            style= { { 
                                width: 'auto',
                                height: '200px',
                                borderRadius: '5px'
                             }}/>
                    </div>
                </div>
                
                <div className="popular-book-desc">
                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                        <h2 className="popular-book-title">{props.title || "No Title Available"}</h2>
                        <h3 className="popular-book-author">by {props.author || "No Author Available"}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularCard;