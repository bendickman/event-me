import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useAppEvents } from "../../../lib/hooks/UseAppEvents";

type Props = {
  appEvent?: AppEvent;
  closeForm: () => void;
}

export default function EventForm({ appEvent, closeForm }: Props) {
  const { updateAppEvent, createAppEvent } = useAppEvents();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (appEvent) {
      data.id = appEvent.id;
      await updateAppEvent.mutateAsync(data as unknown as AppEvent);
      closeForm();
    } else {
      await createAppEvent.mutateAsync(data as unknown as AppEvent);
      closeForm();
    }
  }

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Event
      </Typography>
      <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
        <TextField name='title' label='Title' defaultValue={appEvent?.title} />
        <TextField name='description' label='Description' multiline rows={3} defaultValue={appEvent?.description} />
        <TextField name='category' label='Category' defaultValue={appEvent?.category} />
        <TextField name='date' label='Date' type="date"
          defaultValue={appEvent?.date
            ? new Date(appEvent.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
          }
        />
        <TextField name='city' label='City' defaultValue={appEvent?.city} />
        <TextField name='venue' label='Venue' defaultValue={appEvent?.venue} />
        <Box display='flex' justifyContent='end' gap={3}>
          <Button color="inherit" onClick={closeForm}>Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateAppEvent.isPending || createAppEvent.isPending}
          >Submit</Button>
        </Box>
      </Box>
    </Paper>
  )
}