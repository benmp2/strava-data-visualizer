import React from 'react'
import StravaAuthButton from '../auth/StravaAuthButton';
import './Home.css';
// import '../../Strava-Logo.png';
import logo from '../../images/Strava-Logo.png';

function Home() {
    return (
        <div className="main_div" >
            <div className="welcomeSign">
                <img src={logo} alt="Strava bike logo" />
            </div>
            <div className="stravaButton">
                <StravaAuthButton/>
            </div>
            
        </div>
    )
}


export default Home;
