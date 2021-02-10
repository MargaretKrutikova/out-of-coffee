import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import AddIcon from "@material-ui/icons/Add"
import { Box, Button, IconButton, Typography } from "@material-ui/core"

import { useQuery, useMutation } from "urql"

import "./App.css"
import {
  createNextOrderFromBaseItems,
  UpdateOrderItemInputVariables,
  UPDATE_ORDER_ITEM_MUTATION,
  MAIN_QUERY,
  MainQuery,
  Item,
  CREATE_ORDER_MUTATION,
  CreateOrderInputVariables,
  Order,
} from "./api"
import { OngoingOrder } from "./CurrentOrder"

const useStyles = makeStyles({
  table: {},
})

const AvailableItems = (props: { items: Item[]; orderId: number }) => {
  const classes = useStyles()

  const [, updateOrderItem] = useMutation<any, UpdateOrderItemInputVariables>(
    UPDATE_ORDER_ITEM_MUTATION
  )
  const defaultQuantity = "1 st"

  const addItemToOrder = (itemId: number) =>
    updateOrderItem({
      item_id: itemId,
      order_id: props.orderId,
      quantity: defaultQuantity,
    })

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Beställdes tidigare
      </Typography>
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
                  <IconButton
                    size="small"
                    onClick={() => addItemToOrder(item.id)}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                  {item.link ? (
                    <a href={item.link} target="_blank">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell align="center">{item.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const CurrentOrder = ({
  order,
  allItems,
}: {
  order: Order
  allItems: Item[]
}) => {
  const orderItemIds = order.order_items.map((item) => item.item.id)
  const availableItems = allItems.filter(
    (item) => !orderItemIds.includes(item.id)
  )

  return (
    <>
      <Box marginBottom={4} marginTop={2}>
        <OngoingOrder order={order} />
      </Box>
      <AvailableItems items={availableItems} orderId={order.id} />
    </>
  )
}

function App() {
  const [result, refetchOrder] = useQuery<MainQuery>({
    query: MAIN_QUERY,
  })
  const [, createOrder] = useMutation<any, CreateOrderInputVariables>(
    CREATE_ORDER_MUTATION
  )
  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (!data || error) return <p>Oh no... {error?.message}</p>

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {data.orders.length > 0 ? (
        <CurrentOrder order={data.orders[0]} allItems={data.items} />
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() =>
            createNextOrderFromBaseItems(data.base_order, createOrder).then(
              refetchOrder
            )
          }
        >
          Skapa beställning
        </Button>
      )}
    </Container>
  )
}

export default App
