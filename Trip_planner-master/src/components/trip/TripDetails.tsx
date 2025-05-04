import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
} from '@mui/material';
import { Trip, Activity } from '../../types';
import { motion } from 'framer-motion';

interface TripDetailsProps {
  trip: Trip | null;
  onActivitySelect: (activity: Activity) => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({ trip, onActivitySelect }) => {
  if (!trip) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a trip to view details
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {trip.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {trip.description}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
        {trip.destinations.map((destination) => (
          <Card
            key={destination.id}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{ mb: 2 }}
          >
            <CardMedia
              component="img"
              height="200"
              image={destination.imageUrl}
              alt={destination.name}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {destination.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {destination.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {destination.location}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Activities
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {trip.activities.map((activity) => (
          <Card
            key={activity.id}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            onClick={() => onActivitySelect(activity)}
            sx={{ cursor: 'pointer', flex: '1 1 calc(50% - 8px)', minWidth: '300px' }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {activity.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {activity.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(activity.startTime).toLocaleDateString()} at{' '}
                {new Date(activity.startTime).toLocaleTimeString()}
              </Typography>
              {activity.status && (
                <Chip
                  label={activity.status}
                  color={
                    activity.status === 'completed'
                      ? 'success'
                      : activity.status === 'cancelled'
                      ? 'error'
                      : 'primary'
                  }
                  size="small"
                  sx={{ mt: 1 }}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TripDetails; 