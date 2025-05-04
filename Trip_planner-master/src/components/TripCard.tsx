import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Trip } from '../types';

interface TripCardProps extends Trip {}

const TripCard: React.FC<TripCardProps> = ({
  title,
  destination,
  startDate,
  endDate,
  imageUrl,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 6,
        overflow: 'hidden',
        position: 'relative',
        background: 'none',
      }}
    >
      <Box
        sx={{
          height: 180,
          backgroundImage: `linear-gradient(to top, rgba(24,24,24,0.85) 60%, rgba(24,24,24,0.2)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900, color: '#fff', mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
          {destination}
        </Typography>
      </Box>
      <CardContent sx={{ flexGrow: 1, backgroundColor: 'background.paper', p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TripCard; 