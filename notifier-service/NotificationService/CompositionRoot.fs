module NotificationService.CompositionRoot

open NotificationService.Service
open NotificationService.Services

type CompositionRoot = {
    SendOrderConfirmation: SendConfirmationForOrder
}

type OrderGraphqlApiUrl = OrderGraphqlApiUrl of string
type NotificationApiUrl = NotificationApiUrl of string

let createCompositionRoot (OrderGraphqlApiUrl orderGraphqlApiUrl) (NotificationApiUrl notificationApiUrl): CompositionRoot =
    let graphqlContext = OrderGraphqlApi.createRuntimeContext orderGraphqlApiUrl
    let fetchOrderById = OrderGraphqlApi.fetchOrderById graphqlContext
    let sendNotification = NotificationApi.sendChannelNotification notificationApiUrl
    
    let sendOrderConfirmation =
        OrderConfirmation.sendConfirmationForOrder sendNotification fetchOrderById
        
    { SendOrderConfirmation = sendOrderConfirmation }
    