import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import { Trip } from '../../types';

interface TripListProps {
  trips: Trip[];
  selectedTripId: string | null;
  onTripSelect: (tripId: string) => void;
}

const TripList: React.FC<TripListProps> = ({
  trips,
  selectedTripId,
  onTripSelect,
}) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {trips.map((trip) => (
        <React.Fragment key={trip.id}>
          <ListItem
            disablePadding
            sx={{
              backgroundColor:
                selectedTripId === trip.id ? 'action.selected' : 'inherit',
            }}
          >
            <ListItemButton onClick={() => onTripSelect(trip.id)}>
              <ListItemAvatar>
                <Avatar
                  alt={trip.title}
                  src={trip.destinations[0]?.imageUrl}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="medium">
                    {trip.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {trip.destinations[0]?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${new Date(trip.startDate).toLocaleDateString()} - ${new Date(
                        trip.endDate
                      ).toLocaleDateString()}`}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default TripList; 