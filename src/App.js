import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import CustomerTable from './components/CustomerTable';

function App() {
  const columns = React.useMemo(() => [
    {
    Header: 'Owner Information',
    columns: [
      {
        Header: 'ID',
        accessor: 'Id',
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Date of Birth',
        accessor: 'DoB',
      },
      {
        Header: 'Favorite Color',
        accessor: 'FavoriteColor',
      },
    ]
  },
    {
      Header: 'Pets',
      columns: [
        {
          Header: 'Type',
          accessor: 'type'
        },

        {
          Header: 'Name',
          accessor: 'petName'
        },
      ]
    },
  ], []
  )

  const data = React.useMemo(() => [
    {
      "Id": 1,
      "Name": "Mohammad Smith",
      "DoB": "1/1/2010",
      "FavoriteColor": "Blue",
      "Pets": [
        { "type": "Bird", "petName": "Tweety" }
      ]
    },
    {
      "Id": 2,
      "Name": "Ilya Chang",
      "DoB": "2/1/1980",
      "Pets": [
        { "type": "Bird", "petName": "Fluffy" },
        { "type": "Cat", "petName": "Leon" }
      ]
    },
    {
      "Id": 3,
      "Name": "Chris",
      "DoB": "10/31/19870",   // Should this be 19870?
      "Pets": [
        { "type": "Dog", "petName": "Corky" },
        { "type": "Cat", "petName": "Bella" }
      ]
    },
    {
      "Id": 4,
      "Name": "Sanjay Grant",
      "DoB": "10/31/1987"
    },
    {
      "Id": 5,
      "Name": "Anna Kang",
      "DoB": "11/30/2004",
      "Pets": [
        { "type": "Lizard", "petName": "Kermit" },
        { "type": "Lizard", "petName": "Dino" }
      ]
    },
    {
      "Id": 6,
      "Name": "Smith Adebayo",
      "DoB": "11/30/2004",
      "Pets": [
        { "type": "Cat", "petName": "Walter" },
        { "type": "Lizard", "petName": "Lizzo" },
        { "type": "Bird", "petName": "Ladybird" }
      ]
    }
  ], []
  )
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <CustomerTable columns={columns} data={data} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
