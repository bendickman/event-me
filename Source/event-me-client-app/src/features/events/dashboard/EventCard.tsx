import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

type Props = {
    appEvent: AppEvent;
}

export default function EventCard({appEvent}: Props) {
  return (
    <Card sx={{borderRadius: 3}}>
        <CardContent>
            <Typography variant="h5">{appEvent.title}</Typography>
            <Typography sx={{color: 'text.secondary', mb: 1}}>{appEvent.date.toString()}</Typography>
            <Typography variant="body2">{appEvent.description}</Typography>
            <Typography variant="subtitle1">{appEvent.city} / {appEvent.venue}</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
            <Chip label={appEvent.category} variant="outlined" />
            <Button size="medium" variant="contained">View</Button>
        </CardActions>
    </Card>
  )
}