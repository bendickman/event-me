import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react"

export default function EventList () {
    const [appEvents, setAppEvents] = useState<AppEvent[]>([]);

    useEffect(() => {
        fetch('https://localhost:7171/api/v1/event?pagesize=25')
            .then(response => response.json())
            .then(data => setAppEvents(data.items))
    }, [])

    return (
        <>
            <Typography variant='h2'>EventMe</Typography>
            <List>
                {appEvents.map((appEvent) => (
                    <ListItem key={appEvent.id}>
                        <ListItemText>{appEvent.title}</ListItemText>    
                    </ListItem>
                ))}
            </List>
        </>
    )
}