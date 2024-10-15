"use client";

// React/Next.js components
import Head from 'next/head';
import Layout from "./../MainLayout";

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

// Additional pages
import { FilterList } from "./FilterList";
import "./index.css";
// import { CarparkList } from "./CarparkList";

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

export default function Home() {

  // todo: actually filters carpark entries
  // [available, freeParking, nightParking, type[], gantryHeight, OpenTime[]]
  const [filters, setFilters] = useState([0, 0, 0, [], 0, 0])


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
        <title>Search</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* <ReactSearchKit>
          <SearchBar />
        </ReactSearchKit> */}

        <FilterList filters={filters} setFilters={setFilters} />

        <h1 className="header">Search result</h1>
        {/* <CarparkList carparkList={saved} filters={filters}></CarparkList> */}
      </main>
    </Layout>
  );
}