namespace NotifierService.Services

open FSharp.Data.GraphQL
open NotifierService.Services.Types
open NotifierService.Services.Types.Errors

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
                  
                let order = { id = orderData.Id; items = orderItems; status = toOrderStatus orderData.Status }
                return Ok order
          with _ ->
            return Error OrderApiError.NetworkError
        }