import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { useAppEvents } from "../../../lib/hooks/UseAppEvents";

type Props = {
    appEvent: AppEvent;
    selectAppEvent: (id: string) => void;
}

export default function EventCard({ appEvent, selectAppEvent }: Props) {
    const { deleteAppEvent } = useAppEvents();


    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{appEvent.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{appEvent.date.toString()}</Typography>
                <Typography variant="body2">{appEvent.description}</Typography>
                <Typography variant="subtitle1">{appEvent.city} / {appEvent.venue}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={appEvent.category} variant="outlined" />
                <Box display='flex' gap={1}>
                    <Button size="medium" variant="contained" onClick={() => selectAppEvent(appEvent.id)}>View</Button>
                    <Button 
                        size="medium" 
                        color="error" 
                        variant="contained" 
                        disabled={deleteAppEvent.isPending}
                        onClick={() => deleteAppEvent.mutate(appEvent.id)}>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}