import React, { useState, ReactNode } from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import ThirdPaneContent from './ThirdPaneContent';
import { Trip } from '../types';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showThirdPane, setShowThirdPane] = useState(false);

  const handleAddTrip = (trip: Omit<Trip, 'id'>) => {
    // TODO: Implement API call to add trip
    console.log('Adding trip:', trip);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${showThirdPane ? '600px' : '300px'})` },
          ml: { sm: showThirdPane ? '300px' : 0 },
        }}
      >
        {children ? children : <Outlet />}
      </Box>

      {/* Third Pane */}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: showThirdPane ? 300 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: showThirdPane ? 300 : 0,
            boxSizing: 'border-box',
          },
        }}
      >
        {showThirdPane && (
          <ThirdPaneContent
            onClose={() => setShowThirdPane(false)}
            onSubmit={handleAddTrip}
          />
        )}
      </Drawer>

      {/* Bottom Navigation */}
      {isMobile && (
        <BottomNavBar
          showThirdPane={showThirdPane}
          onToggleThirdPane={() => setShowThirdPane(!showThirdPane)}
        />
      )}
    </Box>
  );
};

export default Layout; 