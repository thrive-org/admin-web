import { type ReactNode, Suspense } from "react";
import { Header, Sidebar } from "@/layouts/dashboard";
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
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 px-0 md:px-8">
          <div className="max-w-full p-6">
            <Suspense
              fallback={
                <div className="flex h-full w-full flex-1 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#000093] border-t-transparent"></div>
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
