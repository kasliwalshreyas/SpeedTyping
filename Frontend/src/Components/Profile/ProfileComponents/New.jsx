import { createStyles, Flex, Avatar } from "@mantine/core";
import React from 'react';
import Cards from "./Cards";


const useStyles = createStyles((theme) => ({
    announced_card_container: {
        marginTop: "1rem",
        // backgroundColor: "white",

        width: '100%',
        // boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        borderRadius: "8px",
        border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
        // alignItems: "center",
        flexDirection: "column",
        marginBottom: "1rem",
    },

}));

const New = ({ username, stats }) => {
    const { classes, theme } = useStyles();
    console.log(username);
    console.log(stats);
    const test = stats.length;


    const subjectTotals = stats.reduce((acc, subject) => {
        Object.keys(subject).forEach((subjectName) => {
            acc[subjectName] = (acc[subjectName] || 0) + parseInt(subject[subjectName]);
        });
        return acc;
    }, {});

    let totaltime = subjectTotals.time;
    let overallAccuracy = subjectTotals.accuracy / test;
    let averageSpeed = subjectTotals.netWPM / test;
    console.log(averageSpeed);
    console.log(overallAccuracy);
    let dateObj = new Date(totaltime * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    const timeString = hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');


    averageSpeed = Math.round((averageSpeed + Number.EPSILON) * 100) / 100
    overallAccuracy = Math.round((overallAccuracy + Number.EPSILON) * 100) / 100
    // console.log(timeString);
    // console.log(overallAccuracy);
    //  console.log(averageSpeed);


    return (
        <>
            <Flex>

            </Flex>
        </>
    )
}

export default New;