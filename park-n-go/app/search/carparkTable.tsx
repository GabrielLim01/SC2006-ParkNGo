import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import CarparkSearch from './CarparkSearch'; // Import the new search component
import CarparkFilter from './CarparkFilter'; // Import the filter component
import GantryHeightSlider from './GantryHeightSlider'; // Import the new gantry height slider component
import styles from './CarparkTable.module.css';
import { Button } from '@material-ui/core';
import Link from 'next/link';

import {CarparkData, CarparkInfo} from '../search/PageModel';
import {NightParkingFilter, GantryHeightFilter, FreeParkingFilter, SearchTermFilter, CarparkTypeFilter, CarparkFilterContext} from '../search/carparkTableModel';

interface Props {
  data: CarparkData;
  carparkInfo: CarparkInfo[];
}

const CarparkTable: React.FC<Props> = ({ data, carparkInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCarparkInfo, setFilteredCarparkInfo] = useState(carparkInfo);
  const [noOfEntries, setNoOfEntries] = useState(10);
  const [filter3, setFilter3] = useState("ANY")
  //true false filters
  const [filters1, setFilters1] = useState({
    nightParking: false,
    basementCarpark: false,
    freeParking: false,
  });
  //gantry height
  const [filters2, setFilters2] = useState({
    minGantryHeight: 0,
    maxGantryHeight: 10,
  });

  // carpark type
  const handleFilter3 = (event)=>{
    setFilter3(event.target.value)
  }
  // no of displayed entries
  const handleIncreaseEntries = () =>{
    setNoOfEntries(noOfEntries + 5)
  }
  const handleDecreaseEntries = () =>{
    if(noOfEntries > 5){
      setNoOfEntries(noOfEntries - 5)
    }
  }

  const filterCarparkInfo = useCallback(() => {
    if (!carparkInfo || carparkInfo.length === 0) {
      setFilteredCarparkInfo([]);
      return;
    }
  
    const strategies = [
      new NightParkingFilter(filters1.nightParking),
      new FreeParkingFilter(filters1.freeParking),
      new SearchTermFilter(searchTerm),
      new CarparkTypeFilter(filter3),
      new GantryHeightFilter(filters2.minGantryHeight, filters2.maxGantryHeight)
    ];
  
    const filterContext = new CarparkFilterContext(strategies);
    
    const filteredInfo = filterContext.filter(carparkInfo);
  
    setFilteredCarparkInfo(filteredInfo);
  }, [filters1, searchTerm, filters2, carparkInfo, filter3]);

  useEffect(() => {
    filterCarparkInfo();
  }, [carparkInfo, searchTerm, filters1, filters2, filter3]);

  const handleGantryHeightChange = (minGantryHeight: number, maxGantryHeight: number) => {
    if(minGantryHeight <= maxGantryHeight){
      setFilters2({ minGantryHeight, maxGantryHeight });
    }
  };

  const Renderfilter = ({}) => (
    <div className="flex flex-col justify-center items-start mx-auto">
    <div className="my-8 w-full text-black rounded-xl p-8 bg-white drop-shadow-xl">
      <div className='text-xl mx-auto text-center font-sans-serif-3 font-bold mb-2'>Parking Options</div>
      <CarparkFilter filters={filters1} setFilters={setFilters1}/>
    </div>
    <div className="my-8 w-full bg-white drop-shadow-xl p-8 rounded-xl">
      <div className='text-xl mx-auto text-center font-sans-serif-3 font-bold text-black mb-8'>Type of Carparks</div>
      <div style={{margin:'10px', display:'flex'}}>
        <select className="rounded-md border-lGrey border-collapse hover:border-dGrey" style={{width:'100%', color:'black'}} value={filter3} onChange={handleFilter3}>
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
    <div className='my-8 w-full bg-white drop-shadow-xl p-8 rounded-xl'>
      <div className='text-xl mx-auto text-center font-sans-serif-3 font-bold text-black mb-8'>Gantry Height</div>
      <GantryHeightSlider
        minGantryHeight={filters2.minGantryHeight}
        maxGantryHeight={filters2.maxGantryHeight}
        onGantryHeightChange={handleGantryHeightChange}
      />
    </div>
    <div className='my-8 w-full bg-white drop-shadow-xl p-8 rounded-xl'>
      <div className='text-xl mx-auto text-center font-sans-serif-3 font-bold text-black mb-8'>Number of Entries</div>
      <div style={{display:'flex', justifyContent: 'space-around', alignItems: 'center', margin:'10px' }}>
        <Button variant="contained" color="primary" onClick={handleDecreaseEntries} style={{color:'white', fontSize: '25px', padding:'0px'}}><b>-</b></Button>
        <div style={{color:'black', fontSize: '30px'}}>{noOfEntries}</div>
        <Button variant="contained" color="primary" onClick={handleIncreaseEntries} style={{color:'white', fontSize: '25px', padding:'0px'}}><b>+</b></Button>
      </div>
    </div>
  </div>
  );

  return (
    <div className="flex flex-col w-full font-sans-serif-3">
    {/*search bar*/}
      <div className="flex justify-center mt-10">
        <CarparkSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>

      <div className="flex justify-center mt-10 flex-col lg:flex-row items-start">
        
        {/* this is the filters for user to set */}
        <Renderfilter></Renderfilter>

        {/* this is the filter result */}
        <div className="w-full">
          {filteredCarparkInfo.slice(0, noOfEntries).map((info, index) => (
            <Link href={"view?id=" + info.car_park_no}>
            <Card key={index} style={{ margin: 20, 'backgroundColor': '#C9F2F4', 'font':'sans-serif-3' }} className={styles.cardHover}>
              <CardHeader title={info.car_park_no}/>
              <CardContent>
                

                <table className="table table-striped table-bordered table-hover">
                  <tbody>
                    <tr><td className="w-1/4">Address</td><td>{info.address}</td></tr>
                    <tr><td className="w-1/4">Carpark Type</td><td>{info.car_park_type}</td></tr>
                    <tr><td className="w-1/4">Parking System</td><td>{info.type_of_parking_system}</td></tr>
                    {data.items && data.items[0] && data.items[0].carpark_data && (
                      <React.Fragment>
                        {data.items[0].carpark_data.map((carpark) => (
                          <React.Fragment key={carpark.carpark_number}>
                            {carpark.carpark_number === info.car_park_no && (
                              <tr>
                                <td>Availability:</td>
                                <td>{carpark.carpark_info[0].lots_available} empty lots</td>
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
                      <tr><td className="w-1/4">Free Parking</td><td>{info.free_parking}</td></tr>
                      <tr><td className="w-1/4">Night Parking</td><td>{info.night_parking}</td></tr>
                      <tr><td className="w-1/4">Gantry Height</td><td>{info.gantry_height}</td></tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarparkTable;