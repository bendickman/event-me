import { Grid2 } from "@mui/material";
import EventList from "./EventList";

type Props = {
    appEvents: AppEvent[];
}

export default function EventDashboard ({appEvents}: Props) {
    return (
        <Grid2 container>
            <Grid2 size={9}>
                <EventList appEvents={appEvents} />
            </Grid2>
        </Grid2>
    )
}