import DashSquelette from "@/app/ui/dashboard/components/DashSquelette";
import React from "react";
import { contacts } from "../../ui/dashboard/test/data";

const page = ({ setIsChieldSelected }: { setIsChieldSelected: Function }) => {
  return <DashSquelette title="contacts" contacts={contacts} />;
};

export default page;
