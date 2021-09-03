import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AppBar } from "components/navigation/AppBar";

import { NotFoundPage } from "pages/NotFoundPage";
import { HomePage } from "pages/home/HomePage";
import { AdminRoutes, Routes } from "./routes";
import { CurrentOrderPage } from "pages/currentOrder/CurrentOrderPage";
import { AdminNotificationsPage } from "pages/admin/AdminNotificationsPage";
import { AdminBaseOrderPage } from "../pages/admin/AdminBaseOrderPage";

type Props = {
  appTitle: string;
};

export const AppRouter = (props: Props) => (
  <Router>
    <AppBar title={props.appTitle} />
    <Switch>
      <Route exact path={Routes.HOME} component={HomePage} />
      <Route exact path={Routes.ONGOING_ORDER} component={CurrentOrderPage} />

      <Route
        exact
        path={AdminRoutes.NOTIFICATIONS}
        component={AdminNotificationsPage}
      />

      <Route
        exact
        path={AdminRoutes.BASE_ORDER}
        component={AdminBaseOrderPage}
      />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </Router>
);
