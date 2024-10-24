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
      <main className="bg-white flex-col items-center justify-between text-black">
      <h1 style={{fontSize: '40px'}}><b>Our Team - Alphabetical Order</b></h1>
      <div style={{fontSize: '20px'}}>
        <p><a href="https://github.com/alanlelmn">1. Alan Lee Leman</a></p>
        <p><a href="https://github.com/lermean">2. Cheo Ler Min</a></p>
        <p><a href="https://github.com/faybeez">3. Faybeata</a></p>
        <p><a href="https://github.com/GabrielLim01">4. Lim Qing En Gabriel</a></p>
        <p><a href="https://github.com/Lervinnnn">5. Quek Jun Jie Lervin</a></p>
        <p><a href="https://github.com/sentheta">6. Vannes Wijaya</a></p>
      </div>

      
      </main >
    </Layout>
  );
}