import { createClient } from "urql";

console.log("url", process.env.REACT_APP_ORDER_API_URL);
export const client = createClient({
  url: process.env.REACT_APP_ORDER_API_URL as string,
  fetchOptions: {
    headers: {
      "x-hasura-admin-secret": process.env.REACT_APP_API_KEY as string,
    },
  },
});
