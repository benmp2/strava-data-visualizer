import React from 'react'
import StravaAuthButton from '../auth/StravaAuthButton';
import './Home.css';

function Home() {
    return (
        <div className="main_div" >
            <div className="welcomeSign">
                <h1> HomePage </h1>
            </div>
            <div className="stravaButton">
                <StravaAuthButton/>
            </div>
            
        </div>
    )
}


export default Home;
