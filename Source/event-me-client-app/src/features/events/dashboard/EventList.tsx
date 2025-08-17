import { Box, Typography } from "@mui/material";
import EventCard from "./EventCard";
import { useAppEvents } from "../../../lib/hooks/useAppEvents";

export default function EventList () {
    const {appEvents, isLoading} = useAppEvents();

    if (isLoading) return <Typography>Loading...</Typography>

    if (!appEvents) return <Typography>No Events...</Typography>

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            {appEvents.map((appEvent) => (
                <EventCard 
                    key={appEvent.id} 
                    appEvent={appEvent}
                />
            ))}
        </Box>
    )
}