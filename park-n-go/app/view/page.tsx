"use client";

// React/Next.js components
import Head from 'next/head';
import Image from "next/image";

// Layout component (to be shared across all pages)
import Layout from './Layout';

// Flowbite components
import { Navbar } from "flowbite-react";

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

// Additional pages and components
// import {CarparkTable} from "./carparkInformation/carparkTable"
import "./index.css";
// import { CarparkList } from "./CarparkList";

// import NavBar as component
import TopNavBar from "./TopNavBar";

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

//Google API
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
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
  // convert fromt SG latitude longitude to global system
  const lati = 1.3521
  const long = 103.8198

  // todo: actually save in a local database
  const [saved, setSaved] = useState(() => {
    const localValue = localStorage.getItem("SAVED")
    if(localValue==null) return []
    return JSON.parse(localValue)
  })
  useEffect(() => {
    localStorage.setItem("SAVED", JSON.stringify(saved))
  }, [saved])


  // add a carpark information into the list
  function addSaved(id){
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
        style={{width: '70vw', height: '80vh'}}
        defaultCenter={{lat: lati, lng: long}}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}>
        {/* simple marker */}
        <Marker
          position={{lat: lati, lng: long}}
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
        <title>Dashboard</title>
      </Head>
      <Navbar fluid rounded className="bg-gradient-to-b from-blue-900 to-blue-600">

        <Image
          src="/images/ParkNGo_Icon.png"
          height={100}
          width={100}
          alt="ParkNGo Logo"
        />
        <span className="text-left text-3xl font-semibold dark:text-white">
          <h1>ParkNGo</h1>
          <h2 className="text-base">A carpark locator application</h2>
        </span>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/dashboard" active>
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-4" >Home</h1>
          </Navbar.Link>
          <Navbar.Link href="/search">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-4" >Search</h1>
          </Navbar.Link>
          <Navbar.Link href="/about">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-4" >About</h1>
          </Navbar.Link>
          <Navbar.Link href="/contact">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-8" >Contact</h1>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <div className="rounded-md object-contain">
        <DMap/>
      </div>

        <div className="card text-black">
          <p><b>{carparkID}</b></p>
          <p>{carparkAddr}</p>
          <p>{API_KEY}</p>
          <p>{availLots} available lots</p>
          <p>Carpark type: {carparkType}</p>
          <p>Short term: {shortTerm}</p>
          <p>Gantry height: {gantryHeight}m</p>
          
          {freeParking ? 
            <p style={{color:'green'}}>Free parking allowed</p>
            :
            <p style={{color:'red'}}>No free parking</p>
          }

          {nightParking ? 
            <p style={{color:'green'}}>Night parking allowed</p>
            :
            <p style={{color:'red'}}>No night parking</p>
          }

          {/* {true? */}
          {saved.includes(carparkID)?
            <button onClick={e=>deleteSaved(carparkID)}
                    style={{color:'red', backgroundColor:'hsla(350,100%,72%,0.5)'}}
                    className="btn">
              Unsave
            </button>
            :
            <button onClick={e=>addSaved(carparkID)}
                    style={{color:'blue', background:'hsl(200,100%,50%,0.5)'}}
                    className="btn">
              Save
            </button>
          }
          

        </div>

    </Layout>
  );
}