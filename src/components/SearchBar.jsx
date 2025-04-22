import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={{ padding: '8px', flex: 1 }}
      />
      <button type="submit" style={{ padding: '8px 16px', marginLeft: '8px' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;

//Add SearchBar component with controlled input and submit handler