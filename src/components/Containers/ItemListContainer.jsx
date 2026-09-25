import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import ItemList from "../Item/ItemList";

const ItemListContainer = ({ categoryId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const itemsCollection = collection(db, "items");
        const itemsQuery = categoryId
          ? query(itemsCollection, where("category", "==", categoryId))
          : query(itemsCollection);
        const querySnapshot = await getDocs(itemsQuery);
        const itemsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(itemsArray);
      } catch (fetchError) {
        console.error("Error al traer los documentos: ", fetchError);
        setError(
          "No pudimos cargar los productos. Intentá nuevamente más tarde.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  if (loading) {
    return <CircularProgress aria-label="Cargando productos" />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (items.length === 0) {
    return (
      <Stack spacing={1}>
        <Typography variant="h2">No hay productos disponibles</Typography>
        <Typography>Volvé pronto para conocer las novedades.</Typography>
      </Stack>
    );
  }

  return <ItemList items={items} />;
};

export default ItemListContainer;
