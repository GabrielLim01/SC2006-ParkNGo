"use client";

// React/Next.js components
import Head from 'next/head';
import Image from "next/image";

// Layout component (to be shared across all pages)
import Layout from './/layout';

// Flowbite components
import { Navbar } from "flowbite-react";
// import type { CustomFlowbiteTheme } from "flowbite-react";

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

// Additional pages
import { CarparkItem } from "./CarparkItem";

import "./index.css"

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

// const customTheme: CustomFlowbiteTheme["navbar"] = {
//   color: {
//     primary: linear-gradient(180deg, rgba(2,0,.6,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
//   },
// };

export default function Dashboard() {

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
          <Navbar.Link href="/navbars" active>
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-4" >Home</h1>
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-4" >About</h1>
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-8" >Map</h1></Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main className="bg-white flex min-h-screen flex-col items-center justify-between text-black p-8">

        {/* <ReactSearchKit>
          <SearchBar />
        </ReactSearchKit> */}

        <h1 className="header">Saved Carpark</h1>
        {saved.length === 0 && "No saved carpark"}
        <div className="card-container">
          {saved.map(item => {
            return <CarparkItem id={item.id} address={item.address} availLots={item.availLots} />
          })}
          {/* sample carparks */}
          <CarparkItem id="NNDN321" address="Nanyang Drive" availLots={192} />
          <CarparkItem id="NNDN321" address="Nanyang Drive" availLots={192} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
        </div>
        <h1 className="header">Nearby Carpark</h1>
      </main>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Layout>
  );
}