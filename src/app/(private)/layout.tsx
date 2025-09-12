import { type ReactNode } from "react";
import { Sidebar } from "@/layouts/dashboard";
import { Metadata } from "next";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Thrive",
  description: "Thrive",
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:ml-[280px]">
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;