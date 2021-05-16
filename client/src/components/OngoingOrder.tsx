import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"

import Link from "@material-ui/core/Link"
import { useMutation } from "urql"
import {
  ADD_ORDER_ITEM_MUTATION,
  Order,
  AddOrderItemInputVariables,
} from "../api"
import { AddNewItemDialog, NewItem } from "./AddNewItemDialog"
import { OrderItemRow } from "./OrderItemRow"
import { formatDateStr, getOrderDeliveryDate } from "../functions/orderDates"

export const OngoingOrder = ({ order }: { order: Order }) => {
  const [openAddDialog, setOpenAddDialog] = React.useState(false)

  const [, addOrderItem] = useMutation<any, AddOrderItemInputVariables>(
    ADD_ORDER_ITEM_MUTATION
  )

  const handleAddNewItem = (item: NewItem) => {
    addOrderItem({ ...item, order_id: order.id })
    setOpenAddDialog(false)
  }

  const deadline = formatDateStr(order.order_date)
  const orderDeliveryDate = getOrderDeliveryDate(order.order_date)

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Beställning till <b>{formatDateStr(orderDeliveryDate)}</b>, deadline:{" "}
        <b>{deadline}</b>
      </Typography>
      <Typography gutterBottom>
        Vill du ha någonting som inte finns i listan?{" "}
        <Link
          href="#"
          onClick={(e: any) => {
            e.preventDefault()
            setOpenAddDialog(true)
          }}
        >
          Lägg till det själv!
        </Link>
        <AddNewItemDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          onSubmit={handleAddNewItem}
        />
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell>Antal</TableCell>
              <TableCell align="center">Kategori</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.order_items.map((orderItem) => (
              <OrderItemRow
                key={orderItem.item.id}
                orderItem={orderItem}
                orderId={order.id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
