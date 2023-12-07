import { ActionIcon, Button, Checkbox, Flex, Input, Paper, PasswordInput, Text, Title, createStyles } from '@mantine/core';
import { IconAt, IconBrandFacebook, IconBrandGoogle, IconBrandTwitter } from '@tabler/icons-react';
import React, { useState } from 'react';
import PasswordInputCustom from './PasswordInputCustom';
import { Link, useNavigate } from 'react-router-dom';
// background-color="#edf3ef"

const useStyles = createStyles((theme) => ({
    body: {
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: '#fff',
        height: '100vh',
        width: '100vw',
        justifyContent: "center",
        alignContent: "center",
    },
    signUpBody: {
        boxShadow: theme.colorScheme === 'light' ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : theme.shadows.xl,
    },
    link: {
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
    },
    logo: {
        // color: '#fff',
        // fontSize: '2rem',
        // fontWeight: 700,
        // letterSpacing: '0.1rem',
        // textShadow: '0 0 1rem rgba(0,0,0,0.5)',
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        // fontSize: '3rem',

        // color: 'black',
        // textShadow: '0 0 5px black',
        // paddingRight: '1rem'

    }
}));


const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];


const Signup = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [checkedError, setCheckedError] = useState('');

    const [formError, setFormError] = useState('');


    const handleValidation = () => {
        let isFormValid = true;
        if (firstName === '') {
            isFormValid = false;
            setFirstNameError('First Name is required');
        }
        else {
            setFirstNameError('');
        }
        if (lastName === '') {
            isFormValid = false;
            setLastNameError('Last Name is required');
        }
        else {
            setLastNameError('');
        }
        if (email === '') {
            isFormValid = false;
            setEmailError('Email is required');
        }
        else {
            if (!/\S+@\S+\.\S+/.test(email)) {
                isFormValid = false;
                setEmailError('Email is invalid');
            }
            else {
                setEmailError('');
            }
        }
        if (password === '') {
            isFormValid = false;
            setPasswordError('Password is required');
        }
        else {
            if (!requirements[0].re.test(password) || !requirements[1].re.test(password) || !requirements[2].re.test(password) || !requirements[3].re.test(password)) {
                isFormValid = false;
                setPasswordError('Password is not strong enough');
            }
            else {
                setPasswordError('');
            }
        }
        if (confirmPassword === '') {
            isFormValid = false;
            setConfirmPasswordError('Confirm Password is required');
        }
        else {
            if (passwordError === '' && password !== confirmPassword) {
                isFormValid = false;
                setConfirmPasswordError('Password and Confirm Password must match');
            }
            else {
                setConfirmPasswordError('');
            }
        }
        if (checked === false) {
            isFormValid = false;
            setCheckedError('Please accept the terms and conditions');
        }
        else {
            setCheckedError('');
        }

        return isFormValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const name = firstName + ' ' + lastName;
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await res.json();

                if (res.status === 200) {
                    console.log(data, "data");
                    navigate('/login');
                }
                else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.log(error, "error");
                setFormError(error.message);
            }
        }
    };

    return (
        <>
            <Paper sx={classes.body} >
                <Title order={3} sx={classes.logo} onClick={() => navigate('/home')}>KeySnaps</Title>

                <Flex w={'50%'} h={'100%'} justify={'center'} align={'center'}  >
                    < Paper p={10} miw={'60%'} maw={'60%'} w={'60%'} justify="center" sx={classes.signUpBody}>
                        <Title order={1} align={'center'}>Create an account</Title>
                        <Text c="dimmed" align={'center'}>Enter your details below.</Text>
                        <Flex justify={'center'} align={'center'}>
                            <ActionIcon variant="outline" radius="xl" size="xl" style={{ margin: 'auto' }}>
                                <IconBrandGoogle />
                            </ActionIcon>
                            <ActionIcon variant="outline" radius="xl" size="xl" style={{ margin: 'auto' }}>
                                <IconBrandFacebook />
                            </ActionIcon>
                            <ActionIcon variant="outline" radius="xl" size="xl" style={{ margin: 'auto' }}>
                                <IconBrandTwitter />
                            </ActionIcon>
                        </Flex>
                        {formError.length > 0 && <Text c="red" align={'center'}>{formError}</Text>}
                        <Flex py={15} px={20} direction='column' gap={20}>
                            <Flex justify={'space-between'}>
                                <Input.Wrapper
                                    label="First Name"
                                    required
                                    error={firstNameError}
                                >
                                    <Input
                                        placeholder="Your First Name"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.currentTarget.value)}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Last Name" required error={lastNameError}>
                                    <Input
                                        placeholder="Your Last Name"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.currentTarget.value)}
                                    />
                                </Input.Wrapper>
                            </Flex>
                            <Input.Wrapper label="Email" required error={emailError} >
                                <Input
                                    icon={<IconAt />}
                                    placeholder="Your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </Input.Wrapper>
                            <PasswordInputCustom password={password} setPassword={setPassword} passwordError={passwordError} setPasswordError={setPasswordError} requirements={requirements} />
                            <PasswordInput
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                error={confirmPasswordError}
                            />
                            <Checkbox
                                label="I agree to terms and conditions"
                                required
                                checked={checked}
                                onChange={(event) => setChecked(event.currentTarget.checked)}
                                error={checkedError}
                                sx={{ fontFamily: 'Ubuntu Mono' }}
                            />
                            <Flex justify={'space-between'} mt={10}>
                                <Link to="/login" className={classes.link}>
                                    <Text align={'center'} sx={{ fontFamily: 'Ubuntu Mono' }}>Already have an account? Login</Text>
                                </Link>
                                <Button onClick={handleSubmit}>
                                    Register
                                </Button>
                            </Flex>
                        </Flex>

                    </Paper>
                </Flex >
            </Paper >
        </>

    )
}
export default Signup;
