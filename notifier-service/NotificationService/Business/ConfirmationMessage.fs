module NotificationService.Business.ConfirmationMessage

open System
open NotificationService.Services.Types

let private getNextMondayDate (date: DateTime) =
    let daysToAdd = ((int) date.DayOfWeek - (int)DayOfWeek.Monday + 7) % 7
    date.AddDays((float) daysToAdd)

let private formatOrderItem (item: OrderItem) =
    let orderItemName = item.link |> Option.defaultValue item.name
    $"- {orderItemName}, {item.quantity}\n"

let private createMessageHeader (order: Order) =
    let orderDueDate = getNextMondayDate order.date
    let formattedDate = orderDueDate.ToString("yyyy-MM-dd")
    $"Till {formattedDate}:\n"

let createConfirmationMessageForOrder (order: Order): string =
    let orderItemsStr =
        order.items
        |> Seq.map formatOrderItem
        |> String.concat ""
    
    $"{createMessageHeader order}{orderItemsStr}"    