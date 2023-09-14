import React, { Suspense } from "react";
import EventItem from "../../components/EventItem/EventItem";
import {
  json,
  redirect,
  useRouteLoaderData,
  Await,
  defer,
} from "react-router-dom";
import EventsList from "../../components/EventList/EventsList";
import loadEvents from "../../utils/loaders";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Event...</p>}
      >
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Events...</p>}
      >
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

const loadEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: "Could not fetch the event" }, { code: 500 });
  } else {
    const resData = await response.json();
    console.log(resData.event);
    return resData.event;
  }
};

export const loader = ({ params }) => {
  const eventId = params.eventId;

  return defer({
    events: loadEvents(),
    event: loadEvent(eventId),
  });
};

export const action = async ({ params, request }) => {
  const response = await fetch(
    `http://localhost:8080/events/${params.eventId}`,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not delete the event" }, { code: 500 });
  }

  return redirect("/events");
};
