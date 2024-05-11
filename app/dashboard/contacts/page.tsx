"use client";
import DashSquelette from "@/app/ui/dashboard/components/DashSquelette";
import React, { useEffect, useState } from "react";
import { getUserContacts } from "@/firebaseDatabase";
import { getAuth } from "firebase/auth";

const page = () => {
  return <DashSquelette title="contacts" />;
};

export default page;
