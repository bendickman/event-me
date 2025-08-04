import { Box, Container, CssBaseline } from '@mui/material'
import NavBar from './NavBar'
import EventDashboard from '../../features/events/dashboard/EventDashboard'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [appEvents, setAppEvents] = useState<AppEvent[]>([]);
  const [selectedAppEvent, setSelectedAppEvent] = useState<AppEvent | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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

    const handleSubmitForm = (appEvent: AppEvent) => {
      if (appEvent.id) {
        setAppEvents(appEvents.map(e => e.id === appEvent.id ? appEvent : e))
      } else {
        const newAppEvent = {...appEvent, id: appEvents.length.toString()};
        setSelectedAppEvent(newAppEvent);
        setAppEvents([...appEvents, newAppEvent])
      }

      setEditMode(false);
    }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{mt: 3}}>
        <EventDashboard 
          appEvents={appEvents}
          selectAppEvent={handleSelectedAppEvent}
          cancelSelectAppEvent={handleCancelSelectAppEvent}
          selectedAppEvent={selectedAppEvent}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
        />
      </Container>
    </Box>
  )
}

export default App

