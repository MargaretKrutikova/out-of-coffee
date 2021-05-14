namespace NotificationService.Controllers.ErrorUtils

open System
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open NotificationService.Services.Types.Errors

module ErrorResponse =
    let createErrorResultWithMessage statusCode message =
        let result = ObjectResult()
        result.StatusCode <- Nullable(statusCode)
        result.Value <- message
        result

    let createInternalErrorResponse message =
        createErrorResultWithMessage StatusCodes.Status500InternalServerError message

    let createBadRequestResponse message =
        createErrorResultWithMessage StatusCodes.Status400BadRequest message

    let fromOrderApiError (error: OrderApiError): ObjectResult =
        match error with
        | OrderNotFound _ -> NotFoundObjectResult("Order wasn't found") :> ObjectResult
        | OrderApiError.NetworkError _ -> createInternalErrorResponse "Network error while trying to call the order api"

    let fromNotificationApiError (error: NotificationApiError) =
        match error with
        | NotificationApiError.NetworkError _ ->
            createInternalErrorResponse "Network error while trying to call the notification api"
        | HttpRequestError code ->
            createInternalErrorResponse $"Non-success error code received from the notification api: {code}"
        | TooManyRequests -> createInternalErrorResponse "Too many requests to the notification api"
        | ResponseCodeIsNotSuccess responseCode ->
            createInternalErrorResponse $"Response code from the notification api wasn't successful: {responseCode}"

    let fromOrderConfirmationError (error: OrderConfirmationError) =
        match error with
        | OrderApiError orderApiError -> fromOrderApiError orderApiError
        | NotificationApiError notificationApiError -> fromNotificationApiError notificationApiError
        | OrderStatusMustBeOngoing actualStatus ->
            createBadRequestResponse $"Order status must be ongoing, received: {actualStatus}"

module ErrorLogger =
    let logError (logger: ILogger<'a>) (error: OrderConfirmationError) =
        match error with
        | OrderStatusMustBeOngoing actualStatus ->
            logger.LogError($"Order status must be ongoing, received: {actualStatus}")
        | OrderApiError (OrderApiError.NetworkError exc) ->
            logger.LogError("Network error while trying to call the order api", exc)
        | OrderApiError (OrderNotFound orderId) -> logger.LogError($"Order with id {orderId} wasn't found")
        | NotificationApiError (NotificationApiError.NetworkError exc) ->
            logger.LogError("Network error while trying to call the notification api", exc)
        | NotificationApiError (HttpRequestError statusCode) ->
            logger.LogError($"Non-success error code received from the notification api: {statusCode}")
        | NotificationApiError TooManyRequests -> logger.LogError("Too many requests to the notification api")
        | NotificationApiError (ResponseCodeIsNotSuccess responseCode) ->
            logger.LogError($"Response code from the notification api wasn't successful: {responseCode}")
