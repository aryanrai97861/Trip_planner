import React, { useState } from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
}));

const LeftPane = styled(Box)(({ theme }) => ({
  width: '300px',
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto',
}));

const MiddlePane = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto',
}));

const RightPane = styled(Box)(({ theme }) => ({
  width: '300px',
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto',
}));

interface MainLayoutProps {
  leftContent: React.ReactNode;
  middleContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  leftContent,
  middleContent,
  rightContent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isRightPaneOpen, setIsRightPaneOpen] = useState(false);

  const toggleRightPane = () => {
    setIsRightPaneOpen(!isRightPaneOpen);
  };

  if (isMobile) {
    return (
      <MainContent>
        <LeftPane>{leftContent}</LeftPane>
        <MiddlePane>{middleContent}</MiddlePane>
        <Drawer
          anchor="right"
          open={isRightPaneOpen}
          onClose={toggleRightPane}
          sx={{
            '& .MuiDrawer-paper': {
              width: '300px',
              boxSizing: 'border-box',
            },
          }}
        >
          <RightPane>{rightContent}</RightPane>
        </Drawer>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <LeftPane>{leftContent}</LeftPane>
      <MiddlePane>{middleContent}</MiddlePane>
      <RightPane>{rightContent}</RightPane>
    </MainContent>
  );
};

export default MainLayout; 