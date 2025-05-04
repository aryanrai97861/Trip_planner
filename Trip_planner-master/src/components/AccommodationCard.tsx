import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Accommodation } from '../types';

interface AccommodationCardProps extends Accommodation {}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  name,
  location,
  checkIn,
  checkOut,
  cost,
  bookingReference,
}) => {
  return (
    <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 6, overflow: 'hidden', background: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 800 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ fontWeight: 500 }}>
          {location}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Check-in: {new Date(checkIn).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check-out: {new Date(checkOut).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cost: ${cost}
          </Typography>
          {bookingReference && (
            <Typography variant="body2" color="text.secondary">
              Booking Ref: {bookingReference}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard; 