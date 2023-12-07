import { RingProgress, Text, createStyles } from "@mantine/core";


const useStyles = createStyles((theme) => ({
    label: {
        fontWeight: 700,
        lineHeight: 1,
    },
}));

const Progress = ({ count, ...props }) => {

    const { classes, theme } = useStyles();

    console.log(count);

    return (
        <>
            <RingProgress
                {...props}
                roundCaps
                thickness={6}
                size={50}
                sections={[{ value: count, color: theme.primaryColor }]}
                label={
                    <div>
                        <Text ta="center" fz="sm" className={classes.label}>
                            {count}
                        </Text>
                    </div>
                }
            />
        </>
    );
}

export default Progress;