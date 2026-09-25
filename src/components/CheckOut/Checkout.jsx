import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const initialForm = {
  nombre: "",
  apellido: "",
  dni: "",
  direccion: "",
};

const Checkout = ({
  cart,
  total,
  loading,
  error,
  orderId,
  onSubmit,
  onGoToHome,
}) => {
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(form);

    if (!result.ok) {
      setFormErrors(result.errors || {});
    }
  };

  if (orderId) {
    return (
      <Stack component="section" spacing={2}>
        <Typography variant="h1">¡Compra realizada con éxito!</Typography>
        <Typography>
          Tu número de orden es: <strong>{orderId}</strong>
        </Typography>
        <Button
          variant="contained"
          onClick={onGoToHome}
          sx={{ alignSelf: "start" }}
        >
          Volver al inicio
        </Button>
      </Stack>
    );
  }

  if (!cart || cart.length === 0) {
    return <Typography variant="h1">Tu carrito está vacío.</Typography>;
  }

  return (
    <Stack component="section" spacing={3}>
      <Typography variant="h1">Finalizar compra</Typography>

      <Stack spacing={1}>
        <Typography variant="h2">Resumen del pedido</Typography>
        {cart.map((item) => (
          <Typography key={item.id}>
            {item.title} x {item.quantity} — ${item.price * item.quantity}
          </Typography>
        ))}
        <Typography variant="h6">Total: ${total}</Typography>
      </Stack>

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400 }}
      >
        <TextField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          error={Boolean(formErrors.nombre)}
          helperText={formErrors.nombre}
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          error={Boolean(formErrors.apellido)}
          helperText={formErrors.apellido}
        />
        <TextField
          label="DNI"
          name="dni"
          value={form.dni}
          onChange={handleChange}
          error={Boolean(formErrors.dni)}
          helperText={formErrors.dni}
        />
        <TextField
          label="Dirección fiscal"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          error={Boolean(formErrors.direccion)}
          helperText={formErrors.direccion}
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ alignSelf: "start" }}
        >
          {loading ? <CircularProgress size={24} /> : "Confirmar compra"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Checkout;
