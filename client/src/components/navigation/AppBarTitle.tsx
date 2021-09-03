import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

type Props = {
  title: string;
  href: string;
};

export const AppBarTitle = ({ title, href }: Props) => (
  <Typography noWrap variant="h6">
    <Link color="inherit" component={NavLink} to={href}>
      {title}
    </Link>
  </Typography>
);