import { Country } from "../../types/country";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import { Payments, Public, LocationCity, People } from "@mui/icons-material";
import { FavouriteButton } from "../FavouriteButton";
import { Link } from "react-router-dom";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const getCurrencies = () => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Link
        to={`/country/${encodeURIComponent(country.name.common.toLowerCase())}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="150"
          image={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          sx={{
            objectFit: "cover",
            borderBottom: "1px solid #eee",
          }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" fontWeight={600}>
            {country.name.common}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <Public color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {country.region}
              {country.subregion && ` (${country.subregion})`}
            </Typography>
          </Box>

          {country.capital && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <LocationCity color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {country.capital[0]}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <People color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {country.population.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Payments color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {getCurrencies()}
            </Typography>
          </Box>
        </CardContent>
      </Link>

      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <FavouriteButton country={country} />
      </CardActions>
    </Card>
  );
};

export default CountryCard;
