import { Box } from "@mui/material";
import EventCard from "./EventCard";

type Props = {
    appEvents: AppEvent[];
}

export default function EventList ({appEvents} : Props) {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            {appEvents.map((appEvent) => (
                <EventCard key={appEvent.id} appEvent={appEvent} />
            ))}
        </Box>
    )
}