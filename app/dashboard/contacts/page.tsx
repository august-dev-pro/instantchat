"use client";
import DashSquelette from "@/app/ui/dashboard/components/DashSquelette";
import React, { useEffect, useState } from "react";
import { getUserContacts } from "@/firebaseDatabase";
import { getAuth } from "firebase/auth";

const page = () => {
  /* const [users, setuserss] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    console.log(currentUser?.uid);
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        const userId = currentUser.uid;
        const users = await getUserContacts(userId);
        setuserss(users);
      }
    };
    fetchUserData();
  }, []); */
  return <DashSquelette title="contacts" /* contacts={users} */ />;
};

export default page;
