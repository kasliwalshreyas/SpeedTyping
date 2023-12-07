import { Button, Flex, Group, ScrollArea, Tooltip, createStyles } from "@mantine/core";
import TypeWriter from "../TypeWriter/TypeWriter";
import NavBar from "../NavBar/NavBar";
import { IconKeyboard } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import StatsIcon from "../TypeWriter/StatsIcon";
import Timing from "../TypeWriter/Timing";
import Difficulty from "../TypeWriter/Difficulty";
import { useNavigate } from "react-router";
import RunningMeter from "../TypeWriter/RunningMeter";


const useStyles = createStyles((theme) => ({
    resultWindow: {
        ///write a media query that makes the result window 's flex direction property to column when the screen size is less than 600px
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',

        '@media (max-width: 1000px)': {
            flexDirection: 'column',
        },

    }
}));



const modes = {
    easy: 'getEasyMode',
    medium: 'getMediumMode',
    hard: 'getHardMode'
}


const Practice = () => {

    const username = sessionStorage.getItem('username');
    const { classes } = useStyles();


    const [startTime, setStartTime] = useState(30);
    const [difficulty, setDifficulty] = useState('easy');
    const [doneWords, setDoneWords] = useState([]);
    const [pendingWords, setPendingWords] = useState("");
    const [resetParagraph, setResetParagraph] = useState(false);
    const [status, setStatus] = useState('wait');
    const [stats, setStats] = useState({ inputChars: 0, correctChars: 0, incorrectChars: 0 });
    const [time, setTime] = useState(startTime);
    const [grossWPM, setGrossWPM] = useState(0);
    const [netWPM, setNetWPM] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const [runningGrossWPM, setRunningGrossWPM] = useState(0);
    const [runningNetWPM, setRunningNetWPM] = useState(0);
    const [runningAccuracy, setRunningAccuracy] = useState(0);


    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    // console.log(pendingWords);
    console.log(stats);



    const fetchParagraph = async () => {
        const mode = modes[difficulty];
        const url = `${process.env.REACT_APP_BACKEND_URL}/paragraph/${mode}/`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setPendingWords(prev => {
            if (prev.length < 10) return prev + " " + data.data;
            return data.data;
        });
    }
    const sendStats = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/score/newScore`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                'userId': `${sessionStorage.getItem('userId')}`,
                'speed': netWPM,
                'accuracy': accuracy,
                'time': startTime,
            })
        });
    }

    useEffect(() => {
        fetchParagraph();
    }, [difficulty, resetParagraph]);



    const handleTypingEnd = async () => {
        setStatus('stop');

        if (isLoggedIn) {
            await sendStats();
        }
        const recentStats = sessionStorage.getItem('recentStats');
        if (recentStats !== null) {
            const recentStatsObj = JSON.parse(recentStats);
            sessionStorage.setItem('recentStats', JSON.stringify([
                {
                    grossWPM: grossWPM,
                    netWPM: netWPM,
                    accuracy: accuracy,
                    time: startTime,
                    difficulty: difficulty
                },
                ...recentStatsObj
            ]));
        }
        else {
            sessionStorage.setItem('recentStats', JSON.stringify([
                {
                    grossWPM: grossWPM,
                    netWPM: netWPM,
                    accuracy: accuracy,
                    time: startTime,
                    difficulty: difficulty
                }
            ]));
        }
    }

    useEffect(() => {
        const timerId = time > 0 && status === 'start' && setInterval(() => {
            setTime(time - 1);
            setAccuracy(calcAccuracy());
            setGrossWPM(calculateGrossWPM());
            setNetWPM(calculateNetWPM());
            setRunningAccuracy(calcAccuracy2());
            setRunningGrossWPM(calculateRelativeGrossWPM());
            setRunningNetWPM(calculateRelativeNetWPM());
        }, 1000);
        const timerId2 = time === 0 && status === 'start' && handleTypingEnd();

        return () => {
            clearInterval(timerId);
        }

    }, [time, status]);


    const handleKeyDown = (e) => {


        if (e.keyCode !== 8) {
            if (e.keyCode !== 16) { // If the pressed key is anything other than SHIFT
                if ((e.keyCode >= 65 && e.keyCode <= 90) ||
                    (e.keyCode >= 97 && e.keyCode <= 122) ||
                    e.keyCode === 32 || e.keyCode === 188 || e.keyCode === 190 || e.keyCode === 219 || e.keyCode === 221 || e.keyCode === 222) {

                    if (status === 'wait') setStatus('start');
                    let newStats = { ...stats };

                    if (pendingWords[0] === e.key) {

                        newStats.inputChars++;
                        newStats.correctChars++;
                        let newVal = pendingWords.substring(1);
                        setPendingWords(newVal);
                        if (e.keyCode === 32) {
                            setDoneWords([...doneWords, { letter: ' ', correct: true }]);
                        }
                        else {
                            setDoneWords([...doneWords, { letter: e.key, correct: true }]);
                        }
                    } else {
                        newStats.inputChars++;
                        newStats.incorrectChars++;
                        setDoneWords([...doneWords, { letter: pendingWords[0], correct: false }]);
                        let newVal = pendingWords.substring(1);
                        setPendingWords(newVal);
                    }
                    setStats(newStats);
                    if (pendingWords.length === 10) {
                        setResetParagraph(!resetParagraph);
                    }
                }
            }
        } else {
            let newStats = { ...stats };
            if (doneWords.length > 0) {
                newStats.inputChars++;
                if (doneWords[doneWords.length - 1].correct) {
                    newStats.correctChars--;
                } else {
                    newStats.incorrectChars--;
                }
                setPendingWords(doneWords[doneWords.length - 1].letter + pendingWords);
                setDoneWords(doneWords.slice(0, -1));

            }
            setStats(newStats);
            if (pendingWords.length === 10) {
                setResetParagraph(!resetParagraph);
            }
        }
    }

    const handleReset = () => {
        setDoneWords([])
        setResetParagraph(!resetParagraph);
        setStatus('wait')
        setStats({ inputChars: 0, correctChars: 0, incorrectChars: 0 })
        setTime(startTime)
        setGrossWPM(0)
        setNetWPM(0)
        setAccuracy(0)
    }


    const calculateGrossWPM = () => {
        return (60 * (stats.inputChars) / (5 * startTime)).toFixed(2);
    }

    const calculateNetWPM = () => {
        let uncorrectedErrors = 0;
        doneWords && doneWords.forEach((letter) => {
            if (!letter.correct) uncorrectedErrors++;
        });

        const speed = ((60 * (Number((stats.inputChars / 5)) - (uncorrectedErrors))) / (startTime));
        return speed > 0 ? speed.toFixed(2) : (0).toFixed(2);
    }


    const calcAccuracy = () => {
        let uncorrectedErrors = 0;
        doneWords && doneWords.forEach((letter) => {
            if (!letter.correct) uncorrectedErrors++;
        });

        return (((stats.inputChars - uncorrectedErrors) / stats.inputChars) * 100).toFixed(0);
    }

    const calculateRelativeGrossWPM = () => {
        if (startTime - time === 0) return 0;
        return (60 * (stats.inputChars) / (5 * (startTime - time))).toFixed(2);
    }

    const calculateRelativeNetWPM = () => {
        if (startTime - time === 0) return 0;

        let uncorrectedErrors = 0;
        doneWords && doneWords.forEach((letter) => {
            if (!letter.correct) uncorrectedErrors++;
        });

        const speed = ((60 * (Number((stats.inputChars / 5)) - (uncorrectedErrors))) / ((startTime - time)));
        return speed > 0 ? speed.toFixed(2) : (0).toFixed(2);
    }


    const calcAccuracy2 = () => {
        if (stats.inputChars === 0) return 0;
        let uncorrectedErrors = 0;
        doneWords && doneWords.forEach((letter) => {
            if (!letter.correct) uncorrectedErrors++;
        });
        return (((stats.inputChars - uncorrectedErrors) / stats.inputChars) * 100).toFixed(0);
    }


    return (
        <>
            <NavBar />
            <Flex align={"center"} h={'70vh'} direction={'column'} pt={'100px'}>
                {status === "stop" &&
                    (
                        <>
                            <Flex justify={'space-between'} w={'80%'} className={classes.resultWindow}>
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
                    )
                }

                <Flex w="80vw" h={"50vh"} direction={'column'}>
                    <Flex justify={'space-between'}>
                        {status === "start" && <RunningMeter count={time} label={'Time Left'} />}
                        <Group>
                            {status === "start" && <RunningMeter count={runningGrossWPM} label={'Gross WPM'} />}
                            {status === "start" && <RunningMeter count={runningNetWPM} label={'Net WPM'} />}
                            {status === "start" && <RunningMeter count={runningAccuracy} label={'Accuracy'} />}
                        </Group>

                    </Flex>
                    <ScrollArea.Autosize h={'280px'} type="never">
                        {(pendingWords?.length > 0) && (status === "wait" || status === "start") && <TypeWriter
                            doneWords={doneWords}
                            pendingWords={pendingWords}
                            handleKeyDown={handleKeyDown}
                            handleReset={handleReset}
                        />}
                    </ScrollArea.Autosize>
                </Flex>
                <Flex justify={'center'} w="80vw" align={'center'} >
                    {status === 'wait' && <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />}
                    {console.log(difficulty)}
                    <Tooltip label="reset">
                        <IconKeyboard size={"100px"} onClick={handleReset} />
                    </Tooltip>

                    {status === 'wait' && <Timing startTime={startTime} setStartTime={setStartTime} setTime={setTime} />}

                </Flex>
            </Flex>
            {status !== 'start' && <Flex sx={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                <Button variant="subtle">
                    <a href="https://www.speedtypingonline.com/typing-equations" target="_blank" className="link">
                        Learn How We Score You
                    </a>
                </Button>
            </Flex>}
        </>
    );
}

export default Practice;