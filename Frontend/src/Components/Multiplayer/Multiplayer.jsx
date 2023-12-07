import React from 'react'
import { createStyles, Flex, Text, Button, Title } from "@mantine/core";
import NavBar from '../NavBar/NavBar';

import { useNavigate } from 'react-router';
import LobbyTable from './LobbyTable';



const useStyles = createStyles((theme) => ({
    main_container: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        // backgroundColor: 'white',
        width: '85vw',
        margin: "0 auto",
        padding: '2rem 1rem 1rem 1rem',
    },
    container1: {
        // backgroundColor: "white",
        width: "60%",
        marginRight: "1rem",
        margin: "1rem",
        marginLeft: "0rem",
        // textAlign: "center",
        flexDirection: "column",
    },
    container2: {
        // backgroundColor: "white",
        width: "40%",
        margin: "1rem",
        marginRight: "0rem",
        flexDirection: "row",
        height: "80vh",
        // border: '0.5px solid #e9ecef',


    },
    text_c: {
        width: "100%",
        height: "12rem",
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",

    },
    createLobby: {
        width: "100%",
        height: "3rem",
        flexDirection: "column  ",
        justifyContent: "center",
        alignItems: "center",

    },
    joinLobby: {
        width: "100%",
        height: "3rem",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
}));



const Multiplayer = () => {

    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className={classes.main_container}>
                <Flex className={classes.container1}>
                    <Flex className={classes.text_c}>
                        <Text sx={{ fontSize: '1.5rem' }} >
                            With every keysnap, the symphony of words comes alive. Embrace the rhythm of typing, where each stroke is a note in the masterpiece of your expression.
                        </Text>
                    </Flex>
                    <Flex className={classes.createLobby}>
                        <Button onClick={() => navigate('/createlobby')}>
                            Create Lobby
                        </Button>
                    </Flex>

                    <Flex className={classes.joinLobby}>
                        <Button onClick={() => navigate('/joinlobby')}>
                            Join Lobby
                        </Button>
                    </Flex>
                </Flex>

                {/* <Flex w={0} sx={{ border: '2px solid #e9ecef' }}></Flex> */}

                <Flex className={classes.container2} justify={'space-around'} direction={'column'} align={'center'}>
                    <Flex align={'center'}>
                        <Title>Public Lobbies To Join</Title>
                    </Flex>
                    <LobbyTable />
                </Flex>
            </div>
        </>
    )
}

export default Multiplayer
