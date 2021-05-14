namespace NotificationService.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open NotificationService.CompositionRoot
open NotificationService.Controllers.ErrorUtils

[<ApiController>]
[<Route("[controller]")>]
type NotificationController (logger : ILogger<NotificationController>, compositionRoot : CompositionRoot) =
    inherit ControllerBase()

    [<HttpPost("order/{orderId}/send-confirmation")>]
    member _.SendOrderConfirmation(orderId: int) =
        async {
            let! result = compositionRoot.SendOrderConfirmation orderId
            match result with
            | Error error ->
                ErrorLogger.logError logger error
                return ErrorResponse.fromOrderConfirmationError error :> ActionResult 
            | Ok () ->
                return NoContentResult () :> ActionResult
        }
        