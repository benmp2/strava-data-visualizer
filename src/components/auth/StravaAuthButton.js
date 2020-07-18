import React from 'react';
import { Button } from 'react-bootstrap';
import './StravaAuthButton.css'

function StravaAuthButton() {

    const clientId = "49565";
   
    const redirectUri = "http://localhost:3000/dashboard";
    const authUri = "https://www.strava.com/oauth/authorize?client_id=" + clientId + "&response_type=code&redirect_uri=" + redirectUri + "&approval_prompt=auto&scope=activity:read_all";


    return (
        <div>
            <div> A simple button should go below </div>
            {/* <button bsSize="large" >Sign In With Strava</button> */}
            {/* <Button bsSize="large" block href={authUri}> Sign In With Strava</Button> */}
            <a className = "strava-button" href={authUri}>
                <Button >Sign In With Strava</Button>
            </a>
            
            
        </div>
        
    )
}

export default StravaAuthButton;