import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '80%',
            maxWidth: '600px',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <button onClick={onClose} style={{ float: 'right', fontSize: '20px' }}>✖</button>
            <h2>Search Products</h2>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                style={{ width: '80%', padding: '10px', marginRight: '10px' }}
              />
              <button type="submit" style={{ padding: '10px 20px' }}>Search</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
