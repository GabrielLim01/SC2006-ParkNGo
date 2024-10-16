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
// import "./index.css"

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

// const customTheme: CustomFlowbiteTheme["navbar"] = {
//   color: {
//     primary: linear-gradient(180deg, rgba(2,0,.6,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
//   },
// };

export default function Dashboard() {

  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <main className="bg-white min-h-screen flex-col items-center justify-between text-black">

      <h1 style={{fontSize: '30px'}}><b>About ParkNGo</b></h1>
      <p>
        ParkNGo is your go-to app for making parking stress-free and simple. Whether you're heading to a busy city center or exploring a new place, ParkNGo is designed to help drivers plan their trips and easily find available parking spots—saving both time and hassle.
      </p>
      
      <h1 style={{fontSize: '30px'}}><b>Our Mission</b></h1>
      At ParkNGo, our mission is to provide a seamless way for people to plan their trips by offering real-time parking availability and personalized carpark recommendations. No more endless circling or worrying about finding a spot—just park and go!

      <h1 style={{fontSize: '30px'}}><b>Who We Serve</b></h1>
      ParkNGo is built for the general public, especially drivers who want a more efficient way to find parking in urban areas or during busy times. Whether you’re commuting, running errands, or exploring a new city, ParkNGo is here to make parking one less thing to worry about.

      <h1 style={{fontSize: '30px'}}><b>Key Features</b></h1>
      Real-Time Parking Availability: Get live updates on parking spaces near your destination.
      Carpark Recommendations: ParkNGo suggests nearby carparks based on your location, making it easier for you to find the best spot.

      <h1 style={{fontSize: '30px'}}><b>Meet the Team</b></h1>
      ParkNGo is a project developed by <b>SC2006 SCS5 Group 11</b>, a team of undergraduate students passionate about solving everyday problems with innovative tech solutions. We're working hard to make parking more convenient for everyone, and we're excited to share our journey with you.

      </main >
    </Layout>
  );
}