import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
    appEvent: AppEvent;
    cancelSelectAppEvent: () => void;
}

export default function EventDetails({appEvent, cancelSelectAppEvent}: Props) {
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
            <Button color="primary">Edit</Button>
            <Button color="inherit" onClick={cancelSelectAppEvent}>Cancel</Button>
        </CardActions>
    </Card>
  )
}