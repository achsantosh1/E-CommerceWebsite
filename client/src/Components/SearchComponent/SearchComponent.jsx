import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import './searchcomponent.scss'

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle input changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle the search action
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Perform your search logic here (e.g., API call or filtering data)
      console.log("Searching for:", searchTerm);
      // Reset the search input if needed
      // setSearchTerm("");
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Search..."
        className="search-input"
      />
      <CiSearch
        className="search-icon"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchComponent;
