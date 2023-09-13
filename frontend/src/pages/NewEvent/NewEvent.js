import React from "react";
import EventForm from "../../components/EventForm/EventForm";
import { json, redirect } from "react-router-dom";

export default function NewEventPage() {
  return <EventForm />;
}

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    console.log("response", response);
    throw json({ message: "Couldnt send data" }, { statue: 500 });
  }

  return redirect("/events");
};
