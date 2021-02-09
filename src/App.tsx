import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useQuery } from 'urql';

import './App.css';
import { MAIN_QUERY, MainQuery, Item } from './api';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AvailableItems = (props: { items: Item[] }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Namn</TableCell>
            <TableCell align="right">Kategori</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item) => (
            <TableRow key={item.name}>
              <TableCell component="th" scope="row">
                {item.link ? <a href={item.link} target="_blank">{item.name}</a> : item.name}
              </TableCell>
              <TableCell>{item.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



const OrderItems = () => {

}


function App() {

  const [result] = useQuery<MainQuery>({
    query: MAIN_QUERY,
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (!data || error) return <p>Oh no... {error?.message}</p>;

  return (
    <Container component="main" maxWidth="md">
    <CssBaseline />
      <AvailableItems items={data.items}/>
    </Container>
  );
}

export default App;
