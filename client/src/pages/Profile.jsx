import { useEffect } from "react";
import Login from "../components/Header/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from 'gapi-script';
import Header from "../components/Header/Header";

function Profile() {

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
        <>
        <Header/>
        <div className="card-container">
            <div className="profile-card">
                <p className="card-title">Profile Page</p>
                <div className="card-login">
                    <GoogleOAuthProvider clientId={clientId}>
                        <Login />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;

