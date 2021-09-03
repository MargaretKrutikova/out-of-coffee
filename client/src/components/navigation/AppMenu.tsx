import { Routes } from "routes/routes";

import { NavLink } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import HistoryIcon from "@material-ui/icons/History";
import ListIcon from "@material-ui/icons/List";
import NotificationsIcon from "@material-ui/icons/Notifications";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const useStyles = makeStyles((theme) => ({
  drawerList: {
    width: 250,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  drawerListIcon: {
    minWidth: theme.spacing(4),
  },
  drawerListDivider: {
    margin: theme.spacing(1, 0),
  },
}));

function isKeyboardEvent(
  event: React.KeyboardEvent | React.MouseEvent
): event is React.KeyboardEvent {
  return event.type === "keydown";
}

const shouldIgnoreEvent = (event: React.KeyboardEvent | React.MouseEvent) =>
  event &&
  isKeyboardEvent(event) &&
  (event.key === "Tab" || event.key === "Shift");

// There are some performance issues with the SwipeableDrawer.
// Material UI recommends you disable some transitions when not on iOS.
// See: https://material-ui.com/components/drawers/#swipeable (v4.11.0)
const isIOS = () =>
  (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

export const AppMenu = (props: Props) => {
  const classes = useStyles();

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (!shouldIgnoreEvent(event)) {
        props.setOpen(isOpen);
      }
    };

  const iOS = isIOS();

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
      open={props.open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <List className={classes.drawerList}>
        <ListItem
          button
          component={NavLink}
          to={Routes.ONGOING_ORDER}
          onClick={toggleDrawer(false)}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Ongoing order" />
        </ListItem>

        <ListItem button onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>

        <Divider className={classes.drawerListDivider} />

        <ListItem
          button
          component={NavLink}
          to={Routes.ADMIN}
          onClick={toggleDrawer(false)}
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" secondary="Order notifications" />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};
