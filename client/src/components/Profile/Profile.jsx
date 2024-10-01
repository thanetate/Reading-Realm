import { useEffect } from "react";
import Login from "./Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from 'gapi-script';
import PropTypes from "prop-types";

//this is our profile page
//either renders profile info TODO!!
//or renders login google button 
const Profile = ({ title }) => {

    const clientId = "idgoeshere.com"; // UPDATE THIS!!

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        }
        gapi.load('client:auth2', start);
    }, [clientId]);

    return (
        <div className="card-container">
            <div className="profile-card">
                <p className="card-title">{title}</p>
                <div className="card-login">
                    <GoogleOAuthProvider clientId={clientId}>
                        <Login />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Profile;
