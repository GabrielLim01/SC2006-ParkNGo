import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import CarparkSearch from './CarparkSearch'; // Import the new search component
import CarparkFilter from './CarparkFilter'; // Import the filter component
import GantryHeightSlider from './GantryHeightSlider'; // Import the new gantry height slider component
import styles from './CarparkTable.module.css';
import { blue } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';

interface CarparkInfo {
  car_park_no: string;
  address: string;
  car_park_type: string;
  type_of_parking_system: string;
  free_parking: string;
  night_parking: string;
  car_park_basement: string;
  gantry_height: number; // Change to number for compatibility
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

const CarparkTable: React.FC<Props> = ({ data, carparkInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCarparkInfo, setFilteredCarparkInfo] = useState(carparkInfo);
  const [filters1, setFilters1] = useState({
    nightParking: false,
    basementCarpark: false,
    freeParking: false,
  });
  const [filters2, setFilters2] = useState({
    minGantryHeight: 0,
    maxGantryHeight: 3,
  });

  // carpark type
  const [filter3, setFilter3] = useState("ANY")
  const handleFilter3 = (event)=>{
    setFilter3(event.target.value)
  }

  // no of displayed entries
  const [noOfEntries, setNoOfEntries] = useState(10);
  const handleIncreaseEntries = () =>{
    setNoOfEntries(noOfEntries + 5)
  }
  const handleDecreaseEntries = () =>{
    if(noOfEntries > 10){
      setNoOfEntries(noOfEntries - 5)
    }
  }

  const filterCarparkInfo = useCallback(() => {
    if (!carparkInfo || carparkInfo.length === 0) {
      setFilteredCarparkInfo([]);
      return;
    }

    let filteredInfo = carparkInfo.filter((info) => {
      let isValid = true;

      if (filters1.nightParking) {
        isValid = isValid && info.night_parking === 'YES';
      }
      if (filters1.freeParking) {
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

      if(filter3 != "ANY"){
        isValid = isValid && info.car_park_type==filter3;
      }

      // Check gantry height filters
      isValid = isValid && info.gantry_height >= filters2.minGantryHeight && info.gantry_height <= filters2.maxGantryHeight;

      return isValid;
    });

    setFilteredCarparkInfo(filteredInfo);
  }, [filters1, searchTerm, filters2, carparkInfo, filter3]);

  useEffect(() => {
    filterCarparkInfo();
  }, [carparkInfo, searchTerm, filters1, filters2, filter3]);

  const handleGantryHeightChange = (minGantryHeight: number, maxGantryHeight: number) => {
    setFilters2({ minGantryHeight, maxGantryHeight });
  };
  return (
    <div className="flex flex-col w-full font-poppins">
      {/* <p style={{color:'black'}}>This is filter3: {filter3}</p> */}

      <div className="flex justify-center mt-10">
        <CarparkSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="flex justify-center flex-col mt-10 lg:flex-row items-start mx-auto md:w-11/12">
        
        {/* this is the filters for user to set */}
        <div className="md:w-3/12 w-full flex flex-col px-4 justify-center items-start mx-auto">
          <div className="my-8 w-full">
            <div className='text-2xl mx-auto text-center py-4 w-auto bg-purple-200 text-purple-800'>Parking Options</div>
            <CarparkFilter filters={filters1} setFilters={setFilters1}/>
          </div>
          <div className="my-8 w-full">
            <div className='text-2xl mx-auto text-center py-4 w-auto bg-purple-200 text-purple-800'>Type of Carparks</div>
            <div style={{margin:'10px', display:'flex'}}>
              <select style={{width:'100%', color:'black'}} value={filter3} onClick={handleFilter3}>
                <option value="ANY">ANY</option>
                <option value="SURFACE CAR PARK">SURFACE CAR PARK</option>
                <option value="MULTI-STOREY CAR PARK">MULTI-STOREY CAR PARK</option>
                <option value="BASEMENT CAR PARK">BASEMENT CAR PARK</option>
                <option value="SURFACE/MULTI-STOREY CAR PARK">SURFACE/MULTI-STOREY CAR PARK</option>
                <option value="COVERED CAR PARK">COVERED CAR PARK</option>
                <option value="MECHANISED AND SURFACE CAR PARK">MECHANISED AND SURFACE CAR PARK</option>
              </select>
            </div>
          </div>
          <div className='my-8 w-full'>
            <div className='text-2xl mx-auto text-center py-4 w-auto bg-purple-200 text-purple-800'>Gantry Height</div>
            <GantryHeightSlider
              minGantryHeight={filters2.minGantryHeight}
              maxGantryHeight={filters2.maxGantryHeight}
              onGantryHeightChange={handleGantryHeightChange}
            />
          </div>
          <div className='my-8 w-full'>
            <div className='text-2xl mx-auto text-center py-4 w-auto bg-purple-200 text-purple-800'>Number of Entries</div>
            <div style={{display:'flex', justifyContent: 'space-around', alignItems: 'center', margin:'10px' }}>
              <Button variant="contained" color="primary" onClick={handleDecreaseEntries} style={{color:'white', fontSize: '25px', padding:'0px'}}><b>-</b></Button>
              <div style={{color:'black', fontSize: '30px'}}>{noOfEntries}</div>
              <Button variant="contained" color="primary" onClick={handleIncreaseEntries} style={{color:'white', fontSize: '25px', padding:'0px'}}><b>+</b></Button>
            </div>
            
          </div>
        </div>


        {/* this is the filter result */}
        <div className="lg:w-9/12 w-full px-6 mx-auto pl-0">
          {filteredCarparkInfo.slice(0, noOfEntries).map((info, index) => (
            <a href={"view?id=" + info.car_park_no}>
            <Card key={index} style={{ margin: 20, width: 900, 'backgroundColor': '#e0f1ff' }} className={styles.cardHover}>
              <CardHeader title={info.car_park_no} />
              <CardContent>
                

                <table className="table table-striped table-bordered table-hover">
                  <tbody>
                    <tr><td className="w-1/4">Address:</td><td>{info.address}</td></tr>
                    <tr><td className="w-1/4">Carpark Type:</td><td>{info.car_park_type}</td></tr>
                    <tr><td className="w-1/4">Parking System:</td><td>{info.type_of_parking_system} empty lots</td></tr>
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

                    
                    
                  </tbody>
                </table>
                <div className={styles.cardInfo}>
                  <table className="table table-striped table-bordered table-hover">
                    <tbody>
                      <tr><td className="w-38">Free Parking:</td><td>{info.free_parking}</td></tr>
                      <tr><td className="w-38">Night Parking:</td><td>{info.night_parking}</td></tr>
                      <tr><td className="w-38">Gantry Height:</td><td>{info.gantry_height}</td></tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarparkTable;