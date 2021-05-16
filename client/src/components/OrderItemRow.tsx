import React from "react"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import DeleteIcon from "@material-ui/icons/Delete"
import { IconButton } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"

import { useMutation } from "urql"
import {
  DELETE_ORDER_ITEM_MUTATION,
  UPDATE_ORDER_ITEM_MUTATION,
  OrderItem,
  UpdateOrderItemInputVariables,
} from "../api/orderApi"

type Props = {
  orderItem: OrderItem
  orderId: number
}

export const OrderItemRow = ({
  orderItem: { item, quantity },
  orderId,
}: Props) => {
  const [quantityValue, setQuantityValue] = React.useState(quantity)

  const [, deleteOrderItem] = useMutation(DELETE_ORDER_ITEM_MUTATION)
  const [, updateOrderItem] = useMutation<any, UpdateOrderItemInputVariables>(
    UPDATE_ORDER_ITEM_MUTATION
  )
  const handleQuantityChange = () =>
    updateOrderItem({
      item_id: item.id,
      quantity: quantityValue,
      order_id: orderId,
    })

  const deleteItem = (itemId: number) => deleteOrderItem({ itemId, orderId })

  React.useEffect(() => {
    setQuantityValue(quantity)
  }, [quantity])

  return (
    <TableRow key={item.name}>
      <TableCell component="th" scope="row">
        {item.link ? (
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        ) : (
          item.name
        )}
      </TableCell>
      <TableCell>
        <TextField
          margin="none"
          variant="standard"
          value={quantityValue}
          style={{ maxWidth: 70 }}
          onBlur={handleQuantityChange}
          onChange={(e) => setQuantityValue(e.target.value)}
        />
      </TableCell>
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
  )
}
