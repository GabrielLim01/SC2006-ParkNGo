"use client";

// React/Next.js components
import Head from 'next/head';

// Main layout
import Layout from "../MainLayout";

// Model
import {fetchCarparkAvailability, fetchCarparkData, CarparkData, CarparkInfo} from '../search/PageModel';


import React, { useState, useEffect, Suspense } from 'react';

const CarparkTable = React.lazy(() => import('./carparkTable'));

//controller
function Carpark() {
  const [data, setData] = useState<CarparkData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const currentDate = new Date();

  const [carparkInfo, setCarparkInfo] = useState<CarparkInfo[]>(()=>{
    const localValue = localStorage.getItem("full")
    if (localValue == null) return []
    return JSON.parse(localValue)
  });

//saves new carparkInfo to localstorage when carparkInfo changes
  useEffect(()=>{
    localStorage.setItem("full", JSON.stringify(carparkInfo))
  },[carparkInfo])

  //getting carpark availability 
  useEffect(() => {
    fetchCarparkAvailability(setData, setLoading, setError);
  }, []);

  //fetch carpark details
  useEffect(() => {
    fetchCarparkData(setCarparkInfo, setLoading, setError, currentDate);
  }, [currentDate]);

  //checking if data has been received (alternative flows for error, still loading, or no data)
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  //View
  return (
    <Layout>
      <Head>
        <title>Carpark Information</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Suspense fallback={<div>Loading...</div>}>
          <CarparkTable data={data} carparkInfo={carparkInfo} />
        </Suspense>
      </main>
    </Layout>
  );
}

export default Carpark;