import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root/Root";
import EventPage, { loader as eventsLoader } from "./pages/Event/Event";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail/EventDetail";
import NewEventPage, {
  action as newEventAction,
} from "./pages/NewEvent/NewEvent";
import EditEventPage from "./pages/EditEvent/EditEvent";
import EventRoot from "./pages/EventRoot/EventRoot";
import ErrorPage from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
              { path: "edit", element: <EditEventPage /> },
            ],
          },
          { path: "new", element: <NewEventPage />, action: newEventAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
