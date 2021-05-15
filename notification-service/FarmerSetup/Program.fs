open Farmer
open Farmer.Builders

let notificationServiceWebApp = webApp {
    name "food-order-notification-service"
    sku WebApp.Sku.F1
}

let deployment = arm {
    location Location.NorthEurope
    add_resource notificationServiceWebApp
}

deployment |> Deploy.execute "food-order-notification-service-rg" [] |> ignore
