import { Item } from "./orderApi";

const BASE_ORDER_FRAGMENT = `
  fragment BaseOrderFragment on base_order {
    quantity
    item {
      id
      link
      name
      category
    }
  }
`;

export const ADMIN_BASE_ORDER = `
  query AdminBaseOrder {
    base_order {
      ...BaseOrderFragment
    }

    items {
      id
      name
      link
      category
    }
  }
  ${BASE_ORDER_FRAGMENT}
`;

export const UPDATE_BASE_ORDER_ITEM_MUTATION = `
  mutation UpdateBaseOrderItem($item_id: Int!, $quantity: String!) {
    update_base_order(where: {item_id: {_eq: $item_id}}, _set: {quantity: $quantity}) {
      returning {
        ...BaseOrderFragment
      }
    }
  }
  ${BASE_ORDER_FRAGMENT}
`;

export const ADD_BASE_ORDER_ITEM_MUTATION = `
  mutation AddBaseOrderItem($quantity: String!, $item_id: Int!) {
    insert_base_order(objects: {quantity: $quantity, item_id: $item_id}) {
      returning {
        ...BaseOrderFragment
      }
    }
  }
  ${BASE_ORDER_FRAGMENT}
`;

export const DELETE_BASE_ORDER_ITEM_MUTATION = `
  mutation DeleteBaseOrderItem($itemId: Int!) {
    delete_base_order(where: {item_id: {_eq: $itemId}}) {
      returning {
        ...BaseOrderFragment
      }
    }
  }
  ${BASE_ORDER_FRAGMENT}
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

export const UPDATE_ORDER_STATUS = `
  mutation UpdateOrderStatus($order_id: Int!, $status: String!) {
    update_orders_by_pk(pk_columns: {id: $order_id}, _set: {status: $status}) {
      id
      status
    }
  }
`;

export type BaseOrderItem = {
  quantity: string;
  item: Item;
};

export type AdminOrder = {
  id: number;
  order_date: string;
  status: string;
};

export type AdminOrdersQuery = {
  orders: AdminOrder[];
};

export type AdminBaseOrderQuery = {
  base_order: BaseOrderItem[];
  items: Item[];
};

export type AddBaseOrderItemInputVariables = {
  item_id: number;
  quantity: string;
};

export type UpdateBaseOrderItemInputVariables = {
  item_id: number;
  quantity: string;
};

export type UpdateOrderStatusInputVariables = {
  order_id: number;
  status: string;
};
