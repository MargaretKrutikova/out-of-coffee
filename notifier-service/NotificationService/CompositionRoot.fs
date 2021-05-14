module NotificationService.CompositionRoot

open NotificationService.Service
open NotificationService.Services

type CompositionRoot = {
    SendOrderConfirmation: SendOrderConfirmation
}

type OrderGraphqlApiUrl = OrderGraphqlApiUrl of string
type NotificationApiUrl = NotificationApiUrl of string

let createCompositionRoot (OrderGraphqlApiUrl orderGraphqlApiUrl) (NotificationApiUrl notificationApiUrl): CompositionRoot =
    let graphqlContext = OrderGraphqlApi.createRuntimeContext orderGraphqlApiUrl
    let sendNotification = NotificationApi.sendChannelNotification notificationApiUrl
    
    let sendOrderConfirmation =
        OrderConfirmation.sendConfirmationForOrder sendNotification graphqlContext
        
    { SendOrderConfirmation = sendOrderConfirmation }
    