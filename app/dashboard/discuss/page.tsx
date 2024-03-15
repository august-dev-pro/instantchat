import DashSquelette from "@/app/ui/dashboard/components/DashSquelette";
import { discuss, users } from "@/app/ui/dashboard/test/data";

import React from "react";

interface PageProps {
  isChieldSelected: boolean; // Déclarer la prop isChieldSelected
  setIsChieldSelected: any;
}

const page = () => {
  const contacts = users;
  return (
    <DashSquelette title="discuss" discuss={discuss} contacts={contacts} />
  );
};

export default page;
