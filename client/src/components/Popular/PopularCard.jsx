
import { useNavigate } from 'react-router-dom';
import '../../styles/PopularCard.css';

//change this
const PopularCard = (props) => {
    // useNavigate hook to navigate to the individual book page
    const navigate = useNavigate();
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
                        <img src={props.image} alt={props.title} />
                    </div>
                </div>
                
                <div className="popular-book-desc">
                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                        <h2 className="popular-book-title">{props.title}</h2>
                        <h3 className="popular-book-author">by {props.author}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularCard;