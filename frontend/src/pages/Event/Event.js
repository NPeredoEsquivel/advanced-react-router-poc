import React from "react";
import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  { id: "event-1", name: "event-1" },
  { id: "event-2", name: "event-2" },
  { id: "event-3", name: "event-3" },
  { id: "event-4", name: "event-4" },
];
export default function EventPage() {
  return (
    <>
      <h1>EventPage</h1>
      <main>
        <ul>
          {DUMMY_EVENTS.map((singleEvent) => {
            return (
              <li key={singleEvent.id}>
                <Link to={`${singleEvent.id}`}> {singleEvent.name}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
