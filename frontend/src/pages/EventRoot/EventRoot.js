import React from "react";
import EventsNavigation from "../../components/EventsNavigation/EventsNavigation";
import { Outlet } from "react-router-dom";

export default function EventRoot() {
  return (
    <div>
      <EventsNavigation />
      <Outlet />
    </div>
  );
}
