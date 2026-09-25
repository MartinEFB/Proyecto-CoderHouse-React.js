import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ItemsDetailContainer from "../../components/Containers/ItemsDetailContainer";

const ProductDetail = () => {
  const { itemId } = useParams();
  return (
    <section>
      <Typography variant="h1">Detalle del producto</Typography>
      <ItemsDetailContainer itemId={itemId} />
    </section>
  );
};

export default ProductDetail;
