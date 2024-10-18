"use client";

// React/Next.js components
import Head from 'next/head';

// Layout component (to be shared across all pages)
import Layout from './../MainLayout';

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';

// Additional pages and components
// import {CarparkTable} from "./carparkInformation/carparkTable"
import "./index.css";
// import { CarparkList } from "./CarparkList";

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

// Google API
import { AdvancedMarker, APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
const API_KEY = globalThis.NEXT_PUBLIC_GMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GMAPS_API_KEY as string);



export default function Home() {

  // todo: fetch this particular carpark info from somewherw??!?!
  const carparkID = "NNDN"
  const carparkAddr = "Nanyang Drive"
  const availLots = 192
  const carparkType = "MULTI-STOREY"
  const freeParking = true
  const nightParking = false
  const shortTerm = "7AM-10.30PM"
  const gantryHeight = 4.50

  const location = {
    lat : 1.3521,
    long : 103.8198
  }
  //state
  const [position_lat, setPosition_lat] = useState(1.3521);
  const [position_long, setPosition_long] = useState(103.8198);

  // todo: actually save in a local database
  const [saved, setSaved] = useState(() => {
    const localValue = localStorage.getItem("SAVED")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  //find loc - gmap
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  //find loc - gmap
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setPosition_lat(crd.latitude)
    setPosition_long(crd.longitude)
  }
  //find loc - gmap
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    localStorage.setItem("SAVED", JSON.stringify(saved))
    
    //get location
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
            //navigator.geolocation.getCurrentPosition((position) => {
              //setPosition_lat(position.coords.latitude)
              //setPosition_long(position.coords.longitude)
              //})
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [saved])


  // add a carpark information into the list
  function addSaved(id) {
    setSaved(currentSaved => {
      return [...currentSaved, id]
    })
  }
  function deleteSaved(id) {
    setSaved(currentSaved => {
      return currentSaved.filter(item => item !== id)
    })
  }

  //map
  const DMap = ({loc}) => (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={'bf51a910020fa25a'}
        //style={{ width: '70vw', height: '80vh' , alignItems:"center"}}
        defaultCenter={{ lat: loc.lat, lng: loc.long }}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* simple marker */}
        <Marker
          position={{ lat: loc.lat, lng: loc.long }}
          clickable={true}
          onClick={() => alert('marker was clicked!')}
          title={'clickable google.maps.Marker'}
        />
        <AdvancedMarker
          position={{lat: position_lat, lng: position_long}}
          title={'AdvancedMarker with custom html content.'}>
          <div style={{
                width: 24,
                height: 24,
                position: 'absolute',
                top: 0,
                left: 0,
                background: '#6390ff',
                border: '5px solid #FFFFFF',
                borderRadius: '50%',
              }}>
            <div
              style={{
                opacity: 0.3,
                width: 36,
                height: 36,
                position: 'absolute',
                top: -11,
                left: -11,
                background: '#6390ff',
                borderRadius: '50%',
                zIndex: -1,
                
              }}></div>
          </div>


        </AdvancedMarker>
      </Map>
      
    </APIProvider>
  );

  return (
    <Layout>
      <Head>
        <title>View</title>

      </Head>

      <div className="h-screen flex justify-center pt-10">
        <div className='w-1/2 h-4/5 items-center rounded-lg mr-8'><DMap loc={location}/></div>

        <div className="card text-black w-1/3 h-4/5">
          <p><b>{carparkID}</b></p>
          <p>{carparkAddr}</p>
          <p>{availLots} available lots</p>
          <p>Carpark type: {carparkType}</p>
          <p>Short term: {shortTerm}</p>
          <p>Gantry height: {gantryHeight}m</p>

          {freeParking ?
            <p style={{ color: 'green' }}>Free parking allowed</p>
            :
            <p style={{ color: 'red' }}>No free parking</p>
          }

          {nightParking ?
            <p style={{ color: 'green' }}>Night parking allowed</p>
            :
            <p style={{ color: 'red' }}>No night parking</p>
          }

          {/* {true? */}
          {saved.includes(carparkID) ?
            <button onClick={e => deleteSaved(carparkID)}
              style={{ color: 'red', backgroundColor: 'hsla(350,100%,72%,0.5)' }}
              className="btn">
              Unsave
            </button>
            :
            <button onClick={e => addSaved(carparkID)}
              style={{ color: 'blue', background: 'hsl(200,100%,50%,0.5)' }}
              className="btn">
              Save
            </button>
          }
        </div>

      </div>
    </Layout>
  );
}