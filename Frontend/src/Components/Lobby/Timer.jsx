import { RingProgress, Text, createStyles } from "@mantine/core";


const useStyles = createStyles((theme) => ({
    label: {
        fontWeight: 700,
        lineHeight: 1,
    },
}));

const Timer = ({ count, maxCount, ...props }) => {

    const { classes, theme } = useStyles();

    return (
        <>
            <RingProgress
                {...props}
                roundCaps
                thickness={6}
                size={100}
                sections={[{ value: count * (100 / maxCount), color: theme.primaryColor }]}
                label={
                    <div>
                        <Text ta="center" fz="2rem" className={classes.label}>
                            {count}
                        </Text>
                    </div>
                }
            />
        </>
    );
}

export default Timer;