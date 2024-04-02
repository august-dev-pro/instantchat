"use client";
import DashSquelette from "@/app/ui/dashboard/components/DashSquelette";
import { app, database } from "@/firebaseConfig";
import { getUserContacts, getUserDiscuss, getUsers } from "@/firebaseDatabase";
import { getAuth } from "firebase/auth";

import React, { useEffect, useState } from "react";

const page = () => {
  //const contacts = users;
  //const [userDiscuss, setuserDiscuss] = useState(null);

  return <DashSquelette title="discuss" /* contacts={users} */ />;
};

export default page;
