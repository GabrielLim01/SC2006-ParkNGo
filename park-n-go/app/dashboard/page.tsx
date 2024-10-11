"use client";

// Flowbite components
import Image from "next/image";
import { Navbar } from "flowbite-react";

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

// Additional pages
import { CarparkItem } from "./CarparkItem";

import "./index.css"

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

export default function Home() {

  // todo: actually save in a local database
  const [saved, setSaved] = useState([])
  // add and delete a carpark information into the list
  // function addSaved(id, address, xCoord, yCoord, cpType, shortTermParking, freeParking, nightParking, gantryHeight, availLots) {
  //   setSaved(currentSaved => {
  //     return [
  //       ...currentSaved,
  //       { id, address, xCoord, yCoord, cpType, shortTermParking, freeParking, nightParking, gantryHeight, availLots }
  //     ]
  //   })
  // }
  // function deleteSaved(id) {
  //   setSaved(currentSaved => {
  //     return currentSaved.filter(item => item.id !== id)
  //   })
  // }

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand>
          <img
            src="/ParkNGo_Icon.png"
            className="mr-3 h-6 sm:h-9"
            alt="ParkNGo Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ParkNGo
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/navbars" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">About</Navbar.Link>
          <Navbar.Link href="/navbars">Services</Navbar.Link>
          <Navbar.Link href="/navbars">Pricing</Navbar.Link>
          <Navbar.Link href="/navbars">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        {/* <ReactSearchKit>
          <SearchBar />
        </ReactSearchKit> */}

        <h1 className="header">Saved Carpark</h1>
        {saved.length === 0 && "No saved carpark"}
        <div className="card-container">
          {saved.map(item => {
              return <CarparkItem id={item.id} address={item.address} availLots={item.availLots}/>
          })}
          {/* sample carparks */}
          <CarparkItem id="NNDN321" address="Nanyang Drive" availLots={192}/>
          <CarparkItem id="NNDN321" address="Nanyang Drive" availLots={192}/>
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23}/>
        </div>

        
        <h1 className="header">Nearby Carpark</h1>



      </main>
    </div>
  );
}