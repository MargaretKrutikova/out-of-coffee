import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { AdminOrder } from "api/adminApi";
import { formatWithMonthStr, getOrderDeliveryDate } from "functions/orderDates";
import { OrderStatus, toOrderStatus } from "functions/orderStatus";
import { AdminOrderAction } from "./AdminOrderAction";

type Props = {
  order: AdminOrder;
  sendOrderConfirmation: (order: AdminOrder) => void;
  markDelivered: (order: AdminOrder) => void;
  isLoading: boolean;
};

const orderStatusToColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Ongoing:
      return "yellow";
    case OrderStatus.Pending:
      return "orange";
    case OrderStatus.Delivered:
      return "green";
  }
};

const useStyles = makeStyles({
  orderStatusText: (props: { status: OrderStatus }) => ({
    backgroundColor: orderStatusToColor(props.status),
    borderRadius: 12,
    fontSize: 18,
    padding: "0 10px",
  }),
  tableCell: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  deliveryDate: {
    fontSize: 16,
    padding: "0 10px",
  },
});

export const AdminOrderRow = ({
  order,
  sendOrderConfirmation,
  markDelivered,
  isLoading,
}: Props) => {
  const orderDeliverDate = getOrderDeliveryDate(order.order_date);
  const orderStatus = toOrderStatus(order.status);

  const styles = useStyles({ status: orderStatus });

  return (
    <TableRow>
      <TableCell component="th" scope="row" className={styles.tableCell}>
        <Typography className={styles.deliveryDate}>
          {formatWithMonthStr(orderDeliverDate)}
        </Typography>
      </TableCell>
      <TableCell align="center" className={styles.tableCell}>
        <Typography className={styles.orderStatusText}>
          {order.status}
        </Typography>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        className={styles.tableCell}
      >
        <AdminOrderAction
          isLoading={isLoading}
          markDelivered={() => markDelivered(order)}
          sendConfirmation={() => sendOrderConfirmation(order)}
          order={order}
        />
      </TableCell>
    </TableRow>
  );
};
