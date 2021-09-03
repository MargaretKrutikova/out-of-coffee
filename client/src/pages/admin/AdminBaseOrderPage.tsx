import { useMutation, useQuery } from "urql";
import { PageContainer } from "components/layout/PageContainer";

import {
  AddBaseOrderItemInputVariables,
  ADD_BASE_ORDER_ITEM_MUTATION,
  AdminBaseOrderQuery,
  ADMIN_BASE_ORDER,
} from "api/adminApi";
import { BaseOrder } from "components/admin/BaseOrder";
import { AvailableItems } from "components/AvailableItems";
import { Box, Typography } from "@material-ui/core";

export const AdminBaseOrderPage = () => {
  const [result] = useQuery<AdminBaseOrderQuery>({
    query: ADMIN_BASE_ORDER,
  });
  const [, addBaseOrderItem] = useMutation<any, AddBaseOrderItemInputVariables>(
    ADD_BASE_ORDER_ITEM_MUTATION
  );

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (!data || error) return <p>Oh no... {error?.message}</p>;

  const addItemToOrder = (itemId: number, quantity: string) =>
    addBaseOrderItem({ item_id: itemId, quantity });

  const orderItemIds = data.base_order.map((orderItem) => orderItem.item.id);
  const availableItems = data.items.filter(
    (item) => !orderItemIds.includes(item.id)
  );

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Basbeställning innehåller:
      </Typography>
      <Box marginBottom={4}>
        <BaseOrder items={data.base_order} />
      </Box>
      <AvailableItems items={availableItems} addItemToOrder={addItemToOrder} />
    </PageContainer>
  );
};
