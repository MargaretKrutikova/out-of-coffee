import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AdminPage } from "./AdminPage"
import { CurrentOrderPage } from "./CurrentOrderPage"

export const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/">
            <CurrentOrderPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
