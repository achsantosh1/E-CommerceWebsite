import React, { useState, useEffect } from 'react';
import { useLocation, Link} from 'react-router-dom';
import './searchresult.scss'
import axios from 'axios';
import { DotLoader } from 'react-spinners';

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Get query from the URL
  const query = new URLSearchParams(location.search).get('search');

   // Function to normalize the search term (e.g., "bags" -> "bag")
   const normalizeQuery = (query) => {
    const commonTerms = {
      "bags": "bag",  // If a user types "bags", we'll search for "bag"
      "backpacks": "backpack", // Similarly, "backpacks" would map to "backpack"
    };
    
    // Return the normalized term or the original query if no mapping is found
    return commonTerms[query.toLowerCase()] || query;
  };

  // Fetch search results from the API using Axios
  useEffect(() => {
    if (query) {
      setLoading(true);


     // Normalize the query term before making the API call
      const normalizedQuery = normalizeQuery(query); // Use a new variable
      axios
        .get(`/api/v1/product/get-product?search=${normalizedQuery}`)
        .then((response) => {
          if (response.data.products) {
            // Filter results based on the name (case-insensitive)
            const filteredResults = response.data.products.filter((product) =>
              product.name.toLowerCase().includes(normalizedQuery.toLowerCase())
            );
            setResults(filteredResults);
          } else {
            setResults([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setResults([]);
        })
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className='searchresult'>
      <h2>Search Results <span className='query-text'> for "{query}"</span></h2>
    <div className='cart-container'>

   {/* Display DotLoader while loading */}
   {loading && (
          <div className="loader-container">
            <DotLoader loading={loading} size={60} />
          </div>
        )}

      {/* Check if results are empty and display message */}
      {results.length === 0 && !loading && (
          <p className="no-results">No results found for "{query}".</p>
        )}
        
     {/* Display products if results are available */}
     {results.length > 0 &&
          results.map((product) => {
            const { _id, name, price, photo } = product;
            return (
              <Link to={`/product/${_id}`} key={_id} className="card-link">
                <div className="card-item">
                  <div className="card-image">
                    <img src={photo} alt={name} />
                  </div>
                  <div className="card-name">
                    <h2>{name}</h2>
                  </div>
                  <span className="card-price">Price: रु {price}</span>
                </div>
              </Link>
            );
          })}
    </div>
  </div> 
  );
};

export default SearchResult;
