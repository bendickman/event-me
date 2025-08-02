import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

export default function EventList () {
    const [appEvents, setAppEvents] = useState<AppEvent[]>([]);

    useEffect(() => {
        axios.get('https://localhost:7171/api/v1/event?pagesize=25')
            .then(response => setAppEvents(response.data.items))
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