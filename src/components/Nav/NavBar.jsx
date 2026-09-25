import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

const categories = [
  { label: "Accesorios", slug: "accesorios" },
  { label: "Notebooks", slug: "notebooks" },
  { label: "Componentes", slug: "componentes" },
  { label: "PCs armadas", slug: "pcs-armadas" },
];

const navLinkStyle = ({ isActive }) => ({
  color: "#111111",
  fontWeight: isActive ? 700 : 500,
  opacity: isActive ? 1 : 0.75,
});

const NavBar = () => {
  return (
    <AppBar
      component="header"
      position="static"
      color="transparent"
      elevation={0}
      sx={{ bgcolor: "background.paper" }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1.5 }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h1"
          sx={{
            textDecoration: "none",
            color: "text.primary",
            mr: 4,
          }}
        >
          TechStore
        </Typography>

        <Stack component="nav" direction="row" spacing={3} sx={{ flexGrow: 1 }}>
          <Button component={NavLink} to="/catalog" style={navLinkStyle}>
            Catálogo
          </Button>
          {categories.map(({ label, slug }) => (
            <Button
              component={NavLink}
              to={`/category/${slug}`}
              style={navLinkStyle}
              key={slug}
            >
              {label}
            </Button>
          ))}
        </Stack>

        <CartWidget />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
