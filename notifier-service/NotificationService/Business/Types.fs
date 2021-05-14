module NotificationService.Services.Types

type OrderItem = {
    name: string
    link: string option
    quantity: string
}

type OrderStatus =
    | Ongoing
    | Delivered
    | Pending
    
type Order = {
    id: int
    items: OrderItem list
    status: OrderStatus
}

module Errors =
    type OrderApiError =
        | NetworkError
        | OrderNotFound