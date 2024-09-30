import React, { useEffect } from "react";
import Login from "./Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from 'gapi-script';

//this is our profile page
//either renders profile info TODO!!
//or renders login google button 
const Profile = ({ title, setActive }) => {

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

export default Profile;
