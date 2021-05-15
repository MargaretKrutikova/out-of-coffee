import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import { Box, Button } from "@material-ui/core"

import { useQuery, useMutation } from "urql"

import "./App.css"
import {
  createNextOrderFromBaseItems,
  MAIN_QUERY,
  MainQuery,
  Item,
  CREATE_ORDER_MUTATION,
  CreateOrderInputVariables,
  Order,
  generateOrderMessage,
} from "./api"
import { OngoingOrder } from "./OngoingOrder"
import { AvailableItems } from "./AvailableItems"

const CurrentOrder = ({
  order,
  allItems,
}: {
  order: Order
  allItems: Item[]
}) => {
  const orderItemIds = order.order_items.map((item) => item.item.id)
  const availableItems = allItems.filter(
    (item) => !orderItemIds.includes(item.id)
  )

  return (
    <>
      <Box marginBottom={4} marginTop={2}>
        <OngoingOrder order={order} />
      </Box>
      <AvailableItems items={availableItems} orderId={order.id} />
    </>
  )
}

export const CurrentOrderPage = () => {
  const [result, refetchOrder] = useQuery<MainQuery>({
    query: MAIN_QUERY,
  })
  const [, createOrder] = useMutation<any, CreateOrderInputVariables>(
    CREATE_ORDER_MUTATION
  )
  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (!data || error) return <p>Oh no... {error?.message}</p>

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {data.orders.length > 0 ? (
        <CurrentOrder order={data.orders[0]} allItems={data.items} />
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() =>
            createNextOrderFromBaseItems(data.base_order, createOrder).then(
              refetchOrder
            )
          }
        >
          Skapa beställning
        </Button>
      )}
      <Box margin={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={generateOrderMessage}
        >
          Generera meddelande
        </Button>
      </Box>
    </Container>
  )
}
