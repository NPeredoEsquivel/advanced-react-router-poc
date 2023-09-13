import React from "react";
import EventItem from "../../components/EventItem/EventItem";
import { json, useLoaderData } from "react-router-dom";

export default function EventDetailPage() {
  const data = useLoaderData();

  return <EventItem event={data.event} />;
}

export const loader = async ({ request, params }) => {
  const eventId = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw json({ message: "Could not fetch the event" }, { code: 500 });
  } else {
    return await response.json();
  }
};
