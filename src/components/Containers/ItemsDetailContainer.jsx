import { Alert, CircularProgress, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import ItemDetail from "../Item/ItemDetail/ItemDetail";

const ItemsDetailContainer = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);

      try {
        const itemRef = doc(db, "items", itemId);
        const itemSnapshot = await getDoc(itemRef);

        if (itemSnapshot.exists()) {
          setItem({ id: itemSnapshot.id, ...itemSnapshot.data() });
        } else {
          setItem(null);
        }
      } catch (fetchError) {
        console.error("Error al traer el producto: ", fetchError);
        setError(
          "No pudimos cargar el producto. Intentá nuevamente más tarde.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return <CircularProgress aria-label="Cargando producto" />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!item) {
    return <Typography>El producto solicitado no existe.</Typography>;
  }

  return <ItemDetail item={item} key={item.id} />;
};

export default ItemsDetailContainer;
