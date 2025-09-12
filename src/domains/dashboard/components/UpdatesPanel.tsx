"use client";

import { Bell } from "lucide-react";

type Props = { items: string[] };

export default function UpdatesPanel({ items }: Props) {
  return (
    <section
      className="rounded-[29px] w-full bg-white shadow-[0_0_36.92px_rgba(0,0,0,0.08)] p-5 flex flex-col"
      aria-labelledby="updates-heading"
      style={{ fontFamily: "Poppins, system-ui" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 w-full">
        <span className="grid h-[30.5px] w-[30.5px] place-items-center rounded-full bg-[#EEEFFF]">
          {/* gradient bell */}
          <Bell className="h-[16px] w-[16px]" style={{ color: "#00A8FF" }} />
        </span>
        <h3
          id="updates-heading"
          className="text-[18.64px] font-medium tracking-[-0.02em] text-black"
        >
          Recent Updates
        </h3>
      </div>

      {/* List */}
      <div className="space-y-2 overflow-hidden">
        {items.slice(0, 5).map((t, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 w-full rounded-md py-2 bg-[#F2F2F2] px-4"
          >
            {/* gradient dot */}
            <span className="h-[9px] w-[9px] rounded-full bg-[linear-gradient(270deg,#01F4C8_0%,#00A8FF_100%)]" />
            <p className="text-[13px] tracking-[-0.02em] text-[#444] truncate">{t}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto pt-4">
        <button
          type="button"
          className="py-2 px-4 rounded-full bg-[#000093] text-white text-[15px] tracking-[-0.01em]"
        >
          View All
        </button>
      </div>
    </section>
  );
}
