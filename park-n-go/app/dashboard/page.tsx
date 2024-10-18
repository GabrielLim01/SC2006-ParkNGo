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
  const [carparkInfo, setCarparkInfo] = useState<CarparkInfo[]>([]);
  const [loading, setLoading] = useState(false);

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
    const csvData = Papa.parse("/names.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results) => {
        console.log("CSV Data:", results.data);
        setCarparkInfo(results.data);
      },
      error: (error) => {
        console.error("CSV Error:", error);
      },
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
      <main className="bg-white flex-col items-center justify-between text-black">
        <Link href="/dashboard/carparkInformation"><h1>View Carpark Information here</h1></Link>
        {/* <ReactSearchKit>
          <SearchBar />
        </ReactSearchKit> */}

        <h1 className="text-3xl pt-8">Saved Carparks</h1>
        <div className="card-container">
          {saved.map(item => {
            return <CarparkItem id={item} data={data} carparkInfo={carparkInfo}/>
          })}

          {/* sample carparks */}
          {/* <CarparkItem id="NNDN321" address="Nanyang Drive" availLots={192} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} /> */}
        </div >

        {/* saved.length === 0 && "No saved carpark" */}

        <h1 className="text-3xl pt-8">Nearby Carparks</h1>
        <div className="card-container">
          {/* {saved.map(item => {
            return <CarparkItem id={item}/>
          })} */}

          {/* sample carparks */}
          {/* <CarparkItem id="NNDN321" address="Nanyang Drive" availLots={192} />
          <CarparkItem id="CKCC139" address="Choa Chu Kang" availLots={23} /> */}
        </div >
      </main >
    </Layout>
  );
}