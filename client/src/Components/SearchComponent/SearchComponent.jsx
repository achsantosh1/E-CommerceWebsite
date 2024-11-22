import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchcomponent.scss'


const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to the search results page with query as URL parameter
      navigate(`/search?search=${query.trim()}`);
      onClose();  // Close the modal after submitting
    }
  };

  return (
    <div>
      {isOpen && (
        <div className='modal-container'>
          <div className='modal'>
            <button className='close' onClick={onClose}>✖</button>
            <h2>Search Products</h2>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
              />
              <button className='search' type="submit">Search</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
