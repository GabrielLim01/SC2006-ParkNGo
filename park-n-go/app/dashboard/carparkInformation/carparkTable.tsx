import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardContent, TextField, InputAdornment,Button, MenuItem, Select } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styles from './CarparkTable.module.css';

interface CarparkInfo {
  car_park_no: string;
  address: string;
  car_park_type: string;
  type_of_parking_system: string;
  free_parking: string;
  night_parking:string;
  car_park_basement: string;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCarparkInfo, setFilteredCarparkInfo] = useState(carparkInfo);
  const [filters, setFilters] = useState({
    nightParking: false,
    basementCarpark: false,
    freeParking: false,
  });

  
  const handleFilterChange = (event: any) => {
    const { target: { value } } = event;
    const [filterName, filterValue] = value.split(',');
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: filterValue === 'true' }));
    filterCarparkInfo(); // Call filterCarparkInfo after updating filters
  };

  const filterCarparkInfo = useCallback(() => {
    if (!carparkInfo || carparkInfo.length === 0) {
      setFilteredCarparkInfo([]);
      return;
    }
    console.log('filterCarparkInfo called');
    let filteredInfo = carparkInfo.filter((info) => {
      let isValid = true;

      if (filters.nightParking) {
        isValid = isValid && info.night_parking === 'YES';
      }
      if (filters.basementCarpark) {
        isValid = isValid && info.car_park_basement === 'Y';
      }
      if (filters.freeParking) {
        isValid = isValid && info.free_parking !== 'NO';
      }

      if (searchTerm && searchTerm.trim() !== '') {
        const searchTermLower = searchTerm.toLowerCase();
        isValid = isValid && (
          info.car_park_no.toLowerCase().includes(searchTermLower) ||
          info.address.toLowerCase().includes(searchTermLower) ||
          info.car_park_type.toLowerCase().includes(searchTermLower) ||
          info.type_of_parking_system.toLowerCase().includes(searchTermLower)
        );
      }

      return isValid;
    });
    console.log('filteredInfo:', filteredInfo);
    setFilteredCarparkInfo(filteredInfo);
  }, [filters, searchTerm, carparkInfo]);

  useEffect(() => {
    if (carparkInfo.length > 0) {
      filterCarparkInfo();
    }
  }, [carparkInfo, searchTerm, filters]);

  return (
    <div>
  <TextField
    id="search-bar"
    className="search-bar"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    label="Search by car park number, address, type, or system"
    variant="filled"
    fullWidth={false}
    style={{ width: 900, height: 48, marginLeft: 20, backgroundColor: "white"}}
    placeholder="Search..."
    size="small"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
      <Select
        value={Object.entries(filters).map(([key, value]) => `${key},${value}`).join(',')}
        onChange={handleFilterChange} style={{backgroundColor: 'white'}}
      >
        <MenuItem value="nightParking,true">Night Parking</MenuItem>
        <MenuItem value="basementCarpark,true">Basement Carpark</MenuItem>
        <MenuItem value="freeParking,true">Free Parking</MenuItem>
        {/* add more filters as needed */}
      </Select>
      {filteredCarparkInfo.slice(0, 10).map((info, index) => (
        <Card key={index} style={{ margin: 20, width: 900 }} className={styles.cardHover}>
          <CardHeader title={info.car_park_no} />
          <CardContent>
            <table className="table table-striped table-bordered table-hover">
              <tr>
                <td>Address:</td>
                <td>{info.address}</td>
              </tr>
              <tr>
                <td>Carpark Type:</td>
                <td>{info.car_park_type}</td>
              </tr>
              <tr>
                <td>Type of Parking System:</td>
                <td>{info.type_of_parking_system}</td>
              </tr>
              {data.items && data.items[0] && data.items[0].carpark_data && (
                <React.Fragment>
                  {data.items[0].carpark_data.map((carpark) => (
                    <React.Fragment key={carpark.carpark_number}>
                      {carpark.carpark_number === info.car_park_no && (
                        <tr>
                          <td>Availability:</td>
                          <td>{carpark.carpark_info[0].lots_available}</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}
            </table>
            <div className={styles.cardInfo}>
              <p>Address:       {info.address}</p>
              <p>Carpark Type:        {info.car_park_type}</p>
              <p>Type of Parking System:       {info.type_of_parking_system}</p>
              <p>Free Parking: {info.free_parking}</p>
              <p>Night Parking: {info.night_parking}</p>
              <p>Basement Carpark: {info.car_park_basement === 'N'? 'No' : 'Yes'}</p>
              {/* add more information as needed */}
            </div>
          </CardContent>
        </Card>
      ))}
</div>
  );
}

export default CarparkTable;