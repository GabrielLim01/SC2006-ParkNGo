"use client";

import React, { useState, useEffect } from 'react';
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

function Carpark() {
  const [data, setData] = useState<CarparkData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [carparkInfo, setCarparkInfo] = useState<CarparkInfo[]>([]);

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
            <th>Address</th>
            <th>Carpark Type</th>
            <th>Type of Parking System</th>
          </tr>
        </thead>
        <tbody>
          {data.items && data.items[0] && data.items[0].carpark_data && data.items[0].carpark_data.map(carpark => (
            <tr key={carpark.carpark_number}>
              <td>{carpark.carpark_number}</td>
              <td>{carpark.carpark_info[0].lots_available}</td>
              {carparkInfo && Array.isArray(carparkInfo) && (
              <React.Fragment>
                {carparkInfo.map((info, index) => (
                  <React.Fragment key={index}>
                    {info.car_park_no === carpark.carpark_number && (
                      <React.Fragment>
                        <td>{info.address}</td>
                        <td>{info.car_park_type}</td>
                        <td>{info.type_of_parking_system}</td>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ))}
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