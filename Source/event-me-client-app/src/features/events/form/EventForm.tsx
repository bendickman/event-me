import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppEvents } from "../../../lib/hooks/useAppEvents";
import { useNavigate, useParams } from "react-router";
import { useForm } from 'react-hook-form'
import { useEffect } from "react";
import { eventSchema, type EventSchema } from "../../../lib/schemas/eventSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";

export default function EventForm() {
  const { control, register, reset, handleSubmit} = useForm<EventSchema>({
    mode: 'onTouched',
    resolver: zodResolver(eventSchema)
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateAppEvent, createAppEvent, appEvent, isLoadingAppEvent } = useAppEvents(id);

  useEffect(() => {
    if (appEvent) {
      reset(appEvent);
    }
    
  }, [appEvent, reset])

  const onSubmit = async (data: EventSchema) => {
    try {
      if (appEvent) {
        const updatedAppEvent = {...appEvent, ...data};
        updateAppEvent.mutate(updatedAppEvent, {
          onSuccess: () => navigate(`/events/${updatedAppEvent.id}`)
        })
      } else {
        createAppEvent.mutate(data, {
          onSuccess: (id) => navigate(`/events/${id}`)
        })
      }
    } catch (error){
      console.log(error);
    }
  }

  if (isLoadingAppEvent) return <Typography>Loading Event...</Typography>

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {appEvent ? 'Edit Event' : 'Create Event'}
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
        <TextInput label='Title' name='title' control={control}></TextInput>
        <TextInput label='Description' control={control} name='description' multiline rows={3} />
        <Box display='flex' gap={3}>
            <SelectInput
                items={categoryOptions}
                label='Category'
                control={control}
                name='category'
            />
            <DateTimeInput label='Date' control={control} name='date' />
        </Box>
        <TextInput label='City' control={control} name='city' />
        <TextInput label='Venue' control={control} name='venue' />
        <Box display='flex' justifyContent='end' gap={3}>
          <Button color="inherit">Cancel</Button>
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