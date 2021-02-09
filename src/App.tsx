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

import { useQuery, useMutation } from 'urql';

import './App.css';
import { MAIN_QUERY, MainQuery, Item, CREATE_ORDER_MUTATION, CreateOrderInputVariables, OrderStatus, Order } from './api';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
  },
});

const AvailableItems = (props: { items: Item[] }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Namn</TableCell>
            <TableCell align="center">Kategori</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item) => (
            <TableRow key={item.name}>
              <TableCell component="th" scope="row">
                {item.link ? <a href={item.link} target="_blank">{item.name}</a> : item.name}
              </TableCell>
              <TableCell align="center">{item.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const OngoingOrder = ({ order }: {order : Order}) => {
  return (
    <>
      <Typography variant="h5">Pågående beställning</Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell>Antal</TableCell>
              <TableCell align="center">Kategori</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.order_items.map(({ item, quantity }) => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.link ? <a href={item.link} target="_blank">{item.name}</a> : item.name}
                </TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell align="center">{item.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>)
}


function App() {
  const [result, refetchOrder] = useQuery<MainQuery>({
    query: MAIN_QUERY,
  });
  const [createOrderResult, createOrder] = useMutation<any, CreateOrderInputVariables>(CREATE_ORDER_MUTATION);
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (!data || error) return <p>Oh no... {error?.message}</p>;

  return (
    <Container component="main" maxWidth="sm">
    <CssBaseline />
      {data.orders.length > 0 ?
        <OngoingOrder order={data.orders[0]}/> :
        <Button 
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            const baseItems = data.base_order.map(({ item_id, quantity }) => ({ item_id, quantity }));

            createOrder({
              order_date: "2021/12/09",
              status: OrderStatus.Ongoing,
              order_items: { data: baseItems }
            }).then(() => refetchOrder())
        }}>Skapa beställning</Button>
      }
      <Typography variant="h5">Lägg till mer:</Typography>
      <AvailableItems items={data.items}/>
    </Container>
  );
}

export default App;
