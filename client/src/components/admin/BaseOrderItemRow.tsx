import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import { BaseOrderItem } from "../../api/adminApi";

type Props = {
  orderItem: BaseOrderItem;
  deleteItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: string) => void;
};

export const BaseOrderItemRow = ({
  orderItem: { item, quantity },
  deleteItem,
  updateQuantity,
}: Props) => {
  const [quantityValue, setQuantityValue] = React.useState(quantity);

  React.useEffect(() => {
    setQuantityValue(quantity);
  }, [quantity]);

  return (
    <TableRow key={item.name}>
      <TableCell component="th" scope="row">
        {item.link ? (
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        ) : (
          item.name
        )}
      </TableCell>
      <TableCell>
        <TextField
          margin="none"
          variant="standard"
          value={quantityValue}
          style={{ maxWidth: 70 }}
          onBlur={() => updateQuantity(item.id, quantityValue)}
          onChange={(e) => setQuantityValue(e.target.value)}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        <IconButton
          size="small"
          onClick={() => deleteItem(item.id)}
          color="primary"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
