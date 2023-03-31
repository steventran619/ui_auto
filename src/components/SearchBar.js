import React, { useState } from 'react';
import { Input } from '@chakra-ui/react'

const SearchBar = ({ crtieria }) => {
  const [searchTerm, setSearchTerm] = useState('');

  
  return 
  <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

}

export default SearchBar;
