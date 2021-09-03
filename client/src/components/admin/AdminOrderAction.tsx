import { IconButton } from "@material-ui/core";
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AdminOrder } from "api/adminApi";
import { OrderStatus, toOrderStatus } from "functions/orderStatus";

type Props = {
  order: AdminOrder;
  isLoading: boolean;
  sendConfirmation: () => void;
  markDelivered: () => void;
};

export const AdminOrderAction = ({
  order,
  isLoading,
  markDelivered,
  sendConfirmation,
}: Props) => {
  const orderStatus = toOrderStatus(order.status);
  if (isLoading) return <CircularProgress size={20} />;

  switch (orderStatus) {
    case OrderStatus.Ongoing:
      return (
        <>
          <IconButton
            style={{ marginRight: 16 }}
            size="small"
            color="primary"
            onClick={sendConfirmation}
          >
            <MailOutline />
          </IconButton>
          <IconButton size="small" color="primary" onClick={markDelivered}>
            <Check />
          </IconButton>
        </>
      );
    case OrderStatus.Pending:
      return (
        <IconButton size="small" color="primary" onClick={markDelivered}>
          <Check />
        </IconButton>
      );
    case OrderStatus.Delivered:
      return null;
  }
};
