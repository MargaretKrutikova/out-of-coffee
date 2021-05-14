namespace NotificationService.Services

open System
open FSharp.Data.GraphQL
open NotificationService.Services.Types
open NotificationService.Services.Types.Errors

type OrderGraphqlProvider = GraphQLProvider<"order_schema.json">

module OrderGraphqlApi =
    let createRuntimeContext (graphqlApiUrl: string) =
      OrderGraphqlProvider.GetContext(serverUrl = graphqlApiUrl)

    let private toOrderStatus (statusStr: string): OrderStatus =
      match statusStr with
      | "ongoing" -> Ongoing
      | "delivered" -> Delivered
      | "pending" -> Pending
      | _ -> failwith $"Unknown order status: {statusStr}"
    
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
             match result.Data |> Option.bind (fun d -> d.Orders_by_pk) with
             | None -> return Error OrderApiError.OrderNotFound
             | Some orderData ->
                let orderItems =
                  orderData.Order_items
                  |> Seq.map (fun i -> { name = i.Item.Name; link = i.Item.Link; quantity = i.Quantity })
                  |> Seq.toList
                 
                let orderDate = DateTime.Parse orderData.Order_date;
                let order = {
                  id = orderData.Id
                  items = orderItems
                  status = toOrderStatus orderData.Status
                  date = orderDate
                }
                
                return Ok order
          with error ->
            return Error (OrderApiError.NetworkError error)
        }