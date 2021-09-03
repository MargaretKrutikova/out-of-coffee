import { Box } from "@material-ui/core";

import { Item, Order } from "api/orderApi";
import { OngoingOrder } from "components/OngoingOrder";
import { AvailableItems } from "components/AvailableItems";

type Props = {
  order: Order;
  allItems: Item[];
};

export const CurrentOrder = ({ order, allItems }: Props) => {
  const orderItemIds = order.order_items.map((item) => item.item.id);
  const availableItems = allItems.filter(
    (item) => !orderItemIds.includes(item.id)
  );

  return (
    <>
      <Box marginBottom={4}>
        <OngoingOrder order={order} />
      </Box>
      <AvailableItems items={availableItems} orderId={order.id} />
    </>
  );
};
