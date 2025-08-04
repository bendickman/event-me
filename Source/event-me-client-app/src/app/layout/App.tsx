import { Box, Container, CssBaseline } from '@mui/material'
import NavBar from './NavBar'
import EventDashboard from '../../features/events/dashboard/EventDashboard'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [appEvents, setAppEvents] = useState<AppEvent[]>([]);
  const [selectedAppEvent, setSelectedAppEvent] = useState<AppEvent | undefined>(undefined);

    useEffect(() => {
        axios.get('https://localhost:7171/api/v1/event?pagesize=25')
            .then(response => setAppEvents(response.data.items))
    }, [])

    const handleSelectedAppEvent = (id: string) => {
      setSelectedAppEvent(appEvents.find(e => e.id === id));
    }

    const handleCancelSelectAppEvent = () => {
      setSelectedAppEvent(undefined);
    }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{mt: 3}}>
        <EventDashboard 
          appEvents={appEvents}
          selectAppEvent={handleSelectedAppEvent}
          cancelSelectAppEvent={handleCancelSelectAppEvent}
          selectedAppEvent={selectedAppEvent}
        />
      </Container>
    </Box>
  )
}

export default App

