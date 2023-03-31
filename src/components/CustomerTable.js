import { useState } from 'react';
import { useGlobalFilter, useTable, useFilters, useExpanded } from 'react-table';
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
  useToast,
  HStack
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
  }, useFilters, useGlobalFilter, useExpanded);


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

  // Reference: https://stackoverflow.com/q/23476532/13919466
  const isAlphabetical = (str) => /^[a-zA-Z]+$/.test(str);

  const toastAlert = useToast();

  // Working with single row
  const handleFilterSubmit = () => {
    // TODO: Add check for petname/type being alphabetical
    if ((isAlphabetical(searchPetName) || (searchPetName === '')) && (isAlphabetical(searchPetType) || (searchPetType === ''))) {
      console.log("Good search criteria!");
      setGlobalFilter(searchPetName || searchPetType);
    }
    else {
      toastAlert({
        title: "Error",
        description: "Search must only contain alphabetical characters",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.log("Error on alphabetical!");

    }
  };

  // Working with single row
  const filteredRows = React.useMemo(() => {
    return state.globalFilter && rows
      ? rows.filter((row) => {
        if (!row.original.Pets) return false;
        const petNames = row.original.Pets.map((pet) => pet.petName.toLowerCase());
        const petTypes = row.original.Pets.map((pet) => pet.type.toLowerCase());
        const searchValue = state.globalFilter.toLowerCase();
        return (
          petNames.some((name) => name.includes(searchValue)) ||
          petTypes.some((type) => type.includes(searchValue))
        );
      })
      : rows;
  }, [rows, state.globalFilter]);


  return (
    <>
      <HStack>
        <Input placeholder='Search by Pet Type' value={searchPetType} onChange={handlePetTypeChange} />
        <Input placeholder='Search by Pet Name' value={searchPetName} onChange={handlePetNameChange} />
        <Button onClick={handleFilterSubmit} padding='5'>Search</Button>
      </HStack>

      <TableContainer>
        <Table {...getTableProps()} variant='striped'>
          <TableCaption>Customer Information Table</TableCaption>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th fontSize={'large'} {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {filteredRows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CustomerTable;