"use client";

// React/Next.js components
import Head from 'next/head';
import Link from "next/link";

// Layout component (to be shared across all pages)
import Layout from '../MainLayout';

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

  // todo: fetch from localStorage
  // todo: Actually render each of the saved carpark item
  const [saved, setSaved] = useState([])


  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="bg-white flex min-h-screen flex-col items-center justify-between text-black p-8">
        <Link href="/dashboard/carparkInformation"><h1>View Carpark Information here</h1></Link>
        {/* <ReactSearchKit>
          <SearchBar />
        </ReactSearchKit> */}

        <h1 className="header">Saved Carpark</h1>
        {saved.length === 0 && "No saved carpark"}
        <div className="card-container">
          {saved.map(item => {
            return <CarparkItem id={item}/>
          })}

          {/* sample carparks */}
          <CarparkItem id="NNDN321" address="Nanyang Drive" availLots={192} />
          <CarparkItem id="NNDN321" address="Nanyang Drive" availLots={192} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} />
        </div >
        <div className="flex flex-col items-center justify-between p-24">
          <h1 className="header">Nearby Carpark</h1>
        </div>
      </main >
    </Layout >
  );
}