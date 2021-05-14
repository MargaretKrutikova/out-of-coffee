module NotificationService.Services.Types

open System
open System.Net

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
    date: DateTime
}

module Errors =
    type OrderApiError =
        | NetworkError of Exception
        | OrderNotFound of int
        
    type NotificationApiError =
        | NetworkError of Exception
        | HttpRequestError of HttpStatusCode
        | TooManyRequests
        | ResponseCodeIsNotSuccess of code: string
        
    type OrderConfirmationError =
        | OrderApiError of OrderApiError
        | NotificationApiError of NotificationApiError
        | OrderStatusMustBeOngoing of actualStatus: OrderStatus