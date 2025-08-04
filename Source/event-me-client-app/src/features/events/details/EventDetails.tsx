import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
    appEvent: AppEvent;
    cancelSelectAppEvent: () => void;
    openForm: (id: string) => void;
}

export default function EventDetails({appEvent, cancelSelectAppEvent, openForm}: Props) {
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
            <Button color="primary" onClick={() => openForm(appEvent.id)}>Edit</Button>
            <Button color="inherit" onClick={cancelSelectAppEvent}>Cancel</Button>
        </CardActions>
    </Card>
  )
}