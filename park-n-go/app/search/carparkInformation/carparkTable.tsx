import React from 'react';

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

interface Props {
  data: CarparkData;
  carparkInfo: CarparkInfo[];
}

function CarparkTable({ data, carparkInfo }: Props) {
  return (
    <div className='lg:w-9/12 w-full px-6 mx-auto'>
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

export default CarparkTable;