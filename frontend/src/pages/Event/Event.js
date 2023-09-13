import { useLoaderData } from "react-router-dom";
import EventsList from "../../components/EventList/EventsList";

function EventsPage() {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }
  const events = data.events;

  return <EventsList events={events} />;
}

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    /* return { isError: true, message: "Could not fetch events" }; */
    throw new Error("Error fetching events");
  } else {
    const resData = await response.json();
    return resData;
  }
};

export default EventsPage;
