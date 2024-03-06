import DashSquelette from "@/app/ui/dashboard/components/DashSquelette";
import { discuss, contacts } from "@/app/ui/dashboard/test/data";
import React from "react";

const page = () => {
  return (
    <DashSquelette title="discuss" discuss={discuss} contacts={contacts} />
  );
};

export default page;
