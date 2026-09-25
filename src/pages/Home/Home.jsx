import { Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home = () => (
  <Stack component="section" spacing={2}>
    <Typography variant="h1">Tecnología para tu día a día</Typography>
    <Typography>Explorá nuestro catálogo de productos tecnológicos.</Typography>
    <Button
      component={RouterLink}
      to="/catalog"
      variant="contained"
      sx={{ alignSelf: "start" }}
    >
      Ver catálogo
    </Button>
  </Stack>
);

export default Home;
