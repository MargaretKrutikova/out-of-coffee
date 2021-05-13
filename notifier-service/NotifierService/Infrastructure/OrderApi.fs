namespace NotifierService.Services

open FSharp.Data.GraphQL

type OrderProvider = GraphQLProvider<"order_schema.json">

module OrderApi =
    let fetchOrderById (context: GraphQLProviderRuntimeContext) (orderId: int) =
        let operation =
          OrderProvider.Operation<"""
            query OrderById($id: Int!) {
              orders_by_pk(id: $id) {
                id
                order_date
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
        // let runtimeContext = OrderProvider.GetContext(serverUrl = graphqlApiUrl)
        operation.AsyncRun(id = orderId, runtimeContext = context)
