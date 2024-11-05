import axios from 'axios';

export const fetchCarparkAvailability = async (setData, setLoading, setError) => {
    const options = {
      method: 'GET',
      url: 'https://api.data.gov.sg/v1/transport/carpark-availability',
      timeout: 10000, // Set a timeout of 10 seconds
    };
  
    setLoading(true);
    
    try {
      const response = await axios.request(options);
      console.log('API Response:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('API Error:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
export const fetchCarparkData = async (setCarparkInfo, setLoading, setError, currentDate) => {
    const localValue = localStorage.getItem("latest");
  
    // If data has already been fetched for today, skip API request
    if (localValue === currentDate.toLocaleDateString()) {
      return;
    }
  
    // Update local storage with the current date
    localStorage.setItem("latest", currentDate.toLocaleDateString());
  
    const options = {
      method: 'GET',
      url: 'https://data.gov.sg/api/action/datastore_search?resource_id=d_23f946fa557947f93a8043bbef41dd09&limit=3000',
      timeout: 10000, // Set a timeout of 10 seconds
    };
  
    setLoading(true);
  
    try {
      const response = await axios.request(options);
      console.log('API Response:', response.data);
      setCarparkInfo(response.data.result.records);
    } catch (error) {
      console.error('API Error:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

export interface CarparkInfo {
    car_park_no: string;
    address: string;
    car_park_type: string;
    type_of_parking_system: string;
    free_parking: string;
    night_parking: string;
    car_park_basement: string;
    gantry_height: number;
  }
  
export interface CarparkData {
    items: {
      carpark_data: {
        carpark_number: string;
        carpark_info: {
          lots_available: number;
        };
      }[];
    };
  }