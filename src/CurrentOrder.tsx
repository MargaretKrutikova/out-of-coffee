import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import DeleteIcon from "@material-ui/icons/Delete"
import { IconButton, Typography } from "@material-ui/core"

import Link from "@material-ui/core/Link"
import { useMutation } from "urql"
import {
  DELETE_ORDER_ITEM_MUTATION,
  ADD_ORDER_ITEM_MUTATION,
  Order,
  AddOrderItemInputVariables,
} from "./api"
import { AddNewItemDialog, NewItem } from "./AddNewItemDialog"

export const OngoingOrder = ({ order }: { order: Order }) => {
  const [openAddDialog, setOpenAddDialog] = React.useState(false)
  const [, deleteOrderItem] = useMutation(DELETE_ORDER_ITEM_MUTATION)
  const [, addOrderItem] = useMutation<any, AddOrderItemInputVariables>(
    ADD_ORDER_ITEM_MUTATION
  )

  const handleAddNewItem = (item: NewItem) => {
    addOrderItem({ ...item, order_id: order.id })
    setOpenAddDialog(false)
  }

  const deleteItem = (itemId: number) =>
    deleteOrderItem({ itemId, orderId: order.id })

  const deadline = new Date(order.order_date).toLocaleDateString()

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Pågående beställning, skickas: <b>{deadline}</b>
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
            {order.order_items.map(({ item, quantity }) => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.link ? (
                    <a href={item.link} target="_blank">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell align="center">{item.category}</TableCell>
                <TableCell component="th" scope="row">
                  <IconButton
                    size="small"
                    onClick={() => deleteItem(item.id)}
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
