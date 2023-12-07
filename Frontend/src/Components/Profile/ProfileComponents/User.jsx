import { createStyles, Flex, Avatar } from "@mantine/core";

import React from 'react'
import Cards from "./Cards"

const useStyles = createStyles((theme) => ({
    announced_card_container: {
        marginTop: "1rem",
        backgroundColor: "white",

        width: '100%',
        // boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        borderRadius: "8px",
        border: "2px solid rgb(218, 220, 224)",

        // alignItems: "center",
        flexDirection: "column",
    },
    announced_section_1: {
        width: '100%',
        marginTop: "1rem",
    },
    profile_picture: {
        width: "35%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "5rem",
        flexDirection: "column",
        paddingRight:"0.5rem",
        paddingLeft:"0.5rem",
    

    },
    profile_test: {
        width: "35%",
        // height: "3rem",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        
        paddingRight:"0.5rem",

    },
    profile_time: {
        width: "35%",
        // height: "3rem",
        flexDirection: "column",
        justifyContent: "center",
        paddingRight:"0.5rem",
        
    },
    announced_section_2: {
        width: '100%',
        marginTop: "1rem",
        marginLeft: "1rem",
        padding:"0.5rem",
        justifyContent:"space-around"
        
    },
    profile_averageScore: {
        width: "35%",
        flexDirection: "column",
        alignItems:"center",
        // paddingRight:"1.5rem",
    },
    profile_overallScore: {
        width: "35%",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"center",
        // paddingRight:"0.5rem",
    },

}));
const User = ({ data }) => {
    // const data = data;
    console.log(data);
    let totSec = data.totalTime;
    let dateObj = new Date(totSec * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    const timeString = hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');
    const { classes, theme } = useStyles();
    const totalTest = data.scores.length;
    let speed = data.speed;
    speed = Math.round((speed + Number.EPSILON) * 100) / 100
    let Accuracy = data.accuracy;
    Accuracy = Math.round((Accuracy + Number.EPSILON) * 100) / 100
    return (
        <>

            <Flex className={classes.announced_card_container}>
                <Flex className={classes.announced_section_1}>
                    <Flex className={classes.profile_picture}>

                        <Cards label={data.username}
                            // progress={100}
                            icon={"user"}
                        />

                    </Flex>
                    <Flex className={classes.profile_test}>
                        {/* <p>Test : {totalTest}</p> */}
                        <Cards label={"Total Tests"}
                            // progress={100}
                            icon={"down"}
                            countUpRef={totalTest}
                        />
                    </Flex>
                    <Flex className={classes.profile_time}>
                        
                        <Cards label={"Total Time"}
                            // progress={100}
                            icon={"time"}
                            countUpRef={timeString}
                        />

                    </Flex>
                </Flex>
                <Flex className={classes.announced_section_2}>
                    <Flex className={classes.profile_averageScore}>
                    <Cards label={"Average Speed"}
                            // progress={100}
                            icon={"speed"}
                            countUpRef={speed}
                        />
                        {/* <p>Average Speed: {speed} wpm</p> */}
                    </Flex>
                    <Flex className={classes.profile_overallScore}>
                    <Cards label={"Overall Accuracy"}
                            // progress={100}
                            icon={"accuracy"}
                            countUpRef={Accuracy}
                        />
                        {/* <p>Overall Accuracy: {Accuracy} %</p> */}
                    </Flex>
                </Flex>
            </Flex>

        </>
    )
}

export default User