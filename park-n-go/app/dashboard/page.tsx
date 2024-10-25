"use client";

// React/Next.js components
import Head from 'next/head';
import Link from "next/link";

// Layout component (to be shared across all pages)
import Layout from '../MainLayout';

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState, Suspense } from "react";

// Additional pages
import { CarparkItem } from "./CarparkItem";
import "./index.css"


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


export default function Dashboard() {

  const [saved, setSaved] = useState(() => {
    const storedValue = localStorage.getItem("saved");
    return storedValue ? JSON.parse(storedValue) : ["ACB", "ACM", "AK19"];
  })

  const [data, setData] = useState<CarparkData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // todo: add timestamp to refetch data when it is older than 1 week
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

  const currentDate = new Date();
  useEffect(() => {
    const localValue = localStorage.getItem("latest")
    if(localValue == currentDate.toLocaleDateString()) return;
    localStorage.setItem("latest", currentDate.toLocaleDateString())

    const options = {
      method: 'GET',
      url: 'https://data.gov.sg/api/action/datastore_search?resource_id=d_23f946fa557947f93a8043bbef41dd09&limit=3000',
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

  // return <div>
  //   <pre>{JSON.stringify(carparkInfo)}</pre>
  // </div>

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="bg-white flex-col items-center justify-between text-black text-wrap">
        {/* <Link href="/dashboard/carparkInformation"><h1>View Carpark Information here</h1></Link> */}

        <h1 className="text-3xl pt-8">Saved Carparks</h1>
        <div className="card-container">
          {saved.map(item => {
            return <CarparkItem id={item} data={data} carparkInfo={carparkInfo}/>
          })}
        </div >

        {/* saved.length === 0 && "No saved carpark" */}

        <h1 className="text-3xl pt-8">Nearby Carparks</h1>
        <div className="card-container">
          {/* {saved.map(item => {
            return <CarparkItem id={item}/>
          })} */}
        </div >
      </main >
    </Layout>
  );
}