import React from "react"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import DeleteIcon from "@material-ui/icons/Delete"
import { IconButton } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import { AdminOrder } from "../api/orderApi"
import { formatDateStr, getOrderDeliveryDate } from "../functions/orderDates"
import { OrderStatus, toOrderStatus } from "../functions/orderStatus"
import { ConfirmationResult, sendConfirmation } from "../api/confirmationApi"

type Props = {
  order: AdminOrder
}

const orderStatusToColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Ongoing:
      return "yellow"
    case OrderStatus.Pending:
      return "orange"
    case OrderStatus.Delivered:
      return "green"
  }
}

const useStyles = makeStyles({
  orderStatusText: (props: { status: OrderStatus }) => ({
    backgroundColor: orderStatusToColor(props.status),
  }),
})

export const AdminOrderRow = ({ order }: Props) => {
  const orderDeliverDate = getOrderDeliveryDate(order.order_date)
  const orderStatus = toOrderStatus(order.status)

  const styles = useStyles({ status: orderStatus })
  const [state, setState] = React.useState<ConfirmationResult | undefined>()

  const sendOrderConfirmation = async () => {
    const result = await sendConfirmation(order.id)
    setState(result)
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography variant="h6">{formatDateStr(orderDeliverDate)}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={styles.orderStatusText} variant="h6">
          {order.status}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <IconButton
          size="small"
          color="primary"
          onClick={sendOrderConfirmation}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        {state && (state.kind == "error" ? state.error : "success")}
      </TableCell>
    </TableRow>
  )
}
