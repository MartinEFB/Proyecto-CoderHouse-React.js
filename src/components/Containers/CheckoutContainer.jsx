import {
  collection,
  addDoc,
  doc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { CartContext } from "../Cart/CartContext";
import Checkout from "../CheckOut/Checkout";

const CheckoutContainer = () => {
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const validateForm = (form) => {
    const errors = {};

    if (!form.nombre.trim()) errors.nombre = "El nombre es obligatorio";
    if (!form.apellido.trim()) errors.apellido = "El apellido es obligatorio";

    if (!form.dni.trim()) {
      errors.dni = "El DNI es obligatorio";
    } else if (!/^\d{7,8}$/.test(form.dni.trim())) {
      errors.dni = "El DNI debe tener 7 u 8 dígitos numéricos";
    }

    if (!form.direccion.trim()) {
      errors.direccion = "La dirección fiscal es obligatoria";
    }

    return errors;
  };

  const handleCreateOrder = async (form) => {
    setError(null);

    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return { ok: false, errors: {} };
    }

    setLoading(true);

    try {
      const order = {
        buyer: {
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
          dni: form.dni.trim(),
          direccion: form.direccion.trim(),
        },
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
        total: totalPrice,
        date: serverTimestamp(),
      };

      const ordersRef = collection(db, "orders");
      const newOrderRef = await addDoc(ordersRef, order);

      const batch = writeBatch(db);

      cart.forEach((item) => {
        const itemRef = doc(db, "items", item.id);
        batch.update(itemRef, {
          stock: item.stock - item.quantity,
        });
      });

      await batch.commit();

      clearCart();
      setOrderId(newOrderRef.id);

      return { ok: true, orderId: newOrderRef.id };
    } catch (err) {
      console.error("Error al generar la orden:", err);
      setError("Ocurrió un error al procesar tu compra. Intentá nuevamente.");
      return { ok: false, errors: {} };
    } finally {
      setLoading(false);
    }
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <Checkout
      cart={cart}
      total={totalPrice}
      loading={loading}
      error={error}
      orderId={orderId}
      onSubmit={handleCreateOrder}
      onGoToHome={handleGoToHome}
    />
  );
};

export default CheckoutContainer;
