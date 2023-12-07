import { Flex } from "@mantine/core";
import CountUp from "react-countup";
import StatsIcon from "../TypeWriter/StatsIcon";

const DisplayStats = ({ grossWPM, netWPM, accuracy }) => {
    return (
        <>
            <Flex justify={'space-between'} w={'80%'}>
                <CountUp start={0} end={grossWPM} delay={0}>
                    {({ countUpRef }) => (
                        <StatsIcon
                            label={"Gross WPM"}
                            progress={grossWPM}
                            icon={grossWPM > 50 ? "up" : "down"}
                            countUpRef={countUpRef}
                        />
                    )}
                </CountUp>
                <CountUp start={0} end={netWPM} delay={0}>
                    {({ countUpRef }) => (
                        <StatsIcon
                            label={"Net WPM"}
                            progress={netWPM}
                            icon={netWPM > 50 ? "up" : "down"}
                            countUpRef={countUpRef}
                        />
                    )}
                </CountUp>
                <CountUp start={0} end={accuracy} delay={0}>
                    {({ countUpRef }) => (
                        <StatsIcon
                            label={"Accuracy"}
                            progress={accuracy}
                            icon={accuracy > 85 ? "up" : "down"}
                            countUpRef={countUpRef}
                        />
                    )}
                </CountUp>
            </Flex>
        </>
    );
}

export default DisplayStats;