"use client";

// React/Next.js components
import Head from 'next/head';
import Image from "next/image";

import Layout from "./Layout";

// Flowbite components
import { Navbar } from "flowbite-react";

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

// Additional pages
import {FilterList} from "./FilterList";
import "./index.css";
// import { CarparkList } from "./CarparkList";

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

export default function Home() {

  // todo: actually filters carpark entries
  // [available, freeParking, nightParking, type[], gantryHeight, OpenTime[]]
  const [filters, setFilters] = useState([0,0,0,[],0,0])


  // add a carpark information into the list
  // function addSaved(id, address, xCoord, yCoord, cpType, shortTermParking, freeParking, nightParking, gantryHeight, availLots) {
  //   setSaved(currentSaved => {
  //     return [
  //       ...currentSaved,
  //       { id, address, xCoord, yCoord, cpType, shortTermParking, freeParking, nightParking, gantryHeight, availLots }
  //     ]
  //   })
  // }

  // delete carpark information from the list
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

      

      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        {/* <ReactSearchKit>
          <SearchBar />
        </ReactSearchKit> */}

        <FilterList filters={filters} setFilters={setFilters}/>

        <h1 className="header">Search result</h1>
        {/* <CarparkList carparkList={saved} filters={filters}></CarparkList> */}

      </main>
      
    </Layout>
  );
}