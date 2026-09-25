import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ItemListContainer from "../../components/Containers/ItemListContainer";

const Catalog = () => {
  const { categoryId } = useParams();
  const title = categoryId ? `Categoría: ${categoryId}` : "Catálogo";
  return (
    <section>
      <Typography variant="h1">{title}</Typography>
      <ItemListContainer categoryId={categoryId} />
    </section>
  );
};

export default Catalog;
