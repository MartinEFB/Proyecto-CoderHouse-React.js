import { Badge, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Button
      component={RouterLink}
      to="/cart"
      color="inherit"
      aria-label="Ir al carrito"
    >
      <Badge badgeContent={totalQuantity} color="primary" showZero>
        <ShoppingCartIcon />
      </Badge>
    </Button>
  );
};

export default CartWidget;
