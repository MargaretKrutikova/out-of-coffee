export enum OrderStatus {
  Ongoing = "ongoing",
  Delivered = "delivered",
  Pending = "pending",
}

export const toOrderStatus = (str: string): OrderStatus => {
  switch (str) {
    case "ongoing":
      return OrderStatus.Ongoing
    case "pending":
      return OrderStatus.Pending
    case "delivered":
      return OrderStatus.Delivered

    default:
      throw Error(`Receive invalid order status: ${str}`)
  }
}
