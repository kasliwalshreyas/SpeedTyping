import { useMemo, useState, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box, createStyles } from "@mantine/core";
import NavBar from '../NavBar/NavBar';


const useStyles = createStyles((theme) => ({
  main_container: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    // backgroundColor: 'white',
    width: '90vw',
    margin: "0 auto",
    padding: '2rem 1rem 1rem 1rem',
  },
}));
const LeaderBoard = () => {
  const { classes } = useStyles();
  //should be memoized or stable
  const [data, setData] = useState([]);

  const fetchLeaderboard = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/score/leaderBoard`
    //
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const status = res.status;
      console.log(status);
      setData(data.scores);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => { fetchLeaderboard() }, [])


  const columns = useMemo(
    () => [
      {
        accessorKey: 'rank', //access nested data with dot notation
        header: 'Rank',
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'speed',
        header: 'Speed(wpm)',
      },
      {
        accessorKey: 'accuracy',
        header: 'Accuracy',
      },

    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <>
      <NavBar />
      <div className={classes.main_container}>

        <Box align={'center'} justify={'center'} h={'100vh'} mih={'100vh'} direction={'column'}>
          {data.length > 0 && <MantineReactTable table={table} />}
        </Box>
      </div>
    </>);
};

export default LeaderBoard;