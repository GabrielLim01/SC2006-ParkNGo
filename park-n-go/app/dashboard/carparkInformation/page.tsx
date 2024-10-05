"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface CarparkInfo {
  carpark_number: string;
  carpark_name: string;
  carpark_location: string;
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

function Carpark() {
  const [data, setData] = useState<CarparkData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [carparkInfo, setCarparkInfo] = useState<CarparkInfo[]>([]);
  const csvData = require('./names.csv');

  console.log(csvData);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.data.gov.sg/v1/transport/carpark-availability'
    };

    axios.request(options)
      .then(response => {
        console.log('API Response:', response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('API Error:', error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    Papa.parse(csvData, {
      header: true,
      complete: function(results) {
        console.log(results.data);
        setCarparkInfo(results.data);
      }
    });
  }, [csvData]);

  console.log('Data State:', data);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Carpark Availability</h1>
      <table>
        <thead>
          <tr>
            <th>Carpark Number</th>
            <th>Availability</th>
            <th>Carpark Name</th>
            <th>Carpark Location</th>
          </tr>
        </thead>
        <tbody>
          {data.items && data.items[0] && data.items[0].carpark_data && data.items[0].carpark_data.map(carpark => (
            <tr key={carpark.carpark_number}>
              <td>{carpark.carpark_number}</td>
              <td>{carpark.carpark_info[0].lots_available}</td>
              {carparkInfo && Array.isArray(carparkInfo) && (
              <React.Fragment>
                <td>{carparkInfo.find(info => info.carpark_number === carpark.carpark_number)?.carpark_name}</td>
                <td>{carparkInfo.find(info => info.carpark_number === carpark.carpark_number)?.carpark_location}</td>
              </React.Fragment>
            )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Carpark;