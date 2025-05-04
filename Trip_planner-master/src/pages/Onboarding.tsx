import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  CircularProgress,
  Fade,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../App';

const travelGroups = [
  { label: 'Solo', value: 'solo', icon: <PersonIcon /> },
  { label: 'Couple', value: 'couple', icon: <FavoriteIcon /> },
  { label: 'Family', value: 'family', icon: <GroupIcon /> },
  { label: 'Friends', value: 'friends', icon: <PeopleIcon /> },
];

const durations = [
  '1-3 days',
  '4-7 days',
  '1-2 weeks',
  '2+ weeks',
];

const Onboarding = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [travelWith, setTravelWith] = useState('solo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useColorMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleContinue = () => {
    setError('');
    if (!destination || !duration) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('onboarding', JSON.stringify({ destination, duration, travelWith }));
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  // Figma-like background gradient
  const background = theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #181A20 0%, #23263A 100%)'
    : 'linear-gradient(135deg, #F5F6FA 0%, #E3E8F0 100%)';

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: background,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: isMobile ? 3 : 5,
            borderRadius: 5,
            maxWidth: 400,
            width: '100%',
            boxShadow: '0 8px 32px 0 #0004',
            position: 'relative',
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Toggle Button */}
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{ position: 'absolute', top: 24, right: 24 }}
            aria-label="toggle dark/light mode"
            size="large"
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              color: 'text.primary',
              fontWeight: 800,
              mb: 1.5,
              textAlign: 'center',
              letterSpacing: '-1px',
              mt: 2,
            }}
          >
            Plan Your Journey, Your Way!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              textAlign: 'center',
              fontWeight: 500,
              fontSize: isMobile ? '1rem' : '1.1rem',
            }}
          >
            Let us help you personalize and explore.
          </Typography>
          <TextField
            label="Where would you like to go?"
            variant="filled"
            fullWidth
            value={destination}
            onChange={e => setDestination(e.target.value)}
            sx={{ mb: 3, input: { color: 'text.primary', fontWeight: 500 }, label: { color: 'text.secondary' } }}
            disabled={loading}
            InputProps={{ style: { color: theme.palette.text.primary, fontWeight: 500 } }}
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <TextField
            label="How long will you stay?"
            variant="filled"
            fullWidth
            select
            value={duration}
            onChange={e => setDuration(e.target.value)}
            sx={{ mb: 3, input: { color: 'text.primary', fontWeight: 500 }, label: { color: 'text.secondary' } }}
            disabled={loading}
            InputProps={{ style: { color: theme.palette.text.primary, fontWeight: 500 } }}
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            SelectProps={{ native: true }}
          >
            <option value="" disabled>Select duration</option>
            {durations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </TextField>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 1.5,
              fontWeight: 600,
              alignSelf: 'flex-start',
            }}
          >
            Who are you traveling with?
          </Typography>
          <ToggleButtonGroup
            value={travelWith}
            exclusive
            onChange={(_, val) => val && setTravelWith(val)}
            fullWidth
            sx={{ mb: 4, gap: 1 }}
            disabled={loading}
          >
            {travelGroups.map(group => (
              <ToggleButton
                key={group.value}
                value={group.value}
                sx={{
                  color: 'text.primary',
                  borderColor: theme.palette.divider,
                  borderRadius: 2,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                {group.icon}
                <span style={{ marginTop: 4 }}>{group.label}</span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {error && (
            <Typography variant="caption" sx={{ color: 'error.main', mb: 1, display: 'block', textAlign: 'center' }}>{error}</Typography>
          )}
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                borderRadius: 3,
                fontWeight: 800,
                minHeight: 52,
                fontSize: isMobile ? '1rem' : '1.1rem',
                boxShadow: '0 2px 8px 0 #1976d233',
                mt: 1,
              }}
              onClick={handleContinue}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Continue'}
            </Button>
            {loading && (
              <CircularProgress size={28} sx={{ color: 'primary.main', position: 'absolute', top: '50%', left: '50%', mt: '-14px', ml: '-14px' }} />
            )}
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Onboarding; 