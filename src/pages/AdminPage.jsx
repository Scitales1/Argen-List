import React from "react";
import { TourList } from "../components/TourList";
import { TourForm } from "../components/TourForm";

export default function AdminPage() {
  return (
    <div>
      <h1>AdminPage</h1>
      <TourForm />
      <TourList />
    </div>
  );
}
