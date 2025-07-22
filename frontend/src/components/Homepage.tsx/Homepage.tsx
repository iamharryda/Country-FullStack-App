import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import CloudIcon from "@mui/icons-material/Cloud";
import FavoriteIcon from "@mui/icons-material/Favorite";
import heroImage from '../../../public/greg-rosenke-1TjORT2dLOw-unsplash.jpg'

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Discover the World 🌎
        </Typography>
        <Typography variant="h5" maxWidth={700} mb={3}>
          Browse countries, get live weather updates, and manage your favorites.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
          onClick={() => navigate("/countries")}
        >
          Get Started
        </Button>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Features
        </Typography>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ p: 3, textAlign: "center" }}>
              <ExploreIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Country Explorer
              </Typography>
              <Typography>
                Browse all countries with details like population, capital,
                region, and more.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ p: 3, textAlign: "center" }}>
              <CloudIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Live Weather
              </Typography>
              <Typography>
                Stay updated with real-time weather details of capital cities.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ p: 3, textAlign: "center" }}>
              <FavoriteIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Your Favorites
              </Typography>
              <Typography>
                Add countries to your favorites and manage your personalized
                list.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box textAlign="center" py={6} bgcolor="#f4f6f8">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Ready to explore?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/countries")}
        >
          Start Browsing
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;
