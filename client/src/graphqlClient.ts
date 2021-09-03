import { createClient } from "urql"

console.log("url", process.env.REACT_APP_ORDER_API_URL)
export const client = createClient({
  url: process.env.REACT_APP_ORDER_API_URL as string,
})
