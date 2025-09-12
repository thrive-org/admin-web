import { Metadata } from "next";
import listAllCases from "@/domains/case/actions/listAllCases";
import CaseTable from "@/domains/case/components/CaseTable";
import { CaseData } from "@/domains/case/types/CaseData";
import { DashboardShell } from "@/layouts/dashboard";

export const metadata: Metadata = {
  title: "Cases | Thrive Admin",
  description: "Cases",
};

const Page = async () => {
  const cases = await listAllCases();

  const data = cases.map(
    (c) =>
      ({
        id: c.id,
        number: c.referral.number,
        claimant: c.claimant.name,
        organization: c.organization?.name || "Unknown",
        caseType: c.caseType.name,
        examFormat: c.examFormat.name,
        requestedSpecialty: c.requestedSpecialty.name,
        status: c.status.name,
        preferredLocation: c.preferredLocation || "Unknown",
        urgencyLevel: c.urgencyLevel,
        reason: c.reason,
        examinerId: c.examinerId || "Unknown",
        submittedAt: new Date(c.createdAt).toISOString(),
      } as CaseData)
  );
  return (
    <DashboardShell
      title={
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-[36px] font-semibold text-black font-poppins">
            Referral{" "}
            <span className="bg-gradient-to-r from-[#00A8FF] to-[#01F4C8] bg-clip-text text-transparent">
              Cases
            </span>
          </h1>
          <p className="text-[#676767] font-poppins font-normal text-[18px] leading-none">
            View all referral cases, manage requests and track statuses.
          </p>
        </div>
      }
    >
      <div className="bg-white shadow-sm rounded-[30px] px-6 py-8">
        <CaseTable data={data} />
      </div>
    </DashboardShell>
  );
};

export default Page;
