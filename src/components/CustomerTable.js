import { useState, useEffect } from 'react';
import { useGlobalFilter, useTable, useFilters } from 'react-table';
import React from 'react';


import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Input,
} from '@chakra-ui/react'

function CustomerTable({ columns, data }) {

  const sortedData = data.sort((a, b) => new Date(a.DoB) - new Date(b.DoB));

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
    // defaultColumn
  }, useFilters, useGlobalFilter)
  // Initially sort by the DoB
  // const [sortBy, setSortBy] = useState('DoB');
  // 

  // const filteredData = data.filter((item) =>
  // item.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const [searchPetName, setSearchPetName] = useState('');
  const [searchPetType, setSearchPetType] = useState('');

  const handleSearch = () => {
    setGlobalFilter([
      { id: 'Pets', value: searchPetName },
      { id: 'Pets', value: searchPetType },
    ]);
  };

  const handlePetNameChange = (event) => {
    setSearchPetName(event.target.value);
  };

  const handlePetTypeChange = (event) => {
    setSearchPetType(event.target.value);
  };

  const handleFilterSubmit = () => {
    setGlobalFilter((rows, columns, filterValue) => {
      return rows.filter((row) => {
        const petNames = row.values['Pets'].map((pet) => pet.petName);
        const petTypes = row.values['Pets'].map((pet) => pet.type);
        return petNames.some((name) => name.includes(filterValue)) ||
          petTypes.some((type) => type.includes(filterValue));
      });
    }, petName || petType);
  };


  return (
    <>
      <Input placeholder='Search by Pet Name' value={petName} onChange={handlePetNameChange} />
      <Input placeholder='Search by Pet Type' value={petType} onChange={handlePetTypeChange} />
      <Button onClick={handleFilterSubmit}>Filter</Button>

      <TableContainer>
        <Table {...getTableProps()} variant='striped'>
          {/* <TableCaption>Customer Information Table</TableCaption> */}
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody >
            {sortedData.map((row) => (
              <Tr key={row.Id}>
                <Td>{row.Id}</Td>
                <Td>{row.Name}</Td>
                <Td>{row.DoB}</Td>
                <Td>{row.FavoriteColor || ""}</Td>
                <Td>
                  {row.Pets
                    ? row.Pets.map((pet, index) => (
                      <div key={index}>
                        {pet.type}
                      </div>
                    ))
                    : ""}
                </Td>
                <Td>
                  {row.Pets
                    ? row.Pets.map((pet, index) => (
                      <div key={index}>
                        {pet.petName}
                      </div>
                    ))
                    : ""}
                </Td>
              </Tr>
            ))}
          </Tbody>

        </Table>
      </TableContainer>
    </>
  );
}

export default CustomerTable;



{/* // OG Version
          <Tbody >
            {data.map((row) => (
              <Tr key={row.Id}>
                <Td>{row.Id}</Td>
                <Td>{row.Name}</Td>
                <Td>{row.DoB}</Td>
                <Td>{row.FavoriteColor || ""}</Td>
                <Td>
                  {row.Pets
                    ? row.Pets.map((pet, index) => (
                      <div key={index}>
                        {pet.type} - {pet.Name}
                      </div>
                    ))
                    : ""}
                </Td>
              </Tr>
            ))}
          </Tbody> */}