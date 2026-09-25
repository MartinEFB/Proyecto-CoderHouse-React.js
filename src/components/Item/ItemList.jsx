import { Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Item from "./Item";

const ItemList = ({ items = [] }) => (
  <Grid container spacing={3}>
    {items.map((item) => (
      <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <Item data={item}>
          <Button
            component={RouterLink}
            to={`/item/${item.id}`}
            variant="contained"
            fullWidth
          >
            Ver detalle
          </Button>
        </Item>
      </Grid>
    ))}
  </Grid>
);

export default ItemList;
