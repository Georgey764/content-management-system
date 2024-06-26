"use client";

import { useEffect, useState } from "react";
import CreateOpportunity from "../../ui/Components/CreateOpportunity";

export default function addPage() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(() => {
      return sessionStorage.getItem("role");
    });
  }, []);

  return (
    <div className="px-0 py-28 w-screen md:px-20 md:py-28 text-center">
      {role === "true" ? <CreateOpportunity /> : ""}
    </div>
  );
}
