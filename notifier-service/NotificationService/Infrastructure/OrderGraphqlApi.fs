namespace NotificationService.Services

open System
open FSharp.Data.GraphQL
open NotificationService.Services
open NotificationService.Services.Types
open NotificationService.Services.Types.Errors

type OrderGraphqlProvider = GraphQLProvider<"order_schema.json">

module OrderStatus =
    let fromString (statusStr: string): OrderStatus =
        match statusStr with
        | "ongoing" -> Ongoing
        | "delivered" -> Delivered
        | "pending" -> Pending
        | _ -> failwith $"Unknown order status: {statusStr}"

    let toString (status: OrderStatus): string =
        match status with
        | Ongoing -> "ongoing"
        | Delivered -> "delivered"
        | Pending -> "pending"

module OrderGraphqlApi =
    let createRuntimeContext (graphqlApiUrl: string) =
        OrderGraphqlProvider.GetContext(serverUrl = graphqlApiUrl)

    let fetchOrderById (context: GraphQLProviderRuntimeContext) (orderId: int): Async<Result<Order, OrderApiError>> =
        let operation =
            OrderGraphqlProvider.Operation<"""
            query OrderById($id: Int!) {
              orders_by_pk(id: $id) {
                id
                status
                order_date
                order_items {
                  item {
                    name
                    link
                  }
                  quantity
                }
              }
            }
            """>()

        async {
            try
                let! result = operation.AsyncRun(id = orderId, runtimeContext = context)

                match result.Data
                      |> Option.bind (fun d -> d.Orders_by_pk) with
                | None -> return Error OrderApiError.OrderNotFound
                | Some orderData ->
                    let orderItems =
                        orderData.Order_items
                        |> Seq.map (fun i ->
                            { name = i.Item.Name
                              link = i.Item.Link
                              quantity = i.Quantity })
                        |> Seq.toList

                    let orderDate = DateTime.Parse orderData.Order_date

                    let order =
                        { id = orderData.Id
                          items = orderItems
                          status = OrderStatus.fromString orderData.Status
                          date = orderDate }

                    return Ok order
            with error -> return Error(OrderApiError.NetworkError error)
        }

    let updateOrderStatus (context: GraphQLProviderRuntimeContext) (orderStatus: OrderStatus) (orderId: int) =
        let mutation =
            OrderGraphqlProvider.Operation<"""
            mutation UpdateOrderById($id: Int!, $status: String!) {
              update_orders_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
                status
              }
            }
            """>()

        async {
            try
                let! result =
                    mutation.AsyncRun(id = orderId, status = OrderStatus.toString orderStatus, runtimeContext = context)

                match result.Data
                      |> Option.bind (fun d -> d.Update_orders_by_pk) with
                | None -> return Error OrderApiError.OrderNotFound
                | Some _ -> return Ok()
            with error -> return Error(OrderApiError.NetworkError error)
        }
