import { Flex, SegmentedControl, Tooltip } from "@mantine/core";

const Timing = ({ startTime, setStartTime, setTime, center = true }) => {
    return (
        <>
            <Flex justify={'center'} w={center ? '30vw' : '100%'}>
                <Tooltip label="time">
                    <SegmentedControl
                        defaultValue="30"
                        radius={8}
                        value={startTime.toString()}
                        onChange={
                            (val) => {
                                setStartTime(Number(val));
                                setTime(Number(val));
                            }
                        }
                        data={[
                            { label: '90 sec', value: "90" },
                            { label: '60 sec', value: "60" },
                            { label: '30 sec', value: "30" },
                        ]}
                        h={'fit-content'}
                    />
                </Tooltip>
            </Flex>
        </>
    );
}

export default Timing;