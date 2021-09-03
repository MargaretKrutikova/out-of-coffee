import { Box, Button } from "@material-ui/core";

import { useQuery, useMutation } from "urql";
import { PageContainer } from "components/layout/PageContainer";

import {
  createNextOrderFromBaseItems,
  MAIN_QUERY,
  MainQuery,
  CREATE_ORDER_MUTATION,
  CreateOrderInputVariables,
} from "api/orderApi";
import { CurrentOrder } from "components/CurrentOrder";

export const CurrentOrderPage = () => {
  const [result, refetchOrder] = useQuery<MainQuery>({
    query: MAIN_QUERY,
  });
  const [, createOrder] = useMutation<any, CreateOrderInputVariables>(
    CREATE_ORDER_MUTATION
  );
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (!data || error) return <p>Oh no... {error?.message}</p>;

  return (
    <PageContainer>
      {data.orders.length > 0 ? (
        <CurrentOrder order={data.orders[0]} allItems={data.items} />
      ) : (
        <Box margin={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() =>
              createNextOrderFromBaseItems(data.base_order, createOrder).then(
                () => refetchOrder({ requestPolicy: "network-only" })
              )
            }
          >
            Skapa beställning
          </Button>
        </Box>
      )}
    </PageContainer>
  );
};
