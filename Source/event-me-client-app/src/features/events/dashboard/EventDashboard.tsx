import { Grid2 } from "@mui/material";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";

type Props = {
    appEvents: AppEvent[];
    selectAppEvent: (id: string) => void;
    cancelSelectAppEvent: () => void;
    selectedAppEvent?: AppEvent;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
    submitForm: (appEvent: AppEvent) => void;
    deleteAppEvent: (id: string) => void;
}

export default function EventDashboard (
    {
        appEvents, 
        selectAppEvent, 
        cancelSelectAppEvent, 
        selectedAppEvent,
        openForm,
        closeForm,
        editMode,
        submitForm,
        deleteAppEvent
    } : Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <EventList 
                    appEvents={appEvents} 
                    selectAppEvent={selectAppEvent}
                    deleteAppEvent={deleteAppEvent}
                />
            </Grid2>
            <Grid2 size={5}>
                {selectedAppEvent && !editMode &&
                    <EventDetails 
                        appEvent={selectedAppEvent} 
                        cancelSelectAppEvent={cancelSelectAppEvent}
                        openForm={openForm}
                />}
                {editMode && 
                    <EventForm closeForm={closeForm} appEvent={selectedAppEvent} submitForm={submitForm} />
                }
            </Grid2>
        </Grid2>
    )
}