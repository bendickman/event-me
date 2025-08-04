import { Box, Container, CssBaseline, Typography } from '@mui/material'
import NavBar from './NavBar'
import EventDashboard from '../../features/events/dashboard/EventDashboard'
import { useState } from 'react';
import { useAppEvents } from '../../lib/hooks/UseAppEvents';

function App() {
  const [selectedAppEvent, setSelectedAppEvent] = useState<AppEvent | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {appEvents, isPending} = useAppEvents();

  const handleSelectedAppEvent = (id: string) => {
    setSelectedAppEvent(appEvents!.find(e => e.id === id));
  }

  const handleCancelSelectAppEvent = () => {
    setSelectedAppEvent(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectedAppEvent(id);
    } else {
      handleCancelSelectAppEvent();
    }

    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!appEvents || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <EventDashboard
            appEvents={appEvents}
            selectAppEvent={handleSelectedAppEvent}
            cancelSelectAppEvent={handleCancelSelectAppEvent}
            selectedAppEvent={selectedAppEvent}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
          />
        )}
      </Container>
    </Box>
  )
}

export default App

