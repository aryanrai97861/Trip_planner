import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Activity } from '../types';

interface ActivityCardProps extends Activity {}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  startTime,
  endTime,
  location,
  cost,
  status,
}) => {
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'planned':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 6, overflow: 'hidden', background: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>
          <Chip
            label={status}
            color={getStatusColor(status)}
            size="small"
            sx={{ fontWeight: 700, textTransform: 'capitalize' }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ fontWeight: 500 }}>
          {description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {new Date(startTime).toLocaleDateString()} at {new Date(startTime).toLocaleTimeString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
          {cost && (
            <Typography variant="body2" color="text.secondary">
              Cost: ${cost}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard; 