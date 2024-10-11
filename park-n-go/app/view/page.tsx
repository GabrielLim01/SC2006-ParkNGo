"use client";

// Flowbite components
import Image from "next/image";
import { Navbar } from "flowbite-react";

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

// Additional pages
// import {CarparkTable} from "./carparkInformation/carparkTable"
import "./index.css";
// import { CarparkList } from "./CarparkList";

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

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

  

  return (
    <div>
      <Navbar fluid rounded>
        <a href="/dashboard"><Navbar.Brand>
          <img
            src="/ParkNGo_Icon.png"
            className="mr-3 h-6 sm:h-9"
            alt="ParkNGo Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ParkNGo
          </span>
        </Navbar.Brand></a>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/dashboard">Home</Navbar.Link>
          <Navbar.Link href="/search">Search</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          {/* <Navbar.Link href="/navbars">Contact</Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        

        <div className="card">
          <p><b>{carparkID}</b></p>
          <p>{carparkAddr}</p>
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

      </main>
    </div>
  );
}