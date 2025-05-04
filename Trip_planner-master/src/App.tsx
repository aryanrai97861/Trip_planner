import React, { useMemo, useState, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme as baseTheme } from './styles/theme';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  // Create theme based on mode
  const theme = useMemo(() =>
    createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode,
        background: {
          default: mode === 'dark' ? '#181A20' : '#F5F5F5',
          paper: mode === 'dark' ? '#23263A' : '#fff',
        },
        text: {
          primary: mode === 'dark' ? '#fff' : '#181A20',
          secondary: mode === 'dark' ? '#b0b3c6' : '#555',
        },
      },
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/onboarding" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
