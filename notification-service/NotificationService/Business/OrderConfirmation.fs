namespace NotificationService.Services

open FsToolkit.ErrorHandling
open NotificationService.Services.Types
open NotificationService.Services.Types.Errors
open NotificationService.Business.ConfirmationMessage

type FetchOrderById = int -> Async<Result<Order, Errors.OrderApiError>>
type SendNotification = string -> Async<Result<unit, Errors.NotificationApiError>>
type SetOrderStatus = OrderStatus -> int -> Async<Result<unit, Errors.OrderApiError>>

type SendConfirmationForOrder = int -> Async<Result<unit, OrderConfirmationError>>

module OrderConfirmation =
    let private validateOrderStatus (status: OrderStatus) =
        match status with
        | Ongoing -> Ok ()
        | notAllowedStatus -> OrderStatusMustBeOngoing notAllowedStatus |> Error
        
    let sendConfirmationForOrder
        (sendNotification: SendNotification)
        (fetchOrderById: FetchOrderById)
        (setOrderStatus: SetOrderStatus): SendConfirmationForOrder =
        fun (orderId: int) ->
            asyncResult {
                let! order = fetchOrderById orderId |> AsyncResult.mapError OrderApiError
                do! validateOrderStatus order.status
                
                let confirmationMessage = createConfirmationMessageForOrder order
                do! sendNotification confirmationMessage |> AsyncResult.mapError NotificationApiError
                
                do! setOrderStatus Pending orderId |> AsyncResult.mapError OrderApiError
            }

