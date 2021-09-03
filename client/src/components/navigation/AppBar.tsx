import { Routes } from "routes/routes";

import { useState, forwardRef } from "react";

import AppBarMui from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import { AppBarTitle } from "./AppBarTitle";
import { AppMenu } from "./AppMenu";

type Props = {
  title: string;
};

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const AppBar = forwardRef((props: Props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <AppBarMui position="sticky" ref={ref}>
        <Toolbar>
          <ButtonBase
            onClick={() => setIsMenuOpen(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </ButtonBase>
          <Box className={classes.title}>
            <AppBarTitle
              title={props.title}
              href={Routes.HOME}
            />
          </Box>
        </Toolbar>
      </AppBarMui>

      <AppMenu open={isMenuOpen} setOpen={setIsMenuOpen} />
    </>
  );
});