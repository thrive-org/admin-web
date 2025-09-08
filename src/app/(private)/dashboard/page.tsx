import { Metadata } from "next";
import Dashboard from "@/containers/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Thrive Admin",
  description: "Dashboard",
};

const page = () => {
  return <Dashboard />;
};

export default page;
