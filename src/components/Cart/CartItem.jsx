import { Button, Stack, Typography } from "@mui/material";

const CartItem = ({ item, onRemove }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography>{item.title}</Typography>
      <Typography>Cantidad: {item.quantity}</Typography>
      <Typography>Subtotal: ${item.price * item.quantity}</Typography>
      <Button onClick={() => onRemove(item.id)} color="error">
        Eliminar
      </Button>
    </Stack>
  );
};

export default CartItem;
