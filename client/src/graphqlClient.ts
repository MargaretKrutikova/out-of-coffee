import { createClient } from "urql"

export const client = createClient({
  url: process.env.REACT_APP_ORDER_API_URL as string,
})
