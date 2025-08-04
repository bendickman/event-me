import { Box } from "@mui/material";
import EventCard from "./EventCard";

type Props = {
    appEvents: AppEvent[];
    selectAppEvent: (id: string) => void;
}

export default function EventList ({appEvents, selectAppEvent} : Props) {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            {appEvents.map((appEvent) => (
                <EventCard 
                    key={appEvent.id} 
                    appEvent={appEvent}
                    selectAppEvent={selectAppEvent}
                />
            ))}
        </Box>
    )
}