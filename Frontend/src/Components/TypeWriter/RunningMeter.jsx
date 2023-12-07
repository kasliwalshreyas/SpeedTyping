import { RingProgress, Text, createStyles } from "@mantine/core";


const useStyles = createStyles((theme) => ({
    label: {
        fontWeight: 700,
        lineHeight: 1,
    },
}));

const RunningMeter = ({ count, label, ...props }) => {

    const { classes, theme } = useStyles();
    return (
        <>
            <RingProgress
                {...props}
                roundCaps
                thickness={6}
                size={100}
                sections={[{ value: count, color: theme.primaryColor }]}
                label={
                    <div>
                        <Text ta="center" fz="md" className={classes.label}>
                            {count === "Infinity" ? "" : count} {label === "Accuracy" ? "%" : ""} {label === "Time Left" ? "s" : ""}
                        </Text>
                        <Text ta="center" fz="xs" color="gray">
                            {label}
                        </Text>
                    </div>
                }
            />
        </>
    );
}

export default RunningMeter;