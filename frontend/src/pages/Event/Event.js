import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import EventsList from "../../components/EventList/EventsList";
import loadEventsUtil from "../../utils/loaders";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  return await loadEventsUtil();
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
