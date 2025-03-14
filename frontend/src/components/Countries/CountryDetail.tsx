import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selectAllCountries,
  selectCountriesError,
  selectCountriesLoading,
} from "../../store/slices/countriesSlices";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useWeather } from "../../api/services/weather";

const CountryDetail = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);

  const country = countries.find(
    (country) => country.name.common.toLowerCase() === name?.toLowerCase()
  );

  console.log(useWeather)

  useEffect(() => {
    if (!country) {
      dispatch(fetchAlLCountries());
    }
  }, [country, dispatch]);
  if (loading) return <CircularProgress/>
  if (error) return <h3>{error}</h3>;
  if (!country) return <h3>Country not found. Please try again.</h3>;

  return (
    <div className="country-detail">
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <p>Capital: {country.capital?.[0] || "N/A"}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
    </div>
  );
};

export default CountryDetail;
