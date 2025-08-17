import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/form/EventForm";
import EventDetails from "../../features/events/details/EventDetails";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/error/TestErrors";
import NotFound from "../../features/error/NotFound";
import ServerError from "../../features/error/ServerError";
import LoginForm from "../../features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../features/account/RegisterForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'events', element: <EventDashboard /> },
                    { path: 'events/:id', element: <EventDetails /> },
                    { path: 'create-event', element: <EventForm key='create' /> },
                    { path: 'edit-event/:id', element: <EventForm /> },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'counter', element: <Counter /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
])

export {
    router
}