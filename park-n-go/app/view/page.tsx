"use client";

// React/Next.js components
import Head from 'next/head';

// Layout component (to be shared across all pages)
import Layout from './../MainLayout';

// Bootstrap components
import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';

import "./index.css";

// ReactSearchKit component
// import { ReactSearchKit, SearchBar } from 'react-searchkit';

// Google API
import { AdvancedMarker, APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
const API_KEY = globalThis.NEXT_PUBLIC_GMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GMAPS_API_KEY as string);

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




export default function Home() {
  const [data, setData] = useState<CarparkData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // saved carpark by user
  const [saved, setSaved] = useState(() => {
    const localValue = localStorage.getItem("saved")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })
  useEffect(()=>{
    localStorage.setItem("saved", JSON.stringify(saved))
  }, [saved])
  function addSaved(id) {
    setSaved(currentSaved => {return [...currentSaved, id]})
  }
  function deleteSaved(id) {
    setSaved(currentSaved => {return currentSaved.filter(item => item !== id)})
  }

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

  // Example usage:
  // const resultWGS = SVYtoWGS(33758.4143,	33695.5198);

  // carpark info in cache
  const [carparkInfo, setCarparkInfo] = useState<CarparkInfo[]>(()=>{
    const localValue = localStorage.getItem("full")
    if (localValue == null) return []
    return JSON.parse(localValue)
  });
  useEffect(()=>{
    localStorage.setItem("full", JSON.stringify(carparkInfo))
  },[carparkInfo])

  // carpark availabiltiy
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

  // carpark info
  const currentDate = new Date();
  useEffect(() => {
    const localValue = localStorage.getItem("latest")
    if(localValue == currentDate.toLocaleDateString()) return;
    localStorage.setItem("latest", currentDate.toLocaleDateString())

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
  
  // find specific carpark
  const [index, setIndex] = useState(-1);
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.has("id") ? queryParameters.get("id") : "ACM";
  const carparkInf = index !== -1 ? carparkInfo[index] : null;
  
  useEffect(() => {
      const foundIndex = carparkInfo.findIndex(x => x[0] === queryParameters.get("id"));
      setIndex(foundIndex);
      console.log(queryParameters.get("id"), foundIndex, carparkInfo);
  }, [carparkInfo]);

  const location = {
    lat : carparkInf ? SVYtoWGS(carparkInf[2],carparkInf[3]).latitude : 1.3521,
    long : carparkInf ? SVYtoWGS(carparkInf[2],carparkInf[3]).longitude : 103.8198
  }
  const [position_lat, setPosition_lat] = useState(1.3521);
  const [position_long, setPosition_long] = useState(103.8198);

  //find loc - gmap
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  //find loc - gmap
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setPosition_lat(crd.latitude)
    setPosition_long(crd.longitude)
  }
  //find loc - gmap
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  //get location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
            //navigator.geolocation.getCurrentPosition((position) => {
              //setPosition_lat(position.coords.latitude)
              //setPosition_long(position.coords.longitude)
              //})
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [])

  console.log('Data State:', data);

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  //map
  const DMap = ({loc}) => (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={'bf51a910020fa25a'}
        style={{width: "100%"}}
        defaultCenter={{ lat: loc.lat, lng: loc.long }}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* simple marker */}
        <Marker
          position={{ lat: loc.lat, lng: loc.long }}
          clickable={true}
          onClick={() => alert('marker was clicked!')}
          title={'clickable google.maps.Marker'}
        />
        <AdvancedMarker
          position={{lat: position_lat, lng: position_long}}
          title={'AdvancedMarker with custom html content.'}>
          <div style={{
                width: 24,
                height: 24,
                position: 'absolute',
                top: 0,
                left: 0,
                background: '#6390ff',
                border: '5px solid #FFFFFF',
                borderRadius: '50%',
              }}>
            <div
              style={{
                opacity: 0.3,
                width: 36,
                height: 36,
                position: 'absolute',
                top: -11,
                left: -11,
                background: '#6390ff',
                borderRadius: '50%',
                zIndex: -1,
                
              }}></div>
          </div>
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );

  return (
    <Layout>
      <Head>
        <title>View</title>
      </Head>

      <div className="h-screen w-full flex flex-col lg:flex-row lg:justify-between text-wrap pt-2">
      {/* <div className="h-screen w-full flex justify-center pt-2"> */}
        <div className="w-full h-1/2 mb-4 lg:w-3/5 lg:h-4/5 lg:mb-0 items-center rounded-lg mr-8"><DMap loc={location}/></div>

        <div className="card text-black w-full h-auto lg:w-2/5 lg:h-4/5">
          {carparkInfo.map((myCarpark) => (<>
          {myCarpark.car_park_no === id && (
            <div className="font-sans-serif-3 text-wrap lg:px-4 lg:pt-4 text-sm lg:text-lg">
              <p className='text-lg lg:text-xl'><b>{myCarpark.address}</b></p>
              <p className='text-xs lg:text-sm'>{myCarpark.car_park_no}</p>
              
              <table className="w-full my-1 lg:my-4">
              {data.items[0].carpark_data.map((carpark) => (<>
                {carpark.carpark_number === id && (
                  <tr><td className='font-bold'>Availability</td><td>{carpark.carpark_info[0].lots_available} empty lots</td></tr>
                )}
              </>))}
              <tr><td className='font-bold'>Carpark Type</td><td>{myCarpark.car_park_type}</td></tr>
              <tr><td className='font-bold'>Parking System</td><td>{myCarpark.type_of_parking_system}</td></tr>
              <tr><td className='font-bold'>Gantry Height</td><td>{myCarpark.gantry_height} meters</td></tr>

              </table>
              {myCarpark.free_parking ?
                <p style={{ color: 'green' }}>Free parking allowed</p>
              : <p style={{ color: 'red' }}>No free parking</p>
              }
              {myCarpark.night_parking ?
                <p className='mb-2 lg:mb-8' style={{ color: 'green' }}>Night parking allowed</p>
              : <p className='mb-2 lg:mb-8' style={{ color: 'red' }}>No night parking</p>
              }

              {saved.includes(id) ?
                <button onClick={e => deleteSaved(id)}
                  style={{ color: 'red', backgroundColor: 'hsla(350,100%,72%,0.5)' }}
                  className="btn font-sans-serif-3 w-full lg:w-32 rounded-3xl">
                  Unsave
                </button>
                :
                <button onClick={e => addSaved(id)}
                  style={{ color: 'blue', background: 'hsl(200,100%,50%,0.5)' }}
                  className="btn font-sans-serif-3 w-full lg:w-32 rounded-3xl">
                  Save
                </button>
              }
            </div>
          )}
          </>
          
        ))}

          
      </div>

      </div>
    </Layout>
  );
}