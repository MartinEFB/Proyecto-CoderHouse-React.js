import { Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => (
  <Stack component="section" spacing={2}>
    <Typography variant="h1">Página no encontrada</Typography>
    <Button
      component={RouterLink}
      to="/"
      variant="contained"
      sx={{ alignSelf: "start" }}
    >
      Volver al inicio
    </Button>
  </Stack>
);

export default NotFound;
