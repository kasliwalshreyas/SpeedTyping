import { Flex, Text, createStyles, getStylesRef } from "@mantine/core";
import undraw_typewriter_violet from '../../assets/undraw_typewriter_violet.svg';
import Typewriter from 'typewriter-effect';
import ColorSwitch from "../../ColorSwitch";
import { useNavigate } from "react-router-dom";


const useStyles = createStyles((theme) => ({
    text: {
        fontSize: '69px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    heading: {
        fontSize: '2em',
        fontWeight: '700',
        color: '#5f3dc4',
        // textShadow: `0 0 10px ${theme.colorScheme === 'dark' ? 'white' : 'black'}`,
        paddingRight: '1rem',
        width: '100px',
        position: 'relative',
        left: '-30px',
        top: '95px',
        // left: '-5%',
        // top: '100%',

        // bottom: '100px'
    },
    fancytexthover: {
        fontSize: '69px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        position: 'relative',
        display: 'inline-block',
        // color: `${theme.colorScheme === 'dark' ? theme.colors.dark[0] : '#e6e6e6'}`,
        color: `${theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[0]}`,

        [`&:hover .${getStylesRef('textwrapper')}`]: {
            width: '100%',
        },
    },

    textwrapper: {
        ref: getStylesRef('textwrapper'),
        fontSize: '69px',
        position: 'absolute',
        display: 'inline-block',
        overflow: 'hidden',
        width: '0',
        transition: 'width 500ms',
        whiteSpace: 'pre',
        color: `${theme.colorScheme === 'dark' ? 'white' : 'black'}`,
        borderBottom: '1px solid',
        paddingBottom: '5px',
    },

    logo: {
        // position: 'relative',
        // left: '150px',
        // bottom: '100px'

    },
    colorSwitch: {
        position: 'absolute',
        top: '10px',
        right: '10px',

    }
}));


const Home_v2 = () => {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const { classes, theme } = useStyles();
    const navigate = useNavigate();

    const handleLogout = () => {

        sessionStorage.clear();
        navigate('/logout')
    }

    return (
        <>
            <Flex sx={classes.colorSwitch}>
                <ColorSwitch />
            </Flex>
            <Flex h={'100vh'} w={'100vw'} align={'center'} wrap={'wrap'}>
                <Flex direction={'column'} w={'50%'} pl='1rem'>
                    <Flex className={classes.fancytexthover} onClick={() => navigate('/userInfo')}>
                        <Text className={classes.textwrapper}>
                            Practice
                        </Text>
                        Practice
                    </Flex>
                    <Flex className={classes.fancytexthover} onClick={() => navigate('/lobby')}>
                        <Text className={classes.textwrapper}>
                            Multiplayer
                        </Text>
                        Multiplayer
                    </Flex>
                    <Flex className={classes.fancytexthover} onClick={() => navigate('/leaderboard')}>
                        <Text className={classes.textwrapper}>
                            Leaderboard
                        </Text>
                        Leaderboard
                    </Flex>
                    <Flex className={classes.fancytexthover} onClick={() => navigate('/profile')}>
                        <Text className={classes.textwrapper}>
                            Profile
                        </Text>
                        Profile
                    </Flex>
                    {
                        (isLoggedIn === 'false' || isLoggedIn === null) ? (
                            <>
                                <Flex className={classes.fancytexthover} onClick={() => navigate('/login')}>
                                    <Text className={classes.textwrapper}>
                                        Login
                                    </Text>
                                    Login
                                </Flex>

                                <Flex className={classes.fancytexthover} onClick={() => navigate('/register')}>
                                    <Text className={classes.textwrapper}>
                                        Register
                                    </Text>
                                    Register
                                </Flex>
                            </>
                        ) :
                            (
                                <>
                                    <Flex className={classes.fancytexthover} onClick={handleLogout}>
                                        <Text className={classes.textwrapper}>
                                            Logout
                                        </Text>
                                        Logout
                                    </Flex>
                                </>
                            )
                    }
                </Flex>
                <Flex direction={'column'} className={classes.logo} justify={'center'} align={'center'}>
                    <Flex direction={'column'} h={'90%'} w={'90%'} justify={'center'} align={'center'}>
                        <Text sx={classes.heading} >
                            <Typewriter
                                options={{
                                    strings: ['KeySnaps...'],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 10000,
                                }}
                            />
                        </Text>
                        <img src={undraw_typewriter_violet} alt="undraw_typewriter" width={'100%'} height={'100%'} />
                    </Flex>
                </Flex>
            </Flex >
        </>
    );
}

export default Home_v2;