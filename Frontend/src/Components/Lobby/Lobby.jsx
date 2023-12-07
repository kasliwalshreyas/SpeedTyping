import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { socket } from "../../socket";
import { Button, Flex, Title, createStyles } from "@mantine/core";
import TypeWriter from "../TypeWriter/TypeWriter";
import Difficulty from "../TypeWriter/Difficulty";
import Timing from "../TypeWriter/Timing";
import Timer from "./Timer";
import ProgressSlider from "./ProgressSlider";
import DisplayResults from "./DisplayResults";
import { ButtonCopy } from "./ButtonCopy";

const modes = {
    easy: 'getEasyMode',
    medium: 'getMediumMode',
    hard: 'getHardMode'
}

const useStyles = createStyles((theme) => ({
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
    },
    border: {
        // border: '1px solid black'
    },
    typeWriteringFlex: {
        // margin: 'auto',
        // border: '1px solid black',
    },
    announcement: {
        //thick border from left side
        // borderBottom: '2px solid #e9ecef',
        border: '2px solid #e9ecef'
    },
    innerAnnouncement: {
        maxHeight: '90%',
        overflowY: 'scroll',

        '&::-webkit-scrollbar': {
            width: '0.5rem',
        },

    },
    controls: {
        border: '2px solid #e9ecef',
        // borderBottom: '2px solid #e9ecef',
    },
    progressFlex: {
        // padding: '10px',
        maxHeight: '90%',
        overflowY: 'scroll',

        '&::-webkit-scrollbar': {
            width: '0.5rem',
        },
    }

}));

const Lobby = () => {

    const { classes } = useStyles();
    const navigate = useNavigate();

    const { lobbyCode } = useParams();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const multiPlayerUsername = sessionStorage.getItem('multiPlayerUsername');
    const multiPlayerUserid = sessionStorage.getItem('multiPlayerUserid');

    const [announcements, setAnnouncements] = useState([]);
    const [lobbyInfo, setLobbyInfo] = useState({});
    const [startTime, setStartTime] = useState(30);
    const [difficulty, setDifficulty] = useState('easy');
    const [doneWords, setDoneWords] = useState([]);
    const [pendingWords, setPendingWords] = useState("");
    const [status, setStatus] = useState('wait');
    const [stats, setStats] = useState({ inputChars: 0, goodChars: 0, totalChars: 0 });
    const [time, setTime] = useState(startTime);
    const [grossWPM, setGrossWPM] = useState(0);
    const [netWPM, setNetWPM] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [waitTime, setWaitTime] = useState(5);
    const [finalStats, setFinalStats] = useState([]);
    const [playersStats, setPlayersStats] = useState([]);

    const getLobbyInfo = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/lobby/getLobby/${lobbyCode}/`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data);
        setLobbyInfo(data.data);
    }
    const fetchParagraph = async () => {
        const mode = modes[difficulty];
        const url = `${process.env.REACT_APP_BACKEND_URL}/paragraph/${mode}/`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data['data']);
        setPendingWords(data['data']);
        return data['data'];
    }

    useEffect(() => {
        socket.on('announcement', (msg) => {
            console.log(msg);
            setAnnouncements(prev => {
                return [msg, ...prev];
            });
        });

        socket.on('player-progress-report', (data) => {
            setPlayersStats(prev => {
                return prev.filter(player => player.userid !== data.userid);
            });
            setPlayersStats(prev => {
                return [...prev, { userid: data.userid, username: data.username, stats: data.stats }]
            });
        });

        socket.on('player-finish-report', (data) => {
            setFinalStats(prev => {
                return prev.filter(player => player.userid !== data.userid);
            });
            setFinalStats(prev => {
                return [...prev, { userid: data.userid, username: data.username, stats: data.stats }]
            });
        });

        socket.on('end-lobby', () => {
            console.log('end-lobby');
            socket.disconnect();
            if (isLoggedIn === 'false') {
                sessionStorage.removeItem('multiPlayerUsername');
                sessionStorage.removeItem('multiPlayerUserid');
            }
            navigate('/lobby');
        });

        socket.on('game-ready', (data) => {
            handleReset();
            setStartTime(data.startTime);
            setWaitTime(data.waitTime);
            setTime(data.startTime);
            setPendingWords(data.paragraph);
            setDifficulty(data.difficulty);
            setFinalStats([]);
            setPlayersStats([]);
            setStatus('ready');
        });

    }, [socket]);

    useEffect(() => {
        getLobbyInfo();
        socket.auth = {
            lobbyCode: lobbyCode,
            userid: multiPlayerUserid,
            username: multiPlayerUsername
        }
        socket.connect();
        socket.emit('player-joined', { lobbyCode, userid: multiPlayerUserid, username: multiPlayerUsername });
    }, [socket]);

    useEffect(() => {
        const timerId = time > 0 && status === 'start' && setInterval(() => {
            setTime(time - 1);
            setAccuracy(calcAccuracy());
            setGrossWPM(calculateGrossWPM());
            setNetWPM(calculateNetWPM());
            sendProgressReport();
        }, 1000);
        const timerId2 = time === 0 && status === 'start' && handleTypingEnd();

        const timerId3 = waitTime > 0 && status === 'ready' && setInterval(() => {
            setWaitTime(waitTime - 1);
        }, 1000);

        const timerId4 = waitTime === 0 && status === 'ready' && setStatus('start');

        return () => {
            clearInterval(timerId);
            clearInterval(timerId3);
        }

    }, [time, status, waitTime]);


    const handleKeyDown = (e) => {
        if (e.keyCode !== 8) {
            if (e.keyCode !== 16) { // If the pressed key is anything other than SHIFT
                if ((e.keyCode >= 65 && e.keyCode <= 90) ||
                    (e.keyCode >= 97 && e.keyCode <= 122) ||
                    e.keyCode === 32 || e.keyCode === 188 || e.keyCode === 190 || e.keyCode === 219 || e.keyCode === 221 || e.keyCode === 222) {

                    // if (status === 'wait') setStatus('start');
                    let newStats = { ...stats };

                    console.log(e.key, pendingWords[0]);

                    if (pendingWords[0] === e.key) {

                        newStats.inputChars++;
                        newStats.goodChars++
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
                        setDoneWords([...doneWords, { letter: pendingWords[0], correct: false }]);
                        let newVal = pendingWords.substring(1);
                        setPendingWords(newVal);
                    }
                    setStats(newStats);
                }
            }
        } else {
            let newStats = { ...stats };
            if (doneWords.length > 0) {
                newStats.inputChars++;
                setPendingWords(doneWords[doneWords.length - 1].letter + pendingWords);
                setDoneWords(doneWords.slice(0, -1));
            }
            setStats(newStats);
        }
    }
    const handleReset = () => {
        setDoneWords([])
        setPendingWords("")
        setDifficulty(difficulty)
        setStatus('wait')
        setStats({ inputChars: 0, goodChars: 0, totalChars: 0 })
        setTime(startTime)
        setWaitTime(5)
        setGrossWPM(0)
        setNetWPM(0)
        setAccuracy(0)
    }
    const handleGameStart = async () => {
        const paragraph = await fetchParagraph();
        setStats({ inputChars: 0, goodChars: 0, totalChars: paragraph.length });
        socket.emit('start-game', {
            lobbyCode,
            waitTime: waitTime,
            startTime: startTime,
            difficulty: difficulty,
            paragraph: paragraph
        });
        setStatus('ready');
        setPlayersStats([])
        setFinalStats([])
    }

    const handleTypingEnd = () => {
        setStatus('stop');
        socket.emit('player-finish-info', { lobbyCode, userid: multiPlayerUserid, username: multiPlayerUsername, stats: { grossWPM, netWPM, accuracy, time, difficulty } });
    }

    const sendProgressReport = () => {
        const goodChars = stats.goodChars;
        const inputChars = stats.inputChars;
        const totalChars = stats.totalChars;
        socket.emit('player-progress-info', { lobbyCode, userid: multiPlayerUserid, username: multiPlayerUsername, stats: { grossWPM, netWPM, accuracy, inputChars, totalChars, goodChars } });
    }

    const calculateGrossWPM = () => {
        return (60 * (stats.inputChars) / (5 * startTime)).toFixed(2);
    }

    const calculateNetWPM = () => {
        let uncorrectedErrors = 0;
        doneWords && doneWords.forEach((letter) => {
            if (!letter.correct) uncorrectedErrors++;
        });

        return ((60 * (Number((stats.inputChars / 5)) - (uncorrectedErrors))) / (startTime)).toFixed(2);
    }

    const calcAccuracy = () => {
        let uncorrectedErrors = 0;
        doneWords && doneWords.forEach((letter) => {
            if (!letter.correct) uncorrectedErrors++;
        });

        if (stats.inputChars === 0) return 0;

        return (((stats.inputChars - uncorrectedErrors) / stats.inputChars) * 100).toFixed(0);
    }

    const handleEndGame = () => {
        socket.emit('end-game', { lobbyCode, userid: multiPlayerUserid, username: multiPlayerUsername });
        socket.disconnect();
        if (isLoggedIn === 'false') {
            sessionStorage.removeItem('multiPlayerUsername');
            sessionStorage.removeItem('multiPlayerUserid');
        }
        navigate('/lobby');
    }

    const handleLeaveLobby = () => {
        // socket.emit('player-left', { lobbyCode, userid: multiPlayerUserid, username: multiPlayerUsername });
        socket.disconnect();
        if (isLoggedIn === 'false') {
            sessionStorage.removeItem('multiPlayerUsername');
            sessionStorage.removeItem('multiPlayerUserid');
        }
        navigate('/lobby');
    }

    return (
        <Flex w={'90vw'} h={'92vh'} p={'20px'} justify={'center'} align={'center'} sx={classes.border} direction={'column'} m={'auto'}>
            <Flex mih={'45%'} w={'98%'} sx={classes.border}>
                <Flex miw={'75%'} sx={classes.progressFlex} gap={"20px"} direction={'column'} align={'center'}>
                    {
                        status === 'start' && playersStats.map((player, index) => {
                            return (
                                <ProgressSlider key={index} username={player.username} value={player.stats.inputChars} end={player.stats.totalChars} />
                            )
                        })
                    }
                    {
                        <DisplayResults opened={status === 'stop'} handleClose={handleReset} finalStats={finalStats} />
                    }
                    {
                        status === 'wait' && (
                            <Flex justify={'center'} align={'center'} direction={'column'}>
                            </Flex>
                        )
                    }


                </Flex>
                <Flex mah={'100%'} miw={'20%'} p={'10px'} gap={'2px'} direction={'column'} sx={classes.announcement}>
                    <Title order={1} align={'center'}>Announcements</Title>
                    <Flex justify={'center'} align={'center'} direction={'column'} sx={classes.innerAnnouncement} mah={'100%'}>
                        {announcements.map((announcement, index) => {
                            return (
                                <span key={index}>{announcement}</span>
                            )
                        })}
                    </Flex>
                </Flex>

            </Flex>
            <Flex mih={'45%'} w={'98%'} sx={classes.border} mt={'2px'}>
                <Flex miw={'75%'} maw={'75%'} mih={'100%'} sx={classes.border} justify={'center'} align={'center'}>
                    {(pendingWords?.length > 0) && (status === "start") && <TypeWriter
                        doneWords={doneWords}
                        pendingWords={pendingWords}
                        handleKeyDown={handleKeyDown}
                        handleReset={handleReset}
                        short={true}
                    />}
                    {/* {status === "stop" && <DisplayStats grossWPM={grossWPM} netWPM={netWPM} accuracy={accuracy} />} */}
                </Flex>

                <Flex sx={classes.controls} p={'10px'} direction={'column'} gap={'2rem'} miw={'20%'} h={'100%'} mah={'100%'} justify={'space-between'}>
                    <Flex justify={'center'}>
                        <Title order={1} align={'center'}>Controls</Title>
                    </Flex>
                    {
                        (status === 'start' || status === 'ready') &&
                        <Flex justify={'center'} align={'center'}>
                            {status === "start" && <Timer count={time} maxCount={startTime} />}
                            {status === "ready" && <Timer count={waitTime} maxCount={5} />}
                        </Flex>}
                    {multiPlayerUserid === lobbyInfo.ownerId && status === 'wait' && <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} center={false} />}
                    {multiPlayerUserid === lobbyInfo.ownerId && status === 'wait' && <Timing startTime={startTime} setStartTime={setStartTime} setTime={setTime} center={false} />}
                    {status === 'wait' && <Flex justify={'center'} align={'center'} direction={'column'} gap={'5px'}>
                        <ButtonCopy lobbyCode={lobbyCode} />
                        {multiPlayerUserid === lobbyInfo.ownerId && <Button onClick={handleGameStart} w={'80%'}>Start Game</Button>}
                        {multiPlayerUserid === lobbyInfo.ownerId && <Button w={'80%'} color="red" onClick={handleEndGame}>End Game</Button>}
                        {multiPlayerUserid !== lobbyInfo.ownerId && <Button w={'80%'} disabled>Waiting for host to start game</Button>}
                        {multiPlayerUserid !== lobbyInfo.ownerId && <Button w={'80%'} onClick={handleLeaveLobby}>Leave Lobby</Button>}
                    </Flex>}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Lobby;