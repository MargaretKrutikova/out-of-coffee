namespace NotificationService.Services

open System.Threading.Tasks
open FSharp.Data.GraphQL
open FsToolkit.ErrorHandling
open NotificationService.Services.Types

type OrderConfirmationError =
    | OrderNotFound
    | OrderStatusMustBeOngoing of actualStatus: string

type FetchOrderById = int -> Async<Result<Order, Errors.OrderApiError>>
type SendOrderConfirmation = int -> Async<Result<bool, OrderConfirmationError>>

module OrderConfirmationService =
    let private validateOrderStatus (status: string) =
        match status with
        | "ongoing" -> Ok ()
        | notAllowedStatus -> OrderStatusMustBeOngoing notAllowedStatus |> Error
        
    let sendConfirmationForOrder
        (sendNotification: string -> Task<bool>)
        (fetchOrderById: FetchOrderById)
        (orderId: int) =
        asyncResult {
            let! result = fetchOrderById orderId
            
        }

