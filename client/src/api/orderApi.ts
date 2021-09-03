import { getNextDayOfWeek, toApiDateString } from "../functions/orderDates";
import { OrderStatus } from "../functions/orderStatus";

const ORDER_FRAGMENT = `
fragment OrderFragment on orders {
  id
  order_date
  order_items {
    item {
      id
      name
      link
      category
    }
    quantity
  }
}
`;

export const MAIN_QUERY = `
  query MainQuery {
    base_order {
      item_id
      quantity
    }

    items {
      id
      name
      link
      category
    }

    orders(limit: 1, where: {status: {_eq: "ongoing"}}) {
      ...OrderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

export const ADMIN_ORDERS = `
  query FetchOrders {
    orders(order_by: {order_date: desc}, limit: 5) {
      order_date
      id
      status
    }
  }
`;

export const FETCH_CURRENT_ORDER = `
  query CurrentOrder {
    orders(limit: 1, where: {status: {_eq: "ongoing"}}) {
    ...OrderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

export const CREATE_ORDER_MUTATION = `
 mutation CreateOrder($order_date: timestamp!, $status: String!, $order_items: order_items_arr_rel_insert_input!) {
  insert_orders(objects: {order_date: $order_date, status: $status, order_items: $order_items}) {
    returning {
      id
    }
  }
 }
 ${ORDER_FRAGMENT}
`;

export const UPDATE_ORDER_ITEM_MUTATION = `
  mutation UpdateOrderItem($item_id: Int!, $order_id: Int!, $quantity: String!) {
    insert_order_items_one(object: {item_id: $item_id, order_id: $order_id, quantity: $quantity}, 
      on_conflict: {constraint: order_items_pkey, update_columns: quantity}) {
        item_id
    }
  }
`;

export const ADD_ORDER_ITEM_MUTATION = `
  mutation AddOrderItem($category: String!, $link: String!, $name: String!, $quantity: String!, $order_id: Int!) {
    insert_order_items_one(object: {item: {data: {link: $link, name: $name, category: $category}}, quantity: $quantity, order_id: $order_id}) {
      order_id
    }
  }
`;

export const DELETE_ORDER_ITEM_MUTATION = `
  mutation DeleteOrderItem($itemId: Int!, $orderId: Int!) {
    delete_order_items(where: {item_id: {_eq: $itemId}, order_id: {_eq: $orderId}}) {
      returning {
        order {
          ...OrderFragment
        }
      }
    }
  }
  ${ORDER_FRAGMENT}
`;

export const UPDATE_ORDER_STATUS = `
  mutation UpdateOrderStatus($order_id: Int!, $status: String!) {
    update_orders_by_pk(pk_columns: {id: $order_id}, _set: {status: $status}) {
      id
      status
    }
  }
`;

export type CreateOrderInputVariables = {
  order_date: string;
  status: OrderStatus;
  order_items: { data: BaseItem[] };
};

export type AddOrderItemInputVariables = {
  name: string;
  link: string;
  category: string;
  quantity: string;
  order_id: number;
};

export type UpdateOrderItemInputVariables = {
  item_id: number;
  order_id: number;
  quantity: string;
};

export type UpdateOrderStatusInputVariables = {
  order_id: number;
  status: string;
};

export const createNextOrderFromBaseItems = (
  items: BaseItem[],
  createOrder: (input: CreateOrderInputVariables) => Promise<any>
) => {
  // I order every Thursday
  const thursdayDay = 4;
  const nextThursday = getNextDayOfWeek(new Date(), thursdayDay);
  const baseItems = items.map(({ item_id, quantity }) => ({
    item_id,
    quantity,
  }));

  return createOrder({
    order_date: toApiDateString(nextThursday),
    status: OrderStatus.Ongoing,
    order_items: { data: baseItems },
  });
};

export type Item = {
  id: number;
  name: string;
  link?: string | null;
  category?: string | null;
};

export type OrderItem = {
  item: Item;
  quantity: string;
};

export type Order = {
  id: number;
  order_date: string;
  order_items: OrderItem[];
};

export type BaseItem = {
  item_id: number;
  quantity: string;
};

export type MainQuery = {
  base_order: BaseItem[];
  items: Item[];
  orders: Order[];
};

export type AdminOrder = {
  id: number;
  order_date: string;
  status: string;
};

export type AdminOrdersQuery = {
  orders: AdminOrder[];
};
