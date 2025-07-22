import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selectAllCountries,
  selectCountriesError,
  selectCountriesLoading,
} from "../../store/slices/countriesSlices";
import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WeatherDisplay from "../Weather/WeatherDisplay";

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);

  const country = countries.find(
    (country) => country.name.common.toLowerCase() === name?.toLowerCase()
  );

  useEffect(() => {
    if (!country) {
      dispatch(fetchAlLCountries());
    }
  }, [country, dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!country) {
    return (
      <Typography align="center" mt={4}>
        Country not found. Please try again.
      </Typography>
    );
  }

  return (
    <Box maxWidth="lg" mx="auto" mt={4} px={2}>
      {/* Back Button Top */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/countries")}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Back to List
      </Button>

      <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
        <Grid container spacing={4}>
          {/* Flag + Name Section */}
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              image={country.flags.png}
              alt={`${country.name.common} flag`}
              sx={{
                width: "100%",
                height: 240,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Info Section */}
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {country.name.common}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Official Name
                  </Typography>
                  <Typography>{country.name.official}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Capital
                  </Typography>
                  <Typography>{country.capital?.[0] || "N/A"}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Region
                  </Typography>
                  <Typography>{country.region}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subregion
                  </Typography>
                  <Typography>{country.subregion || "N/A"}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Population
                  </Typography>
                  <Typography>
                    {country.population.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Country Code
                  </Typography>
                  <Chip label={country.cca3} color="primary" variant="outlined" />
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>

        {/* Weather Section */}
        <Box mt={4}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Current Weather in {country.capital?.[0] || "N/A"}
          </Typography>
          <WeatherDisplay city={country.capital?.[0] || "Helsinki"} />
        </Box>
      </Card>

      
    </Box>
  );
};

export default CountryDetail;
