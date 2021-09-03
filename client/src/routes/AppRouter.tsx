import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AppBar } from "components/navigation/AppBar";

import { NotFoundPage } from "pages/NotFoundPage";
import { HomePage } from "pages/home/HomePage";
import { Routes } from "./routes";
import { CurrentOrderPage } from "pages/currentOrder/CurrentOrderPage";
import { AdminPage } from "pages/admin/AdminPage";

type Props = {
  appTitle: string;
};

export const AppRouter = (props: Props) => (
  <Router>
    <AppBar title={props.appTitle} />
    <Switch>
      <Route exact path={Routes.HOME} component={HomePage} />
      <Route exact path={Routes.ONGOING_ORDER} component={CurrentOrderPage} />
      <Route exact path={Routes.ADMIN} component={AdminPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  </Router>
);
