// Dashboard page for the Travel Itinerary App
// Features: Figma-accurate layout, dark/light mode, interactive activities (add, edit, delete, mark as completed), third pane, and mock Google Calendar integration

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Paper,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Drawer,
  Slide,
  Divider,
  Button,
  Fab,
  Modal,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TripCard from '../components/TripCard';
import { Trip, Activity, Accommodation } from '../types';
import { useColorMode } from '../App';

// --- Mock Data ---
// These would be fetched from an API in a real app
const trip: Trip = {
  id: '1',
  title: 'Tokyo Adventure',
  description: 'Your upcoming trip',
  startDate: '2024-08-10',
  endDate: '2024-08-18',
  destinations: [],
  activities: [],
  imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  destination: 'Tokyo, Japan',
};
const flight = {
  airline: 'ANA',
  flightNumber: 'NH 212',
  departure: '2024-08-10T10:00',
  arrival: '2024-08-10T18:00',
  from: 'LAX',
  to: 'HND',
};
const accommodation: Accommodation = {
  id: '1',
  name: 'Shinjuku Granbell Hotel',
  location: 'Shinjuku, Tokyo',
  checkIn: '2024-08-10',
  checkOut: '2024-08-18',
  cost: 1200,
  bookingReference: 'BR98765',
};
const activities: Activity[] = [
  {
    id: '1',
    title: 'Tokyo Skytree Visit',
    description: 'See the city from above',
    startTime: '2024-08-11T09:00',
    endTime: '2024-08-11T11:00',
    location: 'Tokyo Skytree',
    cost: 30,
    notes: 'Bring your camera!',
    status: 'planned',
  },
  {
    id: '2',
    title: 'Sushi Making Class',
    description: 'Learn to make sushi',
    startTime: '2024-08-12T14:00',
    endTime: '2024-08-12T16:00',
    location: 'Tsukiji',
    cost: 50,
    notes: '',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Asakusa Temple',
    description: 'Visit the famous Senso-ji Temple',
    startTime: '2024-08-13T10:00',
    endTime: '2024-08-13T12:00',
    location: 'Asakusa',
    cost: 0,
    notes: '',
    status: 'cancelled',
  },
];
// Status to MUI color mapping
const statusColors: Record<'planned' | 'completed' | 'cancelled', 'info' | 'success' | 'error'> = {
  planned: 'info',
  completed: 'success',
  cancelled: 'error',
};

/**
 * Dashboard component: Main itinerary dashboard with trip, activities, and integrations.
 */
const Dashboard: React.FC = () => {
  // --- Theme and Responsive ---
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colorMode = useColorMode();
  const userName = 'Chhavii';

  // --- Activities State ---
  // All activities (would be fetched from API in real app)
  const [activitiesState, setActivitiesState] = useState(activities);
  // For filtering activities by status
  const [activityTab, setActivityTab] = useState(0);
  const activityFilters = ['All', 'Planned', 'Completed', 'Cancelled'];

  // --- Third Pane State ---
  // Which activity is selected for details
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  // Is the third pane open?
  const [thirdPaneOpen, setThirdPaneOpen] = useState(false);

  // --- Add/Edit Activity State ---
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    cost: undefined,
    notes: '',
    status: 'planned',
  });

  // --- Delete Dialog State ---
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // --- Mock Google Calendar Integration State ---
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  // --- Filtered Activities ---
  // Only show activities matching the selected tab
  const filteredActivities = activitiesState.filter((activity) => {
    if (activityTab === 0) return true;
    if (activityTab === 1) return activity.status === 'planned';
    if (activityTab === 2) return activity.status === 'completed';
    if (activityTab === 3) return activity.status === 'cancelled';
    return true;
  });

  // --- Activity Card Click ---
  // Open third pane with details
  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setThirdPaneOpen(true);
  };

  // --- Mark as Completed ---
  // Update activity status in state
  const handleMarkCompleted = () => {
    if (!selectedActivity) return;
    setActivitiesState((prev) =>
      prev.map((a) =>
        a.id === selectedActivity.id ? { ...a, status: 'completed' } : a
      )
    );
    setSelectedActivity((prev) => prev ? { ...prev, status: 'completed' } : prev);
  };

  // --- Add/Edit Activity Form Handlers ---
  const handleOpenAddForm = () => {
    setEditMode(false);
    setNewActivity({ title: '', description: '', startTime: '', endTime: '', location: '', cost: undefined, notes: '', status: 'planned' });
    setAddFormOpen(true);
  };
  const handleCloseAddForm = () => setAddFormOpen(false);
  const handleAddActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };
  // On submit, add or edit activity in state
  const handleAddActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.title || !newActivity.startTime || !newActivity.endTime || !newActivity.location) return;
    if (editMode && selectedActivity) {
      setActivitiesState((prev) => prev.map((a) => a.id === selectedActivity.id ? { ...a, ...newActivity } as Activity : a));
      setEditMode(false);
      setSelectedActivity((prev) => prev ? { ...prev, ...newActivity } : prev);
    } else {
      setActivitiesState((prev) => [
        ...prev,
        {
          ...newActivity,
          id: Date.now().toString(),
          cost: newActivity.cost ? Number(newActivity.cost) : undefined,
        } as Activity,
      ]);
    }
    setAddFormOpen(false);
    setNewActivity({ title: '', description: '', startTime: '', endTime: '', location: '', cost: undefined, notes: '', status: 'planned' });
  };

  // --- Edit Activity ---
  // Open form pre-filled for editing
  const handleEditActivity = () => {
    if (!selectedActivity) return;
    setNewActivity(selectedActivity);
    setEditMode(true);
    setAddFormOpen(true);
  };

  // --- Delete Activity ---
  // Open confirmation dialog
  const handleDeleteActivity = () => setDeleteDialogOpen(true);
  // Confirm delete
  const handleConfirmDelete = () => {
    if (!selectedActivity) return;
    setActivitiesState((prev) => prev.filter((a) => a.id !== selectedActivity.id));
    setDeleteDialogOpen(false);
    setThirdPaneOpen(false);
    setTimeout(() => setSelectedActivity(null), 300);
  };
  // Cancel delete
  const handleCancelDelete = () => setDeleteDialogOpen(false);

  // --- Third Pane Close ---
  const handleCloseThirdPane = () => {
    setThirdPaneOpen(false);
    setTimeout(() => setSelectedActivity(null), 300); // Wait for animation
  };

  // --- Mock Google Calendar Integration ---
  // Simulate an API call to Google Calendar
  const handleSyncToGoogle = async () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccess(true);
    }, 1500); // Simulate network delay
  };
  const handleCloseSyncSuccess = () => setSyncSuccess(false);

  // --- Activity Details Pane (Third Pane/Drawer) ---
  // Shows details, edit/delete, mark as completed, and Google Calendar sync
  const activityDetailsPane = selectedActivity && (
    <Box sx={{ width: { xs: '100vw', sm: 360 }, maxWidth: 400, p: 3, height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flex: 1, fontWeight: 800 }}>
          {selectedActivity.title}
        </Typography>
        <IconButton onClick={handleCloseThirdPane}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        {selectedActivity.location}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {selectedActivity.description}
      </Typography>
      <Chip
        label={selectedActivity.status ? selectedActivity.status.charAt(0).toUpperCase() + selectedActivity.status.slice(1) : 'Planned'}
        color={statusColors[selectedActivity.status || 'planned'] as 'info' | 'success' | 'error'}
        size="small"
        sx={{ fontWeight: 700, textTransform: 'capitalize', minWidth: 90, mb: 2 }}
      />
      <Typography variant="body2" sx={{ mb: 1 }}>
        <b>Time:</b> {new Date(selectedActivity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(selectedActivity.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Typography>
      {selectedActivity.cost !== undefined && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <b>Cost:</b> ${selectedActivity.cost}
        </Typography>
      )}
      {selectedActivity.notes && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <b>Notes:</b> {selectedActivity.notes}
        </Typography>
      )}
      {/* Edit/Delete/Mark as Completed Buttons */}
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={handleEditActivity} sx={{ fontWeight: 700 }}>
          Edit
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteActivity} sx={{ fontWeight: 700 }}>
          Delete
        </Button>
      </Stack>
      {selectedActivity.status !== 'completed' && (
        <Button variant="contained" color="success" sx={{ mt: 2, fontWeight: 700 }} onClick={handleMarkCompleted}>
          Mark as Completed
        </Button>
      )}
      {/* Mock Google Calendar Integration Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={syncing ? <CircularProgress size={18} color="inherit" /> : <EventAvailableIcon />}
        sx={{ mt: 2, fontWeight: 700 }}
        onClick={handleSyncToGoogle}
        disabled={syncing}
      >
        {syncing ? 'Syncing...' : 'Sync to Google Calendar'}
      </Button>
    </Box>
  );

  // --- Add/Edit Activity Form Modal ---
  // Used for both adding and editing activities
  const addActivityForm = (
    <Modal open={addFormOpen} onClose={handleCloseAddForm}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 340,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{editMode ? 'Edit Activity' : 'Add Activity'}</Typography>
        <form onSubmit={handleAddActivitySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField label="Title" name="title" value={newActivity.title} onChange={handleAddActivityChange} required fullWidth />
          <TextField label="Description" name="description" value={newActivity.description} onChange={handleAddActivityChange} fullWidth />
          <TextField label="Start Time" name="startTime" type="datetime-local" value={newActivity.startTime} onChange={handleAddActivityChange} required fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="End Time" name="endTime" type="datetime-local" value={newActivity.endTime} onChange={handleAddActivityChange} required fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="Location" name="location" value={newActivity.location} onChange={handleAddActivityChange} required fullWidth />
          <TextField label="Cost" name="cost" type="number" value={newActivity.cost ?? ''} onChange={handleAddActivityChange} fullWidth />
          <TextField label="Notes" name="notes" value={newActivity.notes} onChange={handleAddActivityChange} fullWidth />
          <TextField select label="Status" name="status" value={newActivity.status} onChange={handleAddActivityChange} fullWidth>
            <MenuItem value="planned">Planned</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700, mt: 1 }}>{editMode ? 'Save Changes' : 'Add'}</Button>
        </form>
      </Box>
    </Modal>
  );

  // --- Delete Confirmation Dialog ---
  const deleteDialog = (
    <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
      <DialogTitle>Delete Activity</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this activity? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
      </DialogActions>
    </Dialog>
  );

  // --- Main Render ---
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: isMobile ? 8 : 0, display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flex: 1, width: '100%' }}>
        {/* Header: Greeting, dark/light toggle, avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: isMobile ? 2 : 4, pt: isMobile ? 2 : 4, mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              Hello {userName}!
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-1px' }}>
              Your Upcoming Trip
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="primary">
              <NotificationsIcon />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode} sx={{ ml: 1 }}>
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Avatar alt={userName} src="https://randomuser.me/api/portraits/women/44.jpg" sx={{ width: 44, height: 44 }} />
          </Stack>
        </Box>
        {/* Main Trip Card */}
        <Box sx={{ px: isMobile ? 2 : 4, mb: 3 }}>
          <TripCard {...trip} />
        </Box>
        {/* Flight and Accommodation Cards */}
        <Stack direction={isMobile ? 'column' : 'row'} spacing={3} sx={{ px: isMobile ? 2 : 4, mb: 3 }}>
          <Paper elevation={4} sx={{ flex: 1, p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}>
                Flight Details
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>{flight.airline} {flight.flightNumber}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{flight.from} → {flight.to}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {new Date(flight.departure).toLocaleString()} - {new Date(flight.arrival).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={4} sx={{ flex: 1, p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}>
                Accommodation
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>{accommodation.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{accommodation.location}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {new Date(accommodation.checkIn).toLocaleDateString()} - {new Date(accommodation.checkOut).toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
        </Stack>
        {/* Activities Section with Filters */}
        <Box sx={{ px: isMobile ? 2 : 4, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
            Activities
          </Typography>
          {/* Filter Tabs */}
          <Tabs
            value={activityTab}
            onChange={(_, newValue) => setActivityTab(newValue)}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            sx={{ mb: 2, minHeight: 40, '& .MuiTab-root': { fontWeight: 700, fontSize: '1rem', borderRadius: 2, minHeight: 40, px: 2 }, '& .Mui-selected': { color: 'primary.main' } }}
          >
            {activityFilters.map((filter, idx) => (
              <Tab
                key={filter}
                label={filter}
                sx={{
                  bgcolor: activityTab === idx ? (theme.palette.mode === 'dark' ? '#23263A' : '#E3E8F0') : 'transparent',
                  mr: 1,
                  borderRadius: 2,
                  minWidth: 90,
                }}
              />
            ))}
          </Tabs>
          {/* Activities List */}
          <Stack spacing={2}>
            {filteredActivities.map((activity) => (
              <Paper key={activity.id} elevation={2} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 8 } }} onClick={() => handleActivityClick(activity)}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark' ? '#23263A' : '#E3E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 22,
                    color: 'primary.main',
                    mr: 2,
                  }}
                >
                  {activity.title[0]}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{activity.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{activity.location}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(activity.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
                <Chip
                  label={activity.status ? activity.status.charAt(0).toUpperCase() + activity.status.slice(1) : 'Planned'}
                  color={statusColors[activity.status || 'planned'] as 'info' | 'success' | 'error'}
                  size="small"
                  sx={{ fontWeight: 700, textTransform: 'capitalize', minWidth: 90 }}
                />
              </Paper>
            ))}
          </Stack>
        </Box>
        {/* Add/Edit Activity Form Modal */}
        {addActivityForm}
        {/* Delete Confirmation Dialog */}
        {deleteDialog}
        {/* FAB for desktop */}
        {!isMobile && (
          <Fab color="primary" aria-label="add" onClick={handleOpenAddForm} sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300 }}>
            <AddIcon />
          </Fab>
        )}
      </Box>
      {/* Third Pane (Desktop) or Drawer (Mobile) */}
      {selectedActivity && (
        isMobile ? (
          <Drawer anchor="right" open={thirdPaneOpen} onClose={handleCloseThirdPane}>
            {activityDetailsPane}
          </Drawer>
        ) : (
          <Slide direction="left" in={thirdPaneOpen} mountOnEnter unmountOnExit>
            <Box sx={{ width: 360, maxWidth: '100vw', height: '100vh', position: 'fixed', right: 0, top: 0, bgcolor: 'background.paper', boxShadow: 8, zIndex: 1200 }}>
              {activityDetailsPane}
            </Box>
          </Slide>
        )
      )}
      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <Paper elevation={8} sx={{ position: 'fixed', left: 0, right: 0, bottom: 0, borderRadius: 0 }}>
          <BottomNavigation showLabels>
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Add" icon={<AddCircleIcon />} onClick={handleOpenAddForm} />
            <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
          </BottomNavigation>
        </Paper>
      )}
      {/* Snackbar for Google Calendar sync success */}
      <Snackbar open={syncSuccess} autoHideDuration={2000} onClose={handleCloseSyncSuccess} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSyncSuccess} severity="success" sx={{ width: '100%' }}>
          Activity synced to Google Calendar!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard; 