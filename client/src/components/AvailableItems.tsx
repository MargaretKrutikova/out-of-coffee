import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { IconButton, Typography } from "@material-ui/core";

import { Item } from "../api/orderApi";

const useStyles = makeStyles({
  table: {},
});

type Props = {
  items: Item[];
  addItemToOrder: (itemId: number, quantity: string) => void;
};

export const AvailableItems = (props: Props) => {
  const classes = useStyles();

  const defaultQuantity = "1 st";

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Beställdes tidigare
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell align="center">Kategori</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((item) => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  <IconButton
                    size="small"
                    onClick={() =>
                      props.addItemToOrder(item.id, defaultQuantity)
                    }
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell align="center">{item.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
