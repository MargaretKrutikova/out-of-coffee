import React from "react"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { IconButton } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import MailOutline from "@material-ui/icons/MailOutline"
import CircularProgress from "@material-ui/core/CircularProgress"

import { AdminOrder } from "../api/orderApi"
import { formatDateStr, getOrderDeliveryDate } from "../functions/orderDates"
import { OrderStatus, toOrderStatus } from "../functions/orderStatus"

type Props = {
  order: AdminOrder
  sendOrderConfirmation: (order: AdminOrder) => void
  confirmationPending: boolean
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
    borderRadius: 12,
  }),
})

export const AdminOrderRow = ({
  order,
  sendOrderConfirmation,
  confirmationPending,
}: Props) => {
  const orderDeliverDate = getOrderDeliveryDate(order.order_date)
  const orderStatus = toOrderStatus(order.status)

  const styles = useStyles({ status: orderStatus })

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography variant="h6">{formatDateStr(orderDeliverDate)}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="h6" className={styles.orderStatusText}>
          {order.status}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {confirmationPending ? (
          <CircularProgress size={20} />
        ) : orderStatus === OrderStatus.Ongoing ? (
          <IconButton
            size="small"
            color="primary"
            onClick={() => sendOrderConfirmation(order)}
          >
            <MailOutline />
          </IconButton>
        ) : null}
      </TableCell>
    </TableRow>
  )
}
