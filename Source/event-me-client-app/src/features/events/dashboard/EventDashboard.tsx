import { Grid2 } from "@mui/material";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";

type Props = {
    appEvents: AppEvent[];
}

export default function EventDashboard ({appEvents}: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <EventList appEvents={appEvents} />
            </Grid2>
            <Grid2 size={5}>
                {appEvents[0] && <EventDetails appEvent={appEvents[0]} />}
            </Grid2>
        </Grid2>
    )
}