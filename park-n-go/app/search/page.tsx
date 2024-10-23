"use client";

// React/Next.js components
import Head from 'next/head';

// Main layout
import Layout from "../MainLayout";

import "./index.css";


import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface CarparkInfo {
  car_park_no: string;
  address: string;
  car_park_type: string;
  type_of_parking_system: string;
  free_parking: string;
  night_parking: string;
  car_park_basement: string;
  gantry_height: number;
}

interface CarparkData {
  items: {
    carpark_data: {
      carpark_number: string;
      carpark_info: {
        lots_available: number;
      };
    }[];
  };
}

const CarparkTable = React.lazy(() => import('./carparkTable'));

function Carpark() {
  const [data, setData] = useState<CarparkData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const [carparkInfo, setCarparkInfo] = useState<CarparkInfo[]>(()=>{
    const localValue = localStorage.getItem("full")
    if (localValue == null) return []
    return JSON.parse(localValue)
  });
  useEffect(()=>{
    localStorage.setItem("full", JSON.stringify(carparkInfo))
  },[carparkInfo])

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.data.gov.sg/v1/transport/carpark-availability',
      timeout: 10000, // Set a timeout of 10 seconds
    };

    setLoading(true);

    axios.request(options)
      .then(response => {
        console.log('API Response:', response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://data.gov.sg/api/action/datastore_search?resource_id=d_23f946fa557947f93a8043bbef41dd09',
      timeout: 10000, // Set a timeout of 10 seconds
    };

    setLoading(true);

    axios.request(options)
      .then(response => {
        console.log('API Response:', response.data);
        setCarparkInfo(response.data.result.records);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setError(error);
        setLoading(false);
      });
  }, []);
  // useEffect(() => {
  //   const csvData = Papa.parse("/names.csv", {
  //     header: true,
  //     download: true,
  //     skipEmptyLines: true,
  //     delimiter: ",",
  //     complete: (results) => {
  //       console.log("CSV Data:", results.data);
  //       setCarparkInfo(results.data);
  //     },
  //     error: (error) => {
  //       console.error("CSV Error:", error);
  //     },
  //   });
  // }, []);

  console.log('Data State:', data);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Carpark Information</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* <h1 style={{ fontSize: 45,  color: "black" }}>Carpark Availability</h1> */}
        <Suspense fallback={<div>Loading...</div>}>
          <CarparkTable data={data} carparkInfo={carparkInfo} />
        </Suspense>
      </main>
    </Layout>
  );
}

export default Carpark;