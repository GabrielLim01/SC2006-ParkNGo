// CarparkFilter.tsx
import React from 'react';

import "./index.css";

interface FilterProps {
  filters: {
    [key: string]: boolean;
  };
  setFilters: (filters: any) => void;
}

const filterOptions = [
  { label: 'Free Parking', value: 'freeParking' },
  { label: 'Night Parking', value: 'nightParking' },
  // { label: 'Basement Carpark', value: 'basementCarpark' },
  // Add more filter options as needed
];

const CarparkFilter: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters: any) => ({ ...prevFilters, [name]: checked }));
  };

  return (
    <div className="filter-container" style={{margin:'1px'}}>
      <h2 className="filter-title">Type of Carpark</h2>
      <ul className="filter-list">
        {filterOptions.map((option) => (
          <li key={option.value} className="card-btn" style={{ color: 'black' }}>
            <input
              type="checkbox"
              id={option.value}
              name={option.value}
              checked={filters[option.value]}
              onChange={handleCheckboxChange}
              className="filter-checkbox"
            />
            <label htmlFor={option.value} className="filter-label"> {option.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarparkFilter;