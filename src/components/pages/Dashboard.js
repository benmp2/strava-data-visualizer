import React,{useState,useEffect} from 'react'
import LeafletMapChart from '../charts/LeafletMapChart';
import './Dashboard.css';
// const stravaApi = require('strava-v3');

export default function Dashboard() {
    
    const clientId = "49565";
    const clientSecret = '1022e1f8b0e685d6c033a6d2b3528f1201f4dcd8';
    
    const [tokenState_arr,setState] = useState({access_token : 'fake',refresh_token : '',expires_in:'' });
    const [tokenState,setStateToken] = useState('');
    const [refreshTokenState,setStateRefreshToken] = useState('');
    const [chartData,SetChartData] = useState('');

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        // var year = a.getFullYear();
        // var month = months[a.getMonth()];
        // var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = /*date + ' ' + month + ' ' + year + ' ' +*/ hour + ':' + min + ':' + sec ;
        return time;
      }

    function getQueryVariable(){

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const tempAccessCode = params.get('code');
        const scopes = params.get('scope')

        return {'code':tempAccessCode,'scope':scopes};

    };


    async function getAccessTokenAndRefresh (accessCode){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'client_id' : clientId,
                                  'client_secret' : clientSecret,
                                  'code': accessCode,
                                  'grant_type':'authorization_code' 
                                 })
        }

        const token_url = 'https://www.strava.com/oauth/token';

        const response = await fetch(token_url, requestOptions)
        const data = await response.json()
        
        console.log('FROM AUTHORIZATION',data.access_token);
        
        setStateToken(data.access_token);
        setStateRefreshToken(data.refresh_token);

        setState(prevState => {
            return { ...prevState,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    expires_in: timeConverter(data.expires_in) }
        }); 
        
        return data
    };


    async function refreshToken(data){
        // ///* REFRESH TOKEN */
        // // 
        const token_url = 'https://www.strava.com/oauth/token';
        const requestOptions_refresh = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'client_id' : clientId,
                                  'client_secret' : clientSecret,
                                  'refresh_token': data.refresh_token,
                                  'grant_type':'refresh_token' 
                                 })
        };
        // console.log('test: refreshTokenState ',refreshTokenState);
        const res_ref = await fetch(token_url, requestOptions_refresh);
        const data_refresh = await res_ref.json();


        setState(prevState => {
            return { ...prevState,
                    access_token: data_refresh.access_token,
                    refresh_token: data_refresh.refresh_token,
                    expires_in: timeConverter(data_refresh.expires_in) }
        } )

        return data_refresh
    };

    function getActivities(res){
    
        const activities_url = `https://www.strava.com/api/v3/athlete/activities?per_page=150`
        console.log('get activities token from func', res.access_token);

        const requestOptions_act = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${res.access_token}`},
            // params: {'per_page':'150'}
        };
        console.log('fetch act params: ',requestOptions_act)
        fetch(activities_url, requestOptions_act)
            .then(res => res.json())
            .then(data_act=> {
                console.log('activities data:',data_act);
                console.log('activities test data:',data_act[0].average_speed);
                SetChartData(data_act);
            })

    };

    
    const queryVariables = getQueryVariable();

    useEffect(() =>{
        
        // TODO load refresh token if available!
        

        getAccessTokenAndRefresh(queryVariables.code)
            .then(res => refreshToken(res))
            .then(res => getActivities(res)) //)
            .then(()=>window.history.replaceState({}, document.title, "/dashboard"));
    
        // console.log('useEffect finished')
        // getStravaData();
    },[]);

    
    
    return (
        <div className="leafletMain_div">
            {/* <h1></h1> */}
            <h1> Dashboard </h1>
            {/* <h1> query string goes below:</h1>
            <h1>{queryVariables.code}</h1>
            <h1>{queryVariables.scope}</h1>
            <h1> access token: {tokenState} </h1>
            <h1> refresh token: {refreshTokenState} </h1>
            <h1> 
                access token arr: {tokenState_arr.access_token} <br/>
                refresh token: {tokenState_arr.refresh_token} <br/>
                expires in: {tokenState_arr.expires_in} </h1>
            <h1 className='test'>The refreshed acces token is: {tokenState_arr.access_token}</h1> */}
            <LeafletMapChart dataObject={chartData}/>
            <h1> 000 1</h1>
        </div>
    )
}
