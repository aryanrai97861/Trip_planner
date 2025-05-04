import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Application
      </Typography>
      <Typography variant="body1">
        This is the main content area. The left and right panes can be toggled using the menu buttons.
      </Typography>
    </Box>
  );
};

export default Home; 