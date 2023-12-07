import { createStyles, NumberInput, Slider, rem, Flex } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
    },

    input: {
        height: 'auto',
        paddingTop: rem(22),
        paddingBottom: rem(3),
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },

    label: {
        position: 'absolute',
        pointerEvents: 'none',
        paddingLeft: theme.spacing.sm,
        paddingTop: `calc(${theme.spacing.sm} / 2)`,
        zIndex: 1,
    },

    slider: {
        position: 'relative',
        width: '100%',
    },

    thumb: {
        width: rem(16),
        height: rem(16),
    },

    track: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
}));


const ProgressSlider = ({ username, value, end }) => {

    const { classes } = useStyles();

    return (
        <>
            {/* <div className={classes.wrapper}> */}
            <Flex className={classes.wrapper} direction={'column'} w={'90%'}>
                <NumberInput
                    value={Number(value)}
                    label={username}
                    hideControls
                    classNames={{ input: classes.input, label: classes.label }}
                />
                <Slider
                    max={end}
                    step={1}
                    min={0}
                    label={null}
                    value={value}
                    size={2}
                    radius={0}
                    className={classes.slider}
                    classNames={{ thumb: classes.thumb, track: classes.track }}
                />
            </Flex>
            {/* </div > */}
        </>
    );
}

export default ProgressSlider;