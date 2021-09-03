import { ReactChild, ReactFragment, ReactPortal } from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  children: ReactChild | ReactFragment | ReactPortal;
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const PageContainer = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      {children}
    </Container>
  );
};
