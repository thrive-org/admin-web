"use client";


import { Users, BriefcaseMedical, Activity } from "lucide-react";
import StatCard from "./StatCard";
import UpdatesPanel from "./UpdatesPanel";
import NewExaminers from "./NewExaminers";

const Dashboard = () => {
  return (
    <div className="pb-10">
      <h1
        className="my-5 font-[600] tracking-[-0.03em] text-[40px] leading-[1] text-black"
        style={{ fontFamily: 'Degular, Poppins, system-ui' }}
      >
        Welcome To{" "}
        <span
          className="bg-[linear-gradient(270deg,#01F4C8_50%,#00A8FF_65.19%)] bg-clip-text text-transparent"
          style={{ fontFamily: 'Degular, Poppins, system-ui' }}
        >
          Thrive
        </span>{" "}
        Admin Dashboard
      </h1>

      {/* 1440 grid: cards row + body */}
      <div className="grid grid-cols-12 gap-x-[19.1px] gap-y-6">
        {/* Stat cards — exact sizes at xl, fluid below */}
        <div className="col-span-12 xl:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[19.1px]">
            <StatCard
              title="New Examiners"
              value="20"
              badge="This Month"
              iconSrc="/icons/examiner-card-icon.svg"
              intent="primary"
            />
            <StatCard
              title="New Insurers"
              value="6"
              badge="This Month"
              iconSrc="/icons/insurers-card-icon.svg"
              intent="indigo"
            />
            <StatCard
              title="Active IME Cases"
              value="16"
              badge="All Time"
              iconSrc="/icons/ime-card-icon.svg"
              intent="aqua"
            />

          </div>
        </div>

        {/* Right rail updates */}
        <div className="col-span-12 xl:col-span-4">
          <UpdatesPanel
            items={[
              "New insurer onboarded: Maple Life",
              "Dr. Sarah Ahmed’s profile was verified",
              "John Doe profile was verified",
              "New claim submitted by: Emily Carter",
              "New insurer onboarded: Easy Life",
            ]}
          />
        </div>

        {/* Table + donut placeholder block to mirror figma layout */}
        <div className="col-span-12 xl:col-span-8">
          <NewExaminers />
        </div>

        <div className="col-span-12 xl:col-span-4">
          {/* Placeholder analytics tile for the donut chart area */}
          <div className="rounded-[29px] bg-white shadow-[0_0_36.92px_rgba(0,0,0,0.08)] p-6 h-[327px] flex items-center justify-center">
            {/* Keep light DOM to preserve performance until chart is required */}
            <span className="text-sm text-neutral-500 tracking-[-0.02em]">
              Analytics donut placeholder
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;