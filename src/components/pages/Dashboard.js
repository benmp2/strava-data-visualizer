import React from 'react'

export default function Dashboard() {
    
    const clientId = "49565";
    const clientSecret = '1022e1f8b0e685d6c033a6d2b3528f1201f4dcd8';

    // const [tokensState,setStateTokens] = useState({access_token : '',refresh_token : ''});
    // const access_token = tokensState.access_token;

    function getQueryVariable(){

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const tempAccessCode = params.get('code');
        const scopes = params.get('scope')
        
        return {'code':tempAccessCode,'scope':scopes};

    };

    async function getTokenForAuthScope (accessCode){

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

        const response = await fetch(token_url, requestOptions);
        const data = await response.json();
        console.log('FROM AUTHORIZATION',data);
        
        // 
        ///* REFRESH TOKEN */
        // 
        const requestOptions_refresh = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'client_id' : clientId,
                                  'client_secret' : clientSecret,
                                  'refresh_token': data.refresh_token,
                                  'grant_type':'refresh_token' 
                                 })
        };

        const res_ref = await fetch(token_url, requestOptions_refresh);
        const data_refresh = await res_ref.json();
        console.log("RESULT FROM REFRESHING TOKEN:",data_refresh);
        console.log('the refreshed token',data_refresh.access_token);

    };

    // function refreshAccessToken(response){
       
    //     // console.log('response:' , response);
    //     response.then(data => console.log(data));
    //     const refreshToken = response.refresh_token;

    //     console.log('inside refresh func, refresh token is: ')
    //     console.log(refreshToken)

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({'client_id' : clientId,
    //                               'client_secret' : clientSecret,
    //                               'refresh_token': refreshToken,
    //                               'grant_type':'refresh_token' 
    //                              })
    //     }

    //     const token_url = 'https://www.strava.com/oauth/token';

    //     fetch(token_url, requestOptions)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("RESULT FROM REFRESHING TOKEN:")
    //             console.log(data);
    //             // newTokens.accessToken = data.access_token;
    //             // newTokens.refreshToken = data.refresh_token;
    //             // newTokens.expires_in = data.expires_in;
    //         });
        
        
    //     // console.log('INSIDE ',response.json())
    //     // return response.json();        
    // };


    const queryVariables = getQueryVariable();
    
    getTokenForAuthScope(queryVariables.code);

    // refreshAccessToken(getTokenForAuthScope(queryVariables.code));

    // let currTokens = getTokenForAuthScope(queryVariables.code);


    // console.log('OUTSIDE:  ',currTokens);


    return (
        <div>
            <h1> Dashboard </h1>
            <h1> query string goes below:</h1>
            <h1>{queryVariables.code}</h1>
            <h1>{queryVariables.scope}</h1>
            <h1>{queryVariables.scope}</h1>
        </div>
    )
}
