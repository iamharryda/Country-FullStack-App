import {
  Box,
  Typography,
  Card,
  Grid,
  CardContent,
  Divider,
} from "@mui/material";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { format } from "date-fns";
import { useWeather } from "../../api/services/weather";

interface WeatherDisplayProps {
  city: string;
}

const WeatherDisplay = ({ city }: WeatherDisplayProps) => {
  const { weather, loading, error } = useWeather(city);

  if (loading || !weather) return null;
  if (error) return <Typography color="error">{error}</Typography>;

  const iconCode = weather.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  // Convert sunrise/sunset timestamps to local time
  const formatTime = (timestamp: number) =>
    format(new Date(timestamp * 1000), "p");

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 3,
        width: "100%", // 🔥 full width
      }}
    >
      <CardContent>
        <Grid container spacing={4} alignItems="center">
          {/* Weather Icon + Temp */}
          <Grid item xs={12} md={3} textAlign="center">
            <Box
              component="img"
              src={weatherIconUrl}
              alt={weather.weather[0].description}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h3" fontWeight={700}>
              {Math.round(weather.main.temp)}°C
            </Typography>
            <Typography variant="subtitle2" textTransform="capitalize">
              {weather.weather[0].description}
            </Typography>
          </Grid>

          {/* Main Details */}
          <Grid item xs={12} md={9}>
            <Typography variant="h5" fontWeight={600} mb={2}>
              Weather in {weather.name}, {weather.sys?.country}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={3}>
              <Grid item xs={6} md={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <DeviceThermostatIcon color="action" />
                  <Typography variant="body2">
                    Feels Like: {Math.round(weather.main.feels_like)}°C
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} md={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <WaterIcon color="action" />
                  <Typography variant="body2">
                    Humidity: {weather.main.humidity}%
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} md={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AirIcon color="action" />
                  <Typography variant="body2">
                    Wind: {weather.wind.speed} m/s
                  </Typography>
                </Box>
              </Grid>

              {weather.sys.sunrise && (
                <Grid item xs={6} md={4}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <WbSunnyIcon color="action" />
                    <Typography variant="body2">
                      Sunrise: {formatTime(weather.sys.sunrise)}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {weather.sys.sunset && (
                <Grid item xs={6} md={4}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <WbSunnyIcon color="disabled" />
                    <Typography variant="body2">
                      Sunset: {formatTime(weather.sys.sunset)}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
