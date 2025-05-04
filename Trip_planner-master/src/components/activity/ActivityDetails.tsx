import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Activity } from '../../types';

interface ActivityDetailsProps {
  activity: Activity | null;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activity }) => {
  if (!activity) {
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
          Select an activity to view details
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {activity.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {activity.description}
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Time
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${new Date(activity.startTime).toLocaleTimeString()} - ${new Date(
              activity.endTime
            ).toLocaleTimeString()}`}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Location
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activity.location}
          </Typography>
        </CardContent>
      </Card>

      {activity.cost && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Cost
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${activity.cost}
            </Typography>
          </CardContent>
        </Card>
      )}

      {activity.notes && (
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Notes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.notes}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetails; 