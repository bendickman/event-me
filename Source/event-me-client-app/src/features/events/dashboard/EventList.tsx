import { Box, Typography } from "@mui/material";
import EventCard from "./EventCard";
import { useAppEvents } from "../../../lib/hooks/useAppEvents";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const EventList = observer(function EventList() {
    const { eventsGroup, isLoading, hasNextPage, fetchNextPage } = useAppEvents();
    const { ref, inView } = useInView({
        threshold: 0.5
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage])

    if (isLoading) return <Typography>Loading...</Typography>

    if (!eventsGroup) return <Typography>No events found</Typography>

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {eventsGroup.pages.map((appEvents, index) => (
                <Box
                    key={index}
                    ref={index === eventsGroup.pages.length - 1 ? ref : null}
                    display='flex'
                    flexDirection='column'
                    gap={3}
                >
                    {appEvents.items.map(appEvent => (
                        <EventCard
                            key={appEvent.id}
                            appEvent={appEvent}
                        />
                    ))}
                </Box>
            ))}

        </Box>
    )
})

export default EventList