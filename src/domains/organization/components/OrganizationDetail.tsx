"use client";

import React, { useState } from "react";
import Section from "@/components/Section";
import FieldRow from "@/components/FieldRow";
import RequestInfoModal from "./RequestInfoModal";
import { DashboardShell } from "@/layouts/dashboard";
import getOrganizationById from "../server/handlers/getOrganizationById";
import { cn } from "@/lib/utils";

const mapStatus = {
  PENDING: "pending",
  ACCEPTED: "approved",
  REJECTED: "rejected",
};

type OrganizationDetailProps = {
  organization: Awaited<ReturnType<typeof getOrganizationById>>;
};

const OrganizationDetail = ({ organization }: OrganizationDetailProps) => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [status, setStatus] = useState(mapStatus[organization.status]);
  console.log(status);
  const [isLoading, setIsLoading] = useState(false);

  const type =
    organization.type?.name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "-";

  const handleRequestSubmit = async (text: string) => {
    // TODO: call your API
    // await api.requestMoreInfo({ orgId: organization.id, message: text });
    setIsRequestOpen(false);
  };

  const handleApproveExaminer = async () => {
    setIsLoading(true);
    // TODO: call your API
    // await api.approveExaminer({ orgId: organization.id });
    setIsLoading(false);
    setStatus("approved");
  };

  const handleRejectExaminer = async () => {
    setIsLoading(true);
    // TODO: call your API
    // await api.rejectExaminer({ orgId: organization.id });
    setIsLoading(false);
    setStatus("rejected");
  };

  return (
    <DashboardShell
      title={
        <h2 className="text-3xl font-bold w-full text-left">
          Review{" "}
          <span className="bg-[linear-gradient(270deg,#01F4C8_50%,#00A8FF_65.19%)] bg-clip-text text-transparent">
            {organization.name}
          </span>{" "}
          Profile
        </h2>
      }
    >
      <div className="w-full flex flex-col items-center">
        <div className="bg-white rounded-2xl shadow px-4 md:px-12 py-8 w-full">
          <div className="flex flex-col lg:flex-row gap-10 w-full">
            <div className="flex flex-col gap-10 w-1/2">
              <Section title="Organization Info">
                <FieldRow label="Name" value={organization.name} type="text" />
                <FieldRow label="Type" value={type} type="text"/>
                <FieldRow label="Website" value={organization.website || "-"} type="text"/>
              </Section>

              <Section title="Manager Info">
                <FieldRow
                  label="Name"
                  value={
                    `${organization.manager?.[0]?.account.user.firstName} ${organization.manager?.[0]?.account.user.lastName}` ||
                    "-"
                  }
                  type="text"
                />
                <FieldRow
                  label="Email"
                  value={organization.manager?.[0]?.account.user.email || "-"}
                  type="text"
                />
                <FieldRow
                  label="Phone"
                  value={organization.manager?.[0]?.account.user.phone || "-"}
                  type="text"
                />
                <FieldRow
                  label="Job Title"
                  value={organization.manager?.[0]?.jobTitle || "-"}
                  type="text"
                />
                <FieldRow
                  label="Department"
                  value={organization.manager?.[0]?.department?.name || "-"}
                  type="text"
                />
              </Section>
            </div>

            <div className="flex flex-col gap-8 w-1/2">
              <Section title="Address">
                <FieldRow
                  label="Address"
                  value={organization.address.address || "-"}
                  type="text"
                />
                <FieldRow
                  label="Province"
                  value={organization.address.province || "-"}
                  type="text"
                />
                <FieldRow
                  label="City"
                  value={organization.address.city || "-"}
                  type="text"
                />
                <FieldRow
                  label="Postal Code"
                  value={organization.address.postalCode || "-"}
                  type="text"
                />
                <FieldRow
                  label="Suite"
                  value={organization.address.suite || "-"}
                  type="text"
                />
                <FieldRow
                  label="Street"
                  value={organization.address.street || "-"}
                  type="text"
                />
              </Section>

              <Section title="Legal & Compliance">
                <FieldRow
                  label="Data Sharing Consent"
                  value={
                    organization.dataSharingConsent === true ? "Yes" : "No"
                  }
                  type="text"
                />
                <FieldRow
                  label="Agree to Terms and Privacy"
                  value={
                    organization.agreeToTermsAndPrivacy === true ? "Yes" : "No"
                  }
                  type="text"
                />
              </Section>
            </div>
          </div>

          <div className="mt-8 flex gap-3 justify-end">
            <button
              className={cn("px-4 py-3 rounded-full border border-cyan-400 text-cyan-400 bg-white hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed",
                isLoading || status === "rejected" || status === "approved" && "cursor-not-allowed"
              )}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                lineHeight: "100%",
                fontSize: "14px",
              }}
              disabled={isLoading || status === "rejected"}
              onClick={handleApproveExaminer}
            >
              {status === "approved"
                ? "Approved"
                : isLoading
                ? "Approving..."
                : "Approve Examiner"}
            </button>
            <button
              onClick={() => setIsRequestOpen(true)}
              className={cn("px-4 py-3 rounded-full border border-blue-700 text-blue-700 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed",
                isLoading || status === "rejected" || status === "approved" && "cursor-not-allowed"
              )}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                lineHeight: "100%",
                fontSize: "14px",
              }}
              disabled={
                isLoading || status === "rejected" || status === "approved"
              }
            >
              {status === "rejected"
                ? "Requested More Info"
                : isLoading
                ? "Requesting..."
                : "Request More Info"}
            </button>
            <button
              className={cn("px-4 py-3 rounded-full text-white bg-red-700 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed",
                isLoading || status === "rejected" || status === "approved" && "cursor-not-allowed"
              )}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                lineHeight: "100%",
                fontSize: "14px",
              }}
              disabled={isLoading || status === "accepted"}
              onClick={handleRejectExaminer}
            >
              {status === "rejected"
                ? "Rejected"
                : isLoading
                ? "Rejecting..."
                : "Reject Examiner"}
            </button>
          </div>
        </div>

        {/* Modal mount */}
        <RequestInfoModal
          open={isRequestOpen}
          onClose={() => setIsRequestOpen(false)}
          onSubmit={handleRequestSubmit}
          title="Request More Info"
          placeholder="Type here"
          maxLength={200}
        />
      </div>
    </DashboardShell>
  );
};

export default OrganizationDetail;
