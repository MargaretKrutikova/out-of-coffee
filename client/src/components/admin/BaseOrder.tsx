import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {
  BaseOrderItem,
  DELETE_BASE_ORDER_ITEM_MUTATION,
  UpdateBaseOrderItemInputVariables,
  UPDATE_BASE_ORDER_ITEM_MUTATION,
} from "../../api/adminApi";
import { BaseOrderItemRow } from "./BaseOrderItemRow";
import { useMutation } from "urql";

type Props = {
  items: BaseOrderItem[];
};

export const BaseOrder = ({ items }: Props) => {
  const [, deleteBaseOrderItem] = useMutation(DELETE_BASE_ORDER_ITEM_MUTATION);
  const [, updateBaseOrderItem] = useMutation<
    any,
    UpdateBaseOrderItemInputVariables
  >(UPDATE_BASE_ORDER_ITEM_MUTATION);

  const handleQuantityChange = (itemId: number, quantity: string) =>
    updateBaseOrderItem({
      item_id: itemId,
      quantity: quantity,
    });

  const deleteItem = (itemId: number) => deleteBaseOrderItem({ itemId });

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell>Antal</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <BaseOrderItemRow
                key={item.item.id}
                orderItem={item}
                deleteItem={deleteItem}
                updateQuantity={handleQuantityChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
