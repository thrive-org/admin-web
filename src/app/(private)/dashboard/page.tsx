import { Metadata } from "next";
import { Dashboard } from "@/domains/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Thrive Admin",
  description: "Dashboard",
};

const page = () => {
  return <Dashboard />;
};

export default page;
