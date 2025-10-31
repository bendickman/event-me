import { Grid2, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useAppEvents } from "../../../lib/hooks/useAppEvents";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsChat from "./EventDetailsChat";
import EventDetailsSidebar from "./EventDetailsSidebar";

export default function EventDetails() {
    const {id} = useParams();
    const {appEvent, isLoadingAppEvent} = useAppEvents(id);

    if (isLoadingAppEvent) return <Typography>Loading...</Typography>

    if (!appEvent) return <Typography>Event not found</Typography>

  return (
    <Grid2 container spacing={3} >
        <Grid2 size={8}>
            <EventDetailsHeader appEvent={appEvent} />
            <EventDetailsInfo appEvent={appEvent} />
            <EventDetailsChat />
        </Grid2>
        <Grid2 size={4}>
            <EventDetailsSidebar appEvent={appEvent} />
        </Grid2>
    </Grid2>
  )
}