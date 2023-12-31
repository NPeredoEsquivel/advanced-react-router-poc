import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root/Root";
import EventPage, { loader as eventsLoader } from "./pages/Event/Event";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail/EventDetail";
import NewEventPage from "./pages/NewEvent/NewEvent";
import EditEventPage from "./pages/EditEvent/EditEvent";
import EventRoot from "./pages/EventRoot/EventRoot";
import NewsletterPage, {
  action as newsletterAction,
} from "./pages/Newsletter/Newsletter";
import ErrorPage from "./pages/Error/Error";
import { action as manageEvent } from "./components/EventForm/EventForm";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication/Authentication";
import { action as logoutAction } from "./pages/Logout/Logout";
import { tokenLoader, checkAuthLoader } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventRoot />,
        children: [
          {
            index: true,
            element: <EventPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manageEvent,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manageEvent,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "/logout",
        action: logoutAction,
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
