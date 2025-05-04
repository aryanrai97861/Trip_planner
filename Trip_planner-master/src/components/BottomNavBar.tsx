import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

interface BottomNavBarProps {
  showThirdPane: boolean;
  onToggleThirdPane: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ showThirdPane, onToggleThirdPane }) => {
  const [value, setValue] = React.useState(0);

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Calendar" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction 
          label={showThirdPane ? 'Close' : 'Add Trip'}
          icon={showThirdPane ? <CloseIcon /> : <AddIcon />}
          onClick={onToggleThirdPane}
        />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar; 