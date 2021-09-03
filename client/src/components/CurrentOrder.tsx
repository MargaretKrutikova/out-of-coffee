import { Box } from "@material-ui/core";

import {
  Item,
  Order,
  UpdateOrderItemInputVariables,
  UPDATE_ORDER_ITEM_MUTATION,
} from "api/orderApi";
import { OngoingOrder } from "components/OngoingOrder";
import { AvailableItems } from "components/AvailableItems";
import { useMutation } from "urql";

type Props = {
  order: Order;
  allItems: Item[];
};

export const CurrentOrder = ({ order, allItems }: Props) => {
  const orderItemIds = order.order_items.map((item) => item.item.id);
  const availableItems = allItems.filter(
    (item) => !orderItemIds.includes(item.id)
  );
  const [, updateOrderItem] = useMutation<any, UpdateOrderItemInputVariables>(
    UPDATE_ORDER_ITEM_MUTATION
  );
  const addItemToOrder = (itemId: number, quantity: string) =>
    updateOrderItem({
      item_id: itemId,
      order_id: order.id,
      quantity,
    });

  return (
    <>
      <Box marginBottom={4}>
        <OngoingOrder order={order} />
      </Box>
      <AvailableItems items={availableItems} addItemToOrder={addItemToOrder} />
    </>
  );
};
