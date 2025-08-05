import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useAppEvents } from "../../../lib/hooks/useAppEvents";

export default function EventDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {appEvent, isLoadingAppEvent} = useAppEvents(id);

    if (isLoadingAppEvent) return <Typography>Loading...</Typography>

    if (!appEvent) return <Typography>Event not found</Typography>

  return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia
            component='img'
            src={`/images/category/${appEvent.category}.jpg`} 
        />
        <CardContent>
            <Typography variant="h5">{appEvent.title}</Typography>
            <Typography variant="subtitle2" fontWeight='light'>{appEvent.date.toString()}</Typography>
            <Typography variant="body1">{appEvent.description}</Typography>
        </CardContent>
        <CardActions>
            <Button color="primary" onClick={() => navigate(`/edit-event/${appEvent.id}`)}>Edit</Button>
            <Button color="inherit" onClick={() => navigate('/events')}>Cancel</Button>
        </CardActions>
    </Card>
  )
}