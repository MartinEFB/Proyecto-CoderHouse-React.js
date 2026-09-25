import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

const Item = ({ data, children }) => {
  const stock = Number(data?.stock) || 0;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 2,
      }}
    >
      <Box sx={{ position: "relative", bgcolor: "grey.100" }}>
        <CardMedia
          component="img"
          image={data?.img || data?.image}
          alt={data?.title || "Producto"}
          sx={{ aspectRatio: "1 / 1", objectFit: "cover" }}
        />

        {stock === 0 && (
          <Chip
            label="Agotado"
            size="small"
            color="error"
            sx={{ position: "absolute", top: 12, right: 12, fontWeight: 700 }}
          />
        )}
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.5 }}
      >
        <Typography variant="subtitle1">{data?.title}</Typography>

        {data?.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {data.description}
          </Typography>
        )}

        <Typography variant="h6" sx={{ mt: 1 }}>
          ${data?.price}
        </Typography>

        {stock === 0 ? (
          <Typography variant="body2" color="error" fontWeight={700}>
            Producto Agotado
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Stock: {stock}
          </Typography>
        )}

        <Box sx={{ mt: "auto", pt: 1.5 }}>{children}</Box>
      </CardContent>
    </Card>
  );
};

export default Item;
