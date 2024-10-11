"use client";

// Flowbite components
import Image from "next/image";
import { Navbar } from "flowbite-react";

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

// Additional pages
import {FilterList} from "./FilterList"
import "./index.css"
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
          <Navbar.Link href="/search" active>Search</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          {/* <Navbar.Link href="/navbars">Contact</Navbar.Link> */}
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
    </div>
  );
}