"use client";

// React/Next.js components
import Head from 'next/head';

// Layout component (to be shared across all pages)
import Layout from './../MainLayout';

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

// Additional pages and components
// import {CarparkTable} from "./carparkInformation/carparkTable"
import "./index.css";
// import { CarparkList } from "./CarparkList";

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

import Papa from 'papaparse';

// Google API
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
const API_KEY = globalThis.NEXT_PUBLIC_GMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GMAPS_API_KEY as string);

export default function Home() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(-1);
  
  const queryParameters = new URLSearchParams(window.location.search)
  useEffect(() => {
    fetch("./names.csv")
      .then(response => response.text())
      .then(responseText => {
        const parsedData = Papa.parse(responseText);
        setData(parsedData.data);
        
        const foundIndex = parsedData.data.findIndex(x => x[0] === queryParameters.get("id"));
        setIndex(foundIndex);

        console.log(queryParameters.get("id"),foundIndex, parsedData.data);
      });
  }, []);

  // todo: fetch this particular carpark info from somewherw??!?!
  const carparkID = queryParameters.get("id")
  const carparkInfo = index !== -1 ? data[index] : null;
  const carparkAddr = carparkInfo ? carparkInfo[1] : "N/A"; 
  const availLots = 0 //Need to extract this
  const carparkType = carparkInfo ? carparkInfo[4] : "Unknown"; 
  const freeParking = carparkInfo ? carparkInfo[7] : false;
  const nightParking = carparkInfo ? carparkInfo[8] : false; 
  const shortTerm = carparkInfo ? carparkInfo[5] : "N/A"; 
  const gantryHeight = carparkInfo ? carparkInfo[10] : "Loading"; 

  // convert fromt SG latitude longitude to global system
  const lati = carparkInfo ? parseFloat(carparkInfo[2]) :1.3521
  const long = carparkInfo ? parseFloat(carparkInfo[3]) :103.8198
  //console.log(lati,long)

  // todo: actually save in a local database
  const [saved, setSaved] = useState(() => {
    const localValue = localStorage.getItem("SAVED")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })
  useEffect(() => {
    localStorage.setItem("SAVED", JSON.stringify(saved))
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
  const DMap = () => (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '70vw', height: '80vh' }}
        defaultCenter={{ lat: lati, lng: long }}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}>
        {/* simple marker */}
        <Marker
          position={{ lat: lati, lng: long }}
          clickable={true}
          onClick={() => alert('marker was clicked!')}
          title={'clickable google.maps.Marker'}
        />
      </Map>
    </APIProvider>
  );

  return (
    <Layout>
      <Head>
        <title>Voew</title>
      </Head>

      <div className="rounded-md object-contain">
        <DMap />
      </div>

      <div className="card text-black">
        <p><b>{carparkID}</b></p>
        <p>{carparkAddr}</p>
        <p>{API_KEY}</p>
        <p>{availLots} available lots</p>
        <p>Carpark type: {carparkType}</p>
        <p>Short term: {shortTerm}</p>
        <p>Gantry height: {gantryHeight}</p>
        <p>Free Parking: {freeParking}</p>

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
    </Layout>
  );
}