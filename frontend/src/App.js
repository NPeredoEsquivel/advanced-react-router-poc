import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root/Root";
import EventPage, { loader as eventsLoader } from "./pages/Event/Event";
import EventDetailPage from "./pages/EventDetail/EventDetail";
import NewEventPage from "./pages/NewEvent/NewEvent";
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
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
