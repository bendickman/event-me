import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from '../../../lib/util/util';
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

type Props = {
    appEvent: AppEvent;
}

export default function EventCard({ appEvent }: Props) {
    const label = appEvent.isHost ? 'You are hosting' : 'You are going';
    const color = appEvent.isHost ? 'secondary' : appEvent.isGoing ? 'warning' : 'default';

    return (
        <Card elevation={3} sx={{ borderRadius: 3 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <CardHeader
                    avatar={<Avatar
                        src={appEvent.hostImageUrl}
                        sx={{ height: 80, width: 80 }}
                        alt="image of host"
                    />}
                    title={appEvent.title}
                    titleTypographyProps={{
                        fontWeight: 'bold',
                        fontSize: 20
                    }}
                    subheader={
                        <>
                            Hosted by{' '}
                            <Link to={`/profiles/${appEvent.hostId}`}>
                                {appEvent.hostDisplayName}
                            </Link>
                        </>
                    }
                />
                <Box display='flex' flexDirection='column' gap={2} mr={2}>
                    {(appEvent.isHost || appEvent.isGoing) && <Chip variant="outlined" label={label} color={color} sx={{ borderRadius: 2 }} />}
                    {appEvent.isCancelled && <Chip label='Cancelled' color='error' sx={{ borderRadius: 2 }} />}
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <CardContent sx={{ p: 0 }}>
                <Box display='flex' alignItems='center' mb={2} px={2}>
                    <Box display='flex' flexGrow={0} alignItems='center'>
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography variant="body2" noWrap>
                            {formatDate(appEvent.date)}
                        </Typography>
                    </Box>

                    <Place sx={{ ml: 3, mr: 1 }} />
                    <Typography variant="body2">{appEvent.venue}</Typography>
                </Box>
                <Divider />
                <Box display='flex' gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
                    {appEvent.attendees.map(att => (
                        <AvatarPopover profile={att} key={att.id} />
                    ))}
                </Box>
            </CardContent>
            <CardContent sx={{ pb: 2 }}>
                <Typography variant="body2">
                    {appEvent.description}
                </Typography>
                <Button
                    component={Link}
                    to={`/events/${appEvent.id}`}
                    size="medium"
                    variant="contained"
                    sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}
                >
                    View
                </Button>
            </CardContent>
        </Card>
    )
}