import React from "react";
import EventItem from "../../components/EventItem/EventItem";
import { json, redirect, useRouteLoaderData } from "react-router-dom";

export default function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export const loader = async ({ params }) => {
  const eventId = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw json({ message: "Could not fetch the event" }, { code: 500 });
  } else {
    return await response.json();
  }
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
