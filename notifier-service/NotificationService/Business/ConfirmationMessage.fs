module NotificationService.Business.ConfirmationMessage

open NotificationService.Services.Types

let private formatOrderItem (item: OrderItem) =
    let orderItemName = item.link |> Option.defaultValue item.name
    $"- {orderItemName}, {item.quantity}\n"

let createConfirmationMessageForOrder (order: Order): string =
    order.items
    |> Seq.map formatOrderItem
    |> String.concat ""    