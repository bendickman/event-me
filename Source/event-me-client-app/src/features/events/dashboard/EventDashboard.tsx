import { Grid2 } from "@mui/material";
import EventList from "./EventList";
import EventFilters from "./EventFilters";

export default function EventDashboard () {
    

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <EventList />
            </Grid2>
            <Grid2 size={4}>
                <EventFilters />
            </Grid2>
        </Grid2>
    )
}