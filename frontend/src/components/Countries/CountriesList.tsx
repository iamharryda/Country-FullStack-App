import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAlLCountries } from "../../store/slices/countriesSlices";
import CountryCard from "./CountryCard";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector(
    (state) => state.countries
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAlLCountries());
  }, [dispatch]);

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((country) =>
        regionFilter ? country.region === regionFilter : true
      );
  }, [countries, searchTerm, regionFilter]);

  if (loading)
    return <Typography variant="h6">Loading countries...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Countries
      </Typography>

      {/* Filters */}
      <Box
  display="flex"
  flexWrap="wrap"
  gap={2}
  mb={4}
  sx={{ flexDirection: { xs: "column", sm: "row" } }}
>
  <TextField
    label="Search by name"
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    fullWidth
    sx={{
      flex: 3,
      minWidth: { xs: "100%", sm: "300px", md: "400px" },
    }}
  />

  <FormControl
    variant="outlined"
    sx={{
      flex: 1,
      minWidth: { xs: "100%", sm: "200px", md: "250px" },
    }}
  >
    <InputLabel id="region-filter-label">Filter by region</InputLabel>
    <Select
      labelId="region-filter-label"
      value={regionFilter}
      label="Filter by region"
      onChange={(e) => setRegionFilter(e.target.value)}
    >
      <MenuItem value="">All Regions</MenuItem>
      <MenuItem value="Africa">Africa</MenuItem>
      <MenuItem value="Americas">Americas</MenuItem>
      <MenuItem value="Asia">Asia</MenuItem>
      <MenuItem value="Europe">Europe</MenuItem>
      <MenuItem value="Oceania">Oceania</MenuItem>
    </Select>
  </FormControl>
</Box>

      {/* Country Cards */}
      <Grid container spacing={3}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
              <CountryCard
                country={{
                  name: {
                    common: country.name.common,
                    official: country.name.official,
                  },
                  capital: country.capital || ["N/A"],
                  population: country.population,
                  flags: {
                    png: country.flags.png,
                    svg: country.flags.svg,
                  },
                  region: country.region || "Unknown",
                  subregion: country.subregion || "Unknown",
                  cca3: country.cca3,
                  currencies: country.currencies,
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" mt={2}>
            No countries found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CountriesList;
