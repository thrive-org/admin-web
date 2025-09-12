"use client";

  import StatCard from "./StatCard";
import UpdatesPanel from "./UpdatesPanel";
import NewExaminers from "./NewExaminers";

const Dashboard = () => {
  return (
    <div className="pb-10">
      {/* 1440 grid: cards row + body */}
      <div className="flex flex-row gap-6">
        {/* Stat cards — exact sizes at xl, fluid below */}
        <div className="flex flex-col gap-6 xl:w-8/12 w-full">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <NewExaminers />
        </div>

        {/* Right rail updates */}
        <div className="w-full xl:w-4/12 w-full flex flex-col gap-6">
          <UpdatesPanel
            items={[
              "New insurer onboarded: Maple Life",
              "Dr. Sarah Ahmed’s profile was verified",
              "John Doe profile was verified",
              "New claim submitted by: Emily Carter",
              "New insurer onboarded: Easy Life",
            ]}
          />

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
};

export default Dashboard;
