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
`

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
`

export const CREATE_ORDER_MUTATION = 
 `
 mutation CreateOrder($order_date: timestamp!, $status: String!, $order_items: order_items_arr_rel_insert_input!) {
  insert_orders(objects: {order_date: $order_date, status: $status, order_items: $order_items}) {
    returning {
      id
    }
  }
 }
 ${ORDER_FRAGMENT}
`;

export const UPDATE_ORDER_ITEM_MUTATION = 
`
  mutation MyMutation($item_id: Int!, $order_id: Int!, $quantity: String!) {
    insert_order_items_one(object: {item_id: $item_id, order_id: $order_id, quantity: $quantity}, 
      on_conflict: {constraint: order_items_pkey, update_columns: quantity}) {
        item_id
    }
  }
`

export enum OrderStatus {
  Ongoing = "ongoing",
  Delivered = "delivered"
}

export type CreateOrderInputVariables = {
  order_date: string
  status: OrderStatus
  order_items: { data: BaseItem[] }
}

export type UpdateOrderItemInputVariables = {
  item_id: number
  order_id: number
  quantity: string
}

const getNextDayOfWeek = (date: Date, dayOfWeek: number) => {
  const resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
  return resultDate;
}

export const createNextOrderFromBaseItems = (items: BaseItem[], createOrder: (input: CreateOrderInputVariables) => Promise<any>) => {
  // I order every Thursday, okay?
  const thursdayDay = 4;
  const nextThursday = getNextDayOfWeek(new Date(), thursdayDay);
  const baseItems = items.map(({ item_id, quantity }) => ({ item_id, quantity }));
  
  return createOrder({
    order_date: nextThursday.toLocaleDateString(),
    status: OrderStatus.Ongoing,
    order_items: { data: baseItems }
  });
}

export type Item = {
  id: number
  name: string
  link?: string | null
  category?: string | null
}

export type OrderItem = {
  item: Item
  quantity: string
}

export type Order = {
  id: number
  order_date: string
  order_items: OrderItem []
}

export type BaseItem = {
  item_id: number
  quantity: string
}

export type MainQuery = {
  base_order: BaseItem[]
  items: Item[]
  orders: Order[]
}
