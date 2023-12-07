import {
    Group,
    Button,
    Title,
    Flex,
    Menu,
} from '@mantine/core';
import {
    IconUser,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ColorSwitch from '../../ColorSwitch';

const NavBar = () => {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const navigate = useNavigate();
    const handleLogout = () => {

        sessionStorage.clear();
        navigate('/logout')
    }
    return (
        <>
            <Flex justify={'space-between'} p={'10px'}>
                <Title order={3} onClick={() => navigate('/home')}>KeySnaps</Title>
                <Group m={0} pr={'10px'}>
                    <ColorSwitch />
                    <Menu>
                        <Menu.Target>
                            <Button variant="subtle"><IconUser /></Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={() => navigate('/profile')}>Profile</Menu.Item>
                            {isLoggedIn && <Menu.Item onClick={handleLogout} >Logout</Menu.Item>}
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Flex>

        </>
    );
}

export default NavBar;