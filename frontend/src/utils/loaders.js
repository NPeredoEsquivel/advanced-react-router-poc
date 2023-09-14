import { json } from "react-router-dom";

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    /* return { isError: true, message: "Could not fetch events" }; */
    //throw new Error("Could not fetch events");
    /* throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    }); */
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData.events);
    return resData.events;
  }
};
export default loadEvents;
