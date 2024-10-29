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
  x_coord: number;
  y_coord: number;
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

  const [userLoc, setUserLoc] = useState({latitude:0, longitude:0})

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

  // return <div>
  //   <pre>{JSON.stringify(carparkInfo)}</pre>
  // </div>
  useEffect(() => {
    if (!navigator.geolocation) {
      // setError('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position:', position.coords);
        setUserLoc({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (error) => {
        // setError('Unable to retrieve your location');
      }
    );
  }, []);
  function SVYtoWGS(x, y){
    // SVY21 projection parameters
    const refLat = 1.366666, refLong = 103.833333;
    const originX = 38744.572, originY = 28001.642;    // False Easting in meters
    const k0 = 1.0;               // Scale factor
    const a = 6378137;            // Semi-major axis of WGS84 ellipsoid
    const f = 1 / 298.257223563;  // Flattening of WGS84 ellipsoid
    const e2 = 2 * f - f * f;     // Eccentricity squared
    const A0 = 1 - (e2 / 4) - (3 * e2 ** 2 / 64) - (5 * e2 ** 3 / 256);
    const A2 = (3 / 8) * (e2 + e2 ** 2 / 4 + (15 * e2 ** 3 / 128));
    const A4 = (15 / 256) * (e2 ** 2 + (3 * e2 ** 3 / 4));
    const A6 = 35 * e2 ** 3 / 3072;
    const lat0 = refLat * Math.PI / 180;
    const long0 = refLong * Math.PI / 180;
    const E = x - originY, N = y - originX;
    const M0 = a * (A0 * lat0 - A2 * Math.sin(2 * lat0) + A4 * Math.sin(4 * lat0) - A6 * Math.sin(6 * lat0));
    const M = M0 + (N / k0);
    const mu = M / (a * A0);
    const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
    const J1 = (3 / 2) * e1 - (27 / 32) * e1 ** 3;
    const J2 = (21 / 16) * e1 ** 2 - (55 / 32) * e1 ** 4;
    const J3 = (151 / 96) * e1 ** 3;
    const J4 = (1097 / 512) * e1 ** 4;
    const fp_lat = mu + J1 * Math.sin(2 * mu) + J2 * Math.sin(4 * mu) +
                  J3 * Math.sin(6 * mu) + J4 * Math.sin(8 * mu);
    const e2_prime = e2 / (1 - e2);
    const C1 = e2_prime * Math.cos(fp_lat) ** 2;
    const T1 = Math.tan(fp_lat) ** 2;
    const R1 = a * (1 - e2) / ((1 - e2 * Math.sin(fp_lat) ** 2) ** 1.5);
    const N1 = a / Math.sqrt(1 - e2 * Math.sin(fp_lat) ** 2);
    const D = E / (N1 * k0);
    const lat_rad = fp_lat - (N1 * Math.tan(fp_lat) / R1) *
                    (D ** 2 / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 ** 2 - 9 * e2_prime) * D ** 4 / 24 +
                     (61 + 90 * T1 + 298 * C1 + 45 * T1 ** 2 - 252 * e2_prime - 3 * C1 ** 2) * D ** 6 / 720);
    const long_rad = long0 + (D - (1 + 2 * T1 + C1) * D ** 3 / 6 +
                             (5 - 2 * C1 + 28 * T1 - 3 * C1 ** 2 + 8 * e2_prime + 24 * T1 ** 2) * D ** 5 / 120) /
                             Math.cos(fp_lat);
    const latitude = lat_rad * 180 / Math.PI;
    const longitude = long_rad * 180 / Math.PI;
    return { latitude, longitude };  
  }
  function WGSDist(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    // Convert degrees to radians
    const toRadians = (deg) => deg * (Math.PI / 180);
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    // Haversine formula
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

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
        {/* <div>userLoc: {userLoc.latitude}, {userLoc.longitude}</div> */}
        {/* <div>userLoc: {navigator.geolocation.getCurrentPosition().latitude}, {userLoc.longitude}</div> */}

        <h1 className="text-3xl pt-8">Nearby Carparks</h1>
        <div className="card-container">
          {carparkInfo.map(item => {
            const carparkCoord = SVYtoWGS(item.x_coord, item.y_coord)
            const dist = WGSDist(userLoc.latitude, userLoc.longitude, carparkCoord.latitude, carparkCoord.longitude)
            // return <div>dist: {dist}</div>
            if(dist > 2.0) return <></>
            return <CarparkItem id={item.car_park_no} data={data} carparkInfo={[item]}/>
          })}
        </div >
      </main >
    </Layout>
  );
}