import { Grid2 } from "@mui/material";
import EventList from "./EventList";

export default function EventDashboard () {
    

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <EventList />
            </Grid2>
            <Grid2 size={5}>
                Event filtere here...
            </Grid2>
        </Grid2>
    )
}