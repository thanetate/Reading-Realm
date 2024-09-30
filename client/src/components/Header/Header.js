import React from 'react';
import Books from '../Books/Books.js';
import Profile from '../Profile/Profile.js';

/* This is the overall structure for the header
        App.js
            \
        Header Component (with Profile Icon)
                \
            Profile Component 
                   \
                calls Login or renders the users profile info
*/

//active is a var, setActive is a func that stores a value inside of active
function Header({ active, setActive }) {

    //this is the logic for what should be rendered when the icon is clicked
    //so if profilepage is being displayed then when you click icon -> homepage
    //but if homepage is being displayed when you click icon -> profile page
    const handleProfileClick = () => {
        if (active === "Profilepage") {
            setActive("Homepage");
        } else {
            setActive("Profilepage");
        }
    };

    return (
        <div className='header'>
            <nav className='user-section'>
                {/* This is the profile icon which is a button */}
                <button onClick={handleProfileClick}>
                    <img src='/icons/user-line.svg' alt='user icon' />
                </button>
            </nav>
            {/* This is the search bar */}
            <Books />
            {/* This is the rendering the profile component when user clicks icon*/}
            {active === "Profilepage" && <Profile title="Profile Page" setActive={setActive} />}
        </div>
    );
};

export default Header;
