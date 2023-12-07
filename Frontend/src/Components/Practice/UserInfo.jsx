import { Button, Flex, Input, Text, Title, createStyles } from "@mantine/core";
import { IconUserExclamation } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../NavBar/NavBar";
import undraw_about_me from '../../assets/undraw_about_me_violet.svg';

const useStyles = createStyles((theme) => ({
    text: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        // color: 'black',
        // textShadow: '0 0 10px black',
        paddingRight: '1rem'
    },
    heading: {
        fontSize: '5rem',
        fontWeight: '700',
        // color: 'black',
        // textShadow: '0 0 10px black',
        // paddingRight: '1rem',
        // position: 'absolute',
        // top: 100
    }
}));

const UserInfo = () => {

    const { classes, theme } = useStyles();
    const [username, setUsername] = useState('{user}');
    const navigate = useNavigate();

    const handleStartTyping = () => {
        sessionStorage.setItem('username', username);
        navigate('/practice');
    }

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (username !== null) {
            setUsername(username);
            navigate('/practice');
        }

    }, [username, navigate]);

    // console.log(username);


    return (
        <>
            <NavBar />
            <Flex align={'center'} justify={'center'} h={'90vh'} mih={'90vh'} direction={'column'}>
                {/* <img src={undraw_about_me} alt="undraw_about_me" style={{ width: '30%', height: '30%' }} /> */}
                <Title sx={classes.heading}>hey {username === '' ? "{user}" : username}!!!</Title>
                <Text sx={classes.text} >
                    {username === '{user}' || username === '' ? 'What should we call you?' : 'Welcome to the world of typing!!!'}
                </Text>
                <Input
                    sx={{ width: '20rem', marginTop: '5rem' }}
                    value={username === '{user}' ? '' : username}
                    onChange={(e) => setUsername(e.target.value)}
                    icon={<IconUserExclamation color={theme.colors.violet[4]} />}
                    placeholder="Enter username"
                />
                <Flex mt={'2rem'} gap={'1rem'}>
                    <Button onClick={() => navigate('/home')}>
                        Back
                    </Button>
                    {(username === '{user}' || username === '') && <Button disabled>
                        Start Typing
                    </Button>}
                    {(username !== '{user}' && username !== '') && <Button onClick={handleStartTyping} >
                        Start Typing
                    </Button>}

                </Flex>

            </Flex>
        </>
    );
}

export default UserInfo;