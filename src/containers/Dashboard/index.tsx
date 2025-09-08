"use client";

import { Button } from "@/shared/ui/button";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button> */}
    </div>
  );
};

export default Dashboard;
