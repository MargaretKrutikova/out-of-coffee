namespace NotificationService.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open NotificationService.CompositionRoot

[<ApiController>]
[<Route("[controller]")>]
type NotificationController (logger : ILogger<NotificationController>, compositionRoot : CompositionRoot) =
    inherit ControllerBase()
    
    [<HttpPost("order/{orderId}/send-confirmation")>]
    member _.SendOrderConfirmation(orderId: int) =
        compositionRoot.SendOrderConfirmation orderId
