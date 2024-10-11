"use client";

import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface CarparkInfo {
  car_park_no: string;
  address: string;
  car_park_type: string;
  type_of_parking_system: string;
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
  const [carparkInfo, setCarparkInfo] = useState<CarparkInfo[]>([]);
<<<<<<< Updated upstream
  const [loading, setLoading] = useState(false);
=======
  //const csvData = require('./names.csv');

  //console.log(csvData);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    const csvData = Papa.parse("/names.csv", {
=======
    Papa.parse("./names.csv", {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  }, []);
=======
  });
>>>>>>> Stashed changes

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
    <div>
      <h1>Carpark Availability</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CarparkTable data={data} carparkInfo={carparkInfo} />
      </Suspense>
    </div>
  );
}

export default Carpark;