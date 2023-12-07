import { useMemo, useState, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box, } from "@mantine/core";



const Stat = ({ stats }) => {

    // console.log(stats);
    // console.log("he");

    const columns = useMemo(
        () => [
            {
                accessorKey: 'difficulty', //access nested data with dot notation
                header: 'Difficulty',
            },
            {
                accessorKey: 'netWPM',
                header: 'Speed(wpm)',
            },
            {
                accessorKey: 'accuracy',
                header: 'Accuracy(%)',
            },
            {
                accessorKey: 'time',
                header: 'Time',
            },

        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: stats, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return (
        <>
            <Box align={'center'} justify={'center'} h={'100vh'} mih={'100vh'} direction={'column'}>
                {stats.length > 0 && <MantineReactTable table={table} />}
            </Box>
        </>);
};


export default Stat