import DashSquelette from "@/app/ui/dashboard/components/DashSquelette";
import React from "react";
import { users } from "../../ui/dashboard/test/data";

const page = () => {
  const contacts = users;
  return <DashSquelette title="contacts" contacts={contacts} />;
};

export default page;
