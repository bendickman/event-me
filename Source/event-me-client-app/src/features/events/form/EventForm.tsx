import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
  appEvent?: AppEvent;
  closeForm: () => void;
  submitForm: (appEvent: AppEvent) => void;
}

export default function EventForm({appEvent, closeForm, submitForm}: Props) {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const data: {[key: string]: FormDataEntryValue} = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (appEvent) {
      data.id = appEvent.id;
    }

    submitForm(data as unknown as AppEvent);
  }

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Event
      </Typography>
      <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
        <TextField name='title' label='Title' defaultValue={appEvent?.title}/>
        <TextField name='description' label='Description' multiline rows={3} defaultValue={appEvent?.description}/>
        <TextField name='category' label='Category' defaultValue={appEvent?.category}/>
        <TextField name='date' label='Date' type="date" defaultValue={appEvent?.date}/>
        <TextField name='city' label='City' defaultValue={appEvent?.city}/>
        <TextField name='venue' label='Venue' defaultValue={appEvent?.venue}/>
        <Box display='flex' justifyContent='end' gap={3}>
          <Button color="inherit" onClick={closeForm}>Cancel</Button>
          <Button type="submit" color="success" variant="contained">Submit</Button>
        </Box>
      </Box>
    </Paper>
  )
}