open Farmer
open Farmer.Builders

let notificationServiceWebApp = webApp {
    name "food-order-notification-service"
    sku WebApp.Sku.F1
    zip_deploy @""
}

let deployment = arm {
    location Location.NorthEurope
    add_resource notificationServiceWebApp
}

deployment |> Writer.quickWrite "notification-service-arm-template"

deployment |> Deploy.execute "food-order-notification-service-rg" [] |> ignore

