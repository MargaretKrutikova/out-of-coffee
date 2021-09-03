import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { Provider } from "urql"
import { client } from "./graphqlClient"
import { AppRouter } from "routes/AppRouter"

const APP_TITLE = "Antura Food Orders"

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <AppRouter appTitle={APP_TITLE} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
