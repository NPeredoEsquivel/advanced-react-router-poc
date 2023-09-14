import { useLoaderData, json } from "react-router-dom";
import EventsList from "../../components/EventList/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    /* return { isError: true, message: "Could not fetch events" }; */
    //throw new Error("Could not fetch events");
    /* throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    }); */
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    return await response.json();
  }
};
