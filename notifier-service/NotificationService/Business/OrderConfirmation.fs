namespace NotificationService.Services

open FsToolkit.ErrorHandling
open NotificationService.Services.Types
open NotificationService.Services.Types.Errors
open NotificationService.Business.ConfirmationMessage

type FetchOrderById = int -> Async<Result<Order, Errors.OrderApiError>>
type SendOrderConfirmation = string -> Async<Result<unit, Errors.NotificationApiError>>

module OrderConfirmation =
    let private validateOrderStatus (status: OrderStatus) =
        match status with
        | Ongoing -> Ok ()
        | notAllowedStatus -> OrderStatusMustBeOngoing notAllowedStatus |> Error
        
    let sendConfirmationForOrder
        (sendConfirmation: SendOrderConfirmation)
        (fetchOrderById: FetchOrderById)
        (orderId: int) =
        asyncResult {
            let! order = fetchOrderById orderId |> AsyncResult.mapError OrderApiError
            do! validateOrderStatus order.status
            
            let confirmationMessage = createConfirmationMessageForOrder order
            do! sendConfirmation confirmationMessage |> AsyncResult.mapError NotificationApiError
            
            // TODO: set order status
        }

