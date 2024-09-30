import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

//this is our profile page when user has NOT logged in yet.
//TODO: somehow signal that the user has logged in
const Login = () => {

    //unit tests can be expanded later on
    const onSuccess = (credentialResponse) => {
        console.log("Login Success! Current user: ", credentialResponse);
    };
    const onFailure = (error) => {
        console.log("Login Failed! Error: ", error);
    };

    return (
        <div className='signInButton'>
            <GoogleLogin
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default Login;
