import { RingProgress, Text, Paper, Center,Flex, Group, createStyles } from '@mantine/core';
import { IconUserCode, IconArrowDownRight, IconAlarm, IconPercentage, IconBrandSpeedtest } from '@tabler/icons-react';
// import { IconAlarm } from '@tabler/icons-react';
// import { IconPercentage } from '@tabler/icons-react';
// import { IconBrandSpeedtest } from '@tabler/icons-react';
// import { IconUserCode } from '@tabler/icons-react';
const icons = {
    user: IconUserCode,
    down: IconArrowDownRight,
    time: IconAlarm,
    accuracy: IconPercentage,
    speed: IconBrandSpeedtest,
};

const useStyles = createStyles((theme) => ({
    count: {
        fontFamily: theme.fontFamily,
        fontWeight: 700,
        fontSize: "25px",
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justify: 'space-between',
        textAlign: 'center',
        borderRadius: theme.radius.md,
        
        width: "100%",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease, transform 100ms ease',

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.05)',
        }
    },
    new:{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
    }
}));


const Cards = ({ label, progress, color = "teal", icon, countUpRef }) => {

    const { classes, theme } = useStyles();
    const Icon = icons[icon];
    return (
        <>
            <Paper withBorder radius="md" sx={classes.paper}>
                <Flex sx={{
                    flexGrow:1
                }}>

                    <RingProgress
                        size={60}
                        roundCaps
                        thickness={3}
                        sections={[{ value: progress, color: color }]}
                        label={
                            <Center>
                                <Icon size="1.4rem" stroke={1.5} />
                            </Center>
                        }
                    />
                    <div className={classes.new}>
                        <Text className={classes.new} color="dimmed" size="25px"  weight={300} ff={"robot mono"}>
                            {label}
                        </Text>
                        <span  className={classes.count} >{countUpRef}</span>
                    

                    </div>
                </Flex>
            </Paper>
        </>
    );
}

export default Cards;