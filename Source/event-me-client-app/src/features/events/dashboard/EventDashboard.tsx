import { Grid2 } from "@mui/material";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";

type Props = {
    appEvents: AppEvent[];
    selectAppEvent: (id: string) => void;
    cancelSelectAppEvent: () => void;
    selectedAppEvent?: AppEvent;
}

export default function EventDashboard ({appEvents, selectAppEvent, cancelSelectAppEvent, selectedAppEvent}: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <EventList 
                    appEvents={appEvents} 
                    selectAppEvent={selectAppEvent}
                />
            </Grid2>
            <Grid2 size={5}>
                {selectedAppEvent && 
                <EventDetails 
                    appEvent={selectedAppEvent} 
                    cancelSelectAppEvent={cancelSelectAppEvent}
                />}
            </Grid2>
        </Grid2>
    )
}