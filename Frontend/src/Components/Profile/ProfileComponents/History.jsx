import { useMemo, useState, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box,   } from "@mantine/core";


const History = ({scores}) => {
    
    
//    console.log(scores);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'createdAt', //access nested data with dot notation
        header: 'Date',
      },
      {
        accessorKey: 'speed',
        header: 'Speed(wpm)',
      },
      {
        accessorKey: 'accuracy',
        header: 'Accuracy(%)',
      },
      {
        accessorKey: 'testDuration',
        header: 'Time',
      },
      
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data:scores, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <>
      <Box align={'center'} justify={'center'} h={'100vh'} mih={'100vh'} direction={'column'}>
        {scores.length > 0 && <MantineReactTable table={table} />}
      </Box>
    </>);
};

export default History;