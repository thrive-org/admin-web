"use client";

import { ChevronRight } from "lucide-react";

const rows = [
  ["Dr. Emily Ross", "Physiatry", "Apr 15, 2025", "Ontario"],
  ["Dr. Michael Chen", "Cardiology", "May 22, 2025", "British Columbia"],
  ["Nurse Sarah", "Pediatrics", "Jun 10, 2025", "Alberta"],
  ["Dr. Aisha Khan", "Neurology", "Jul 30, 2025", "Quebec"],
  ["Dr. Robert Lee", "Oncology", "Aug 12, 2025", "Nova Scotia"],
  ["Dr. Mia Patel", "Gastroenterology", "Sep 5, 2025", "Saskatchewan"],
  ["Nurse James Smith", "Emergency Medicine", "Oct 18, 2025", "Manitoba"],
];

export default function NewExaminers() {
  return (
    <section
      className="rounded-[29px] bg-white shadow-[0_0_36.92px_rgba(0,0,0,0.08)] p-6"
      aria-labelledby="new-examiners-heading"
      style={{ fontFamily: "Poppins, system-ui" }}
    >
      <div className="flex items-center justify-between">
        <h3
          id="new-examiners-heading"
          className="text-[22px] font-semibold tracking-[-0.02em]"
        >
          New <span className="bg-[linear-gradient(270deg,#01F4C8_50%,#00A8FF_65.19%)] bg-clip-text text-transparent">Medical</span> Examiners
        </h3>

        <button
          type="button"
          className="h-[34px] rounded-[20px] bg-[#0C108B] px-4 text-white text-sm"
        >
          View All
        </button>
      </div>

      <p className="mt-1 text-xs text-neutral-500">Pending for verification</p>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200">
        <div className="grid grid-cols-5 bg-neutral-100/70 px-4 py-3 text-sm font-medium tracking-[-0.02em]">
          <div className="col-span-2">Name</div>
          <div>Specialty</div>
          <div>Submitted On</div>
          <div>Province</div>
        </div>

        <ul className="divide-y divide-neutral-200">
          {rows.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-5 items-center px-4 py-3 text-sm tracking-[-0.01em]"
            >
              <span className="col-span-2 text-[#1A1A1A]">{r[0]}</span>
              <span className="text-neutral-700">{r[1]}</span>
              <span className="text-neutral-700">{r[2]}</span>
              <span className="flex items-center justify-between text-neutral-700">
                {r[3]}
                <ChevronRight className="h-4 w-4 text-[#00A8FF]" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
