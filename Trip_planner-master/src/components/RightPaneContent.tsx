import { Box, Typography, Divider, Button, List, ListItem, ListItemText } from '@mui/material';

const mockDetails = [
  { label: 'Trip Owner', value: 'Ashok Kumar' },
  { label: 'Destination', value: 'Tokyo' },
  { label: 'Dates', value: '15 Sep 2023 - 22 Sep 2023' },
  { label: 'Travelers', value: '2 (You + 1)' },
];

const mockActions = [
  'Edit Trip',
  'Share Itinerary',
  'Download PDF',
];

const RightPaneContent = () => (
  <Box sx={{ p: 2, color: '#fff' }}>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
      Trip Details
    </Typography>
    <List dense>
      {mockDetails.map((item, idx) => (
        <ListItem key={idx} disableGutters>
          <ListItemText
            primary={<Typography sx={{ color: '#b0b3c6', fontSize: 14 }}>{item.label}</Typography>}
            secondary={<Typography sx={{ color: '#fff', fontWeight: 500 }}>{item.value}</Typography>}
          />
        </ListItem>
      ))}
    </List>
    <Divider sx={{ my: 2, bgcolor: '#333' }} />
    <Typography variant="subtitle1" sx={{ color: '#b0b3c6', mb: 1 }}>
      Actions
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {mockActions.map((action, idx) => (
        <Button key={idx} variant="outlined" color="primary" sx={{ color: '#fff', borderColor: '#1976d2' }}>
          {action}
        </Button>
      ))}
    </Box>
  </Box>
);

export default RightPaneContent; 