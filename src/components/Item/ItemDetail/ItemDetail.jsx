import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CartContext } from "../../Cart/CartContext";
import ItemCount from "./ItemCount";

const ItemDetail = ({ item }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem, getItemQuantity } = useContext(CartContext);
  const remainingStock = Math.max(item.stock - getItemQuantity(item.id), 0);

  const handleAdd = (quantity) => {
    const addedQuantity = addItem(item, quantity);
    setQuantityAdded(addedQuantity);
  };

  return (
    <Card>
      <Stack direction={{ xs: "column", md: "row" }}>
        <CardMedia
          component="img"
          image={item.img || item.image}
          alt={item.title}
          sx={{ width: { md: 360 }, maxHeight: 360, objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h2">{item.title}</Typography>
          {item.description && <Typography>{item.description}</Typography>}
          <Typography variant="h6">Precio: ${item.price}</Typography>
          <Typography>Stock disponible: {item.stock}</Typography>
          {item.category && <Typography>Categoría: {item.category}</Typography>}
          {quantityAdded > 0 ? (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Alert severity="success">
                Agregaste {quantityAdded} unidad(es) al carrito.
              </Alert>
              <Button
                component={RouterLink}
                to="/cart"
                variant="contained"
                sx={{ alignSelf: "start" }}
              >
                Ir al carrito
              </Button>
            </Stack>
          ) : (
            <ItemCount stock={remainingStock} initial={1} onAdd={handleAdd} />
          )}
        </CardContent>
      </Stack>
    </Card>
  );
};

export default ItemDetail;
