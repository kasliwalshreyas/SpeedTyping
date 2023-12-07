import { useEffect, useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import { ButtonCopy } from '../Lobby/ButtonCopy';

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            // borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`,
            display: 'flex',
            alignContent: 'center',
        },

        // borderBottom: 0,
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },

    head: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        border: 0,
    }
}));


const LobbyTable = () => {

    const [data, setData] = useState([]);

    // console.log('data', data);

    const fetchPublicLobbies = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lobby/getPublicLobbies`);
        const data = await response.json();
        // console.log('data', data);
        setData(data.data);
        return data;
    }


    useEffect(() => {
        // console.log('data', data)
        fetchPublicLobbies();
    }, [])

    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((row, index) => {
        return (
            <tr key={index}>
                <td className={classes.head}>
                    <ButtonCopy lobbyCode={row.lobbyCode} />
                </td>
            </tr>
        );
    });

    // console.log('rows', rows);

    return (
        <ScrollArea h={'100%'} miw={'100%'} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table withRowBorders={false}>
                {/* <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr className={classes.head}>
                        <th>Lobby Code</th>
                    </tr> 
            </thead> */}
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea >
    );
}

export default LobbyTable;