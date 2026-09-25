import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import CartItem from "../../components/Cart/CartItem";
import { CartContext } from "../../components/Cart/CartContext";

const Cart = () => {
  const { cart, clearCart, removeItem, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return <Typography variant="h1">Tu carrito está vacío.</Typography>;
  }

  return (
    <Stack component="section" spacing={2}>
      <Typography variant="h1">Carrito</Typography>
      {cart.map((item) => (
        <CartItem item={item} onRemove={removeItem} key={item.id} />
      ))}
      <Typography variant="h2">Total: ${totalPrice}</Typography>
      <Stack direction="row" spacing={1}>
        <Button onClick={clearCart} color="error">Vaciar carrito</Button>
        <Button component={RouterLink} to="/checkout" variant="contained">
          Continuar al checkout
        </Button>
      </Stack>
    </Stack>
  );
};

export default Cart;
