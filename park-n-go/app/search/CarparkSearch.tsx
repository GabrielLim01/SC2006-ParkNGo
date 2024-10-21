// CarparkSearch.tsx
import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CarparkSearch: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      id="search-bar"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      label="Search by car park number, address, type, or system"
      variant="filled"
      style={{ width: 1000, height: 48, marginLeft: 20, backgroundColor: "white" }}
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
  );
};

export default CarparkSearch;