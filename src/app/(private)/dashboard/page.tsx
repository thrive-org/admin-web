import { Metadata } from "next";
import { Dashboard } from "@/domains/dashboard";
import { DashboardShell } from "@/layouts/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Thrive Admin",
  description: "Dashboard",
};

const page = () => {
  return (
    <DashboardShell
      title={
        <h1 className="text-[#000000] text-[36px] font-semibold font-degular">
          Welcome To{" "}
          <span className="bg-gradient-to-r to-[#01F4C8] from-[#00A8FF] bg-clip-text text-transparent">
            Thrive
          </span>{" "}
          Admin Dashboard
        </h1>
      }
    >
      <Dashboard />
    </DashboardShell>
  );
};

export default page;
