import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const availableStock = Number(stock) || 0;
  const initialCount =
    availableStock > 0 ? Math.min(Math.max(initial, 1), availableStock) : 0;
  const [count, setCount] = useState(initialCount);

  const canDecrease = count > 1;
  const canIncrease = count < availableStock;
  const canAdd = count > 0 && count <= availableStock;

  if (availableStock === 0) {
    return <Typography color="error">Producto sin stock.</Typography>;
  }

  return (
    <Stack spacing={1} sx={{ mt: 2 }}>
      <Typography>Cantidad: {count}</Typography>
      <Stack direction="row" spacing={1}>
        <Button onClick={() => setCount(count - 1)} disabled={!canDecrease}>
          −
        </Button>
        <Button onClick={() => setCount(count + 1)} disabled={!canIncrease}>
          +
        </Button>
      </Stack>
      <Button
        variant="contained"
        onClick={() => onAdd(count)}
        disabled={!canAdd}
      >
        Agregar al carrito
      </Button>
    </Stack>
  );
};

export default ItemCount;
