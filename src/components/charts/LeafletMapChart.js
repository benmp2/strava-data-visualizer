import React,{useEffect, useRef } from 'react';
import L from 'leaflet';
import './LeafletMapChart.css'
import 'leaflet/dist/leaflet.css';

var polyUtil = require('polyline-encoded');

function LeafletMapChart(props) {
    
    // const [lines,setState] = useState();

    const mapbox_access_token ='pk.eyJ1IjoiYmVubXAiLCJhIjoiY2tiYzV3Znk0MDgzazJycDlyZml4NnhydiJ9.xSmsaTdqgXpAiANSzALUpA';
    const tilelayerURL = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=${mapbox_access_token}`
    const mapRef = useRef(null);
    
    useEffect(()=>{
        mapRef.current =  L.map('leafletmap').setView([47.5, 19.0],12);
        L.tileLayer(
            tilelayerURL,{
                attributionControl:true,
                zoomControl:true,
                doubleClickZoom:true,
                scrollWheelZoom:true,
                dragging:true,
                animate:true,
                easeLinearity:0.35
            }).addTo(mapRef.current);
    },[])


    useEffect(()=>{
        // console.log('leaflet props',props.dataObject)

        // let map = 

        for(let i=0;i<props.dataObject.length; i++){
            
            var encodedLine = props.dataObject[i].map.summary_polyline;
            if (!encodedLine) {
                console.log('no polyline for activity: ',i); 
                continue;
            }

            // fromEncoded is from var polyUtil = require('polyline-encoded');
            var decodedLineInCoords = L.Polyline.fromEncoded(encodedLine).getLatLngs();
            L.polyline(
                decodedLineInCoords,{
                    color:'red',
                    weight:3,
                    opacity:.7,
                    lineJoin:'round'
            }).addTo(mapRef.current);

            // console.log('decoded polyline',i);
            
        }

    },[props.dataObject])
    

    return (
        //this also works without css:
        // <div id="leafletmap" style={{ height: "100vh", width: "100vw" }} ></div>
        <div id="leafletmap"></div>
    )
};

export default LeafletMapChart;
