import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/form/EventForm";
import EventDetails from "../../features/events/details/EventDetails";
import Counter from "../../features/counter/Counter";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: '/events', element: <EventDashboard /> },
            { path: '/events/:id', element: <EventDetails /> },
            { path: '/create-event', element: <EventForm key='create' /> },
            { path: '/edit-event/:id', element: <EventForm /> },
            { path: '/counter', element: <Counter /> },
        ]
    }
])

export {
    router
}