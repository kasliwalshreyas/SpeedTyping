import { Flex, SegmentedControl, Tooltip } from "@mantine/core";

const Difficulty = ({ difficulty, setDifficulty, center = true }) => {
    return (
        <>
            <Flex justify={'center'} w={center ? '30vw' : '100%'} >
                <Tooltip label="difficulty">
                    <SegmentedControl
                        defaultValue="easy"
                        radius={8}
                        value={difficulty}
                        onChange={setDifficulty}
                        data={[
                            { label: 'Hard', value: 'hard' },
                            { label: 'Medium', value: 'medium' },
                            { label: 'Easy', value: 'easy' },
                        ]}
                        h={'fit-content'}
                    />
                </Tooltip>
            </Flex>
        </>
    );
}

export default Difficulty;