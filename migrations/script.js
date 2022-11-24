import { request, gql, GraphQLClient } from "graphql-request";
import items from "./items.json";
import baseOrders from "./base_order.json";
import orders from "./orders.json";
import orderItems from "./order_items.json";

const insertOrderItemMutation = gql`
  mutation InsertOrderItems($item_id: Int, $order_id: Int, $quantity: String) {
    insert_order_items(
      objects: { item_id: $item_id, order_id: $order_id, quantity: $quantity }
    ) {
      affected_rows
      returning {
        item_id
        order_id
        quantity
      }
    }
  }
`;

const insertOrderMutation = gql`
  mutation InsertOrders($id: Int, $status: String, $order_date: timestamp!) {
    insert_orders(
      objects: { id: $id, status: $status, order_date: $order_date }
    ) {
      affected_rows
      returning {
        id
        order_date
        status
      }
    }
  }
`;

const insertBaseOrderMutations = gql`
  mutation InsertBaseOrder(
    $item_id: Int
    $quantity: String
    $frequency_per_week: Int
  ) {
    insert_base_order(
      objects: {
        item_id: $item_id
        quantity: $quantity
        frequency_per_week: $frequency_per_week
      }
    ) {
      affected_rows
      returning {
        frequency_per_week
        item_id
        quantity
      }
    }
  }
`;

const insertItemsMutation = gql`
  mutation InsertItems(
    $id: Int
    $name: String
    $link: String
    $category: String
  ) {
    insert_items(
      objects: { id: $id, name: $name, link: $link, category: $category }
    ) {
      affected_rows
      returning {
        id
        name
        link
        category
      }
    }
  }
`;

const main = async () => {
  const graphQLClient = new GraphQLClient(
    "https://yesxntuafhmhkyjkjyys.nhost.run/v1/graphql",
    {
      headers: {
        "x-hasura-admin-secret": "",
      },
    }
  );

  const things = items.data.items;
  things.forEach(async (element) => {
    const results = await graphQLClient.request(insertItemsMutation, {
      id: element.id,
      name: element.name,
      link: element.link,
      category: element.category,
    });
  });
  baseOrders.forEach(async (element) => {
    const results = await graphQLClient.request(insertBaseOrderMutations, {
      item_id: element.item_id,
      frequency_per_week: element.frequency_per_week,
      quantity: element.quantity,
    });
  });

  orders.forEach(async (element) => {
    const results = await graphQLClient.request(insertOrderMutation, {
      id: element.id,
      order_date: element.order_date,
      status: element.status,
    });
  });

  orderItems.forEach(async (element) => {
    const results = await graphQLClient.request(insertOrderItemMutation, {
      order_id: element.order_id,
      quantity: element.quantity,
      item_id: element.item_id,
    });
  });
};

await main();
