import { Flex, Text, createStyles } from "@mantine/core";
import { IconDeviceGamepad2, IconKeyboard, IconListNumbers, IconLogin, IconTargetArrow, IconWritingSign } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Typewriter from 'typewriter-effect';
import ColorSwitch from "../../ColorSwitch";
import undraw_typewriter_violet from '../../assets/undraw_typewriter_violet.svg';
import typewriterImage from '../../assets/typewriterImage.jpg';
import undraw_writer_q06d from '../../assets/undraw_writer_q06d.svg';


const useStyles = createStyles((theme) => ({
    text: {
        fontSize: '2rem',
        fontWeight: 'bold',
        // color: theme.colorScheme === 'dark' ? 'white' : 'black',
        // textShadow: `0 0 10px ${theme.colorScheme === 'dark' ? 'white' : 'black'}`,
        paddingRight: '1rem'
    },
    heading: {
        fontSize: '2rem',
        fontWeight: '700',
        // color: '#000000',
        // textShadow: `0 0 10px ${theme.colorScheme === 'dark' ? 'white' : 'black'}`,
        paddingRight: '1rem',
        width: '100px',
        position: 'relative',
        left: '290px',
        top: '97px',
        // bottom: '100px'
    },
    logo: {
        position: 'relative',
        left: '150px',
        // bottom: '100px'

    },
    mainView: {
        //add background image 
        // backgroundImage: `url(${undraw_writer_q06d})`,
        backgroundImage: `url(${undraw_typewriter_violet})`,
        backgroundSize: 'spread',
        // backgroundPosition: 'center',
        backgroundPositionX: 'center',
        backgroundPositionY: 'bottom',
        backgroundRepeat: 'no-repeat',

    },
    menu: {
        position: 'absolute',
        // left: '150px',
        top: '10px',

    }
}));


const Home = () => {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const { classes, theme } = useStyles();
    const navigate = useNavigate();

    const handleLogout = () => {

        sessionStorage.clear();
        navigate('/logout')
    }


    return (
        <>
            {/* <ColorSwitch /> */}
            <Flex h={'100vh'} w={'100vw'} mt={'0px'} justify={'center'} align={'center'} className={classes.mainView} >
                {/* <img src={typewriterImage} alt="typewriterImage" width={'100%'} height={'100%'} /> */}
                {/* <Text sx={classes.heading} >
                    <Typewriter
                        options={{
                            strings: ['KeySnaps...'],
                            autoStart: true,
                            loop: true,
                            pauseFor: 10000,
                        }}
                    />
                </Text> */}
                <Flex size={'5rem'}>
                    <ColorSwitch />
                </Flex>

                <Flex gap={'20px'} className={classes.menu}>
                    <Flex size={'5rem'} onClick={() => navigate('/userInfo')}>
                        <Text sx={classes.text} >
                            Practice
                        </Text>
                        {/* <IconKeyboard /> */}
                    </Flex>
                    <Flex size={'5rem'} onClick={() => navigate('/lobby')}>
                        <Text sx={classes.text}>
                            MultiPlayer
                        </Text>
                        {/* <IconDeviceGamepad2 /> */}
                    </Flex>
                    <Flex size={'5rem'} onClick={() => navigate('/leaderboard')}>
                        <Text sx={classes.text}>
                            LeaderBoard
                        </Text>
                        {/* <IconListNumbers /> */}
                    </Flex>
                    <Flex size={'5rem'} onClick={() => navigate('/profile')}>
                        <Text sx={classes.text}>
                            Profile
                        </Text>
                        {/* <IconTargetArrow /> */}
                    </Flex>
                    {
                        (isLoggedIn === 'false' || isLoggedIn === null) ? (
                            <>
                                <Flex size={'5rem'} onClick={() => navigate('/login')}>
                                    <Text sx={classes.text}>
                                        Login
                                    </Text>
                                    {/* <IconLogin /> */}
                                </Flex>
                                <Flex size={'5rem'} onClick={() => navigate('/register')}>
                                    <Text sx={classes.text}>
                                        Register
                                    </Text>
                                    {/* <IconWritingSign /> */}
                                </Flex>
                            </>
                        ) :
                            (
                                <>
                                    <Flex size={'5rem'} onClick={handleLogout}>
                                        <Text sx={classes.text}>
                                            Logout
                                        </Text>
                                        {/* <IconLogin /> */}
                                    </Flex>
                                </>
                            )
                    }
                </Flex>
                {/* <Flex direction={'column'} className={classes.logo}>
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

                </Flex> */}
            </Flex >
        </>
    );
}

export default Home;