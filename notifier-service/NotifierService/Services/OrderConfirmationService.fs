namespace NotifierService.Services

open System.Threading.Tasks
open FSharp.Data.GraphQL
open FsToolkit.ErrorHandling

type OrderConfirmationError =
    | OrderNotFound
    | OrderStatusMustBeOngoing of actualStatus: string

module OrderConfirmationService =
    let private validateOrderStatus (status: string) =
        match status with
        | "ongoing" -> Ok ()
        | notAllowedStatus -> OrderStatusMustBeOngoing notAllowedStatus |> Error
        
    let sendConfirmationForOrder
        (sendNotification: string -> Task<bool>)
        (context: GraphQLProviderRuntimeContext)
        (orderId: int) =
        asyncResult {
            let! result = OrderApi.fetchOrderById context orderId
            match result.Data |> Option.bind (fun data -> data.Orders_by_pk) with
            | Some order ->
                do! validateOrderStatus order.Status
                let! isSuccess = sendNotification "" |> Async.AwaitTask
                return Ok isSuccess 
                
            | None ->
                return Error OrderNotFound
        }

