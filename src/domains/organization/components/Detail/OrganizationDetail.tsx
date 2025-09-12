'use client';

import React, { useState } from "react";
import Section from "./Section";
import FieldRow from "./FieldRow";
import RequestInfoModal from "./RequestInfoModal";

const OrganizationDetailPage = ({ organization }: { organization: any }) => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const address = organization.address
    ? [
      organization.address.suite,
      organization.address.street,
      organization.address.city,
      organization.address.province,
      organization.address.postalCode,
    ].filter(Boolean).join(", ")
    : organization.address || "-";

  const manager =
    organization.manager?.[0]?.user
      ? `${organization.manager[0].user.firstName} ${organization.manager[0].user.lastName}`
      : "-";

  const type = organization.type?.description || organization.type?.name || "-";

  const handleRequestSubmit = async (text: string) => {
    // TODO: call your API
    // await api.requestMoreInfo({ orgId: organization.id, message: text });
    setIsRequestOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 w-full max-w-[1400px] text-left">
        Review{" "}
        <span className="bg-[linear-gradient(270deg,#01F4C8_50%,#00A8FF_65.19%)] bg-clip-text text-transparent">
          {organization.name}
        </span>{" "}
        Profile
      </h2>

      <div className="bg-white rounded-2xl shadow px-4 md:px-12 py-8 w-full max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section title="Personal & Contact Info">
            <FieldRow label="Name" value={manager} />
            <FieldRow label="Type" value={type} />
            <FieldRow label="Phone Number" value={organization.manager?.[0]?.user?.phone || "-"} />
            <FieldRow label="Email" value={organization.manager?.[0]?.user?.email || "-"} />
            <FieldRow label="Province" value={organization.address?.province || "-"} />
            <FieldRow label="Mailing Address" value={address} />
            <FieldRow label="Website" value={organization.website || "-"} valueHref={organization.website} />
          </Section>

          <Section title="IME Experience & Qualifications">
            <FieldRow label="Languages Spoken" value={(organization.languages || []).join(", ") || "-"} />
            <FieldRow label="Years of IME Experience" value={organization.imeExperience || "-"} />
            <FieldRow label="Share Some Details About Your Past Experience" value={organization.about || ""} />
          </Section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Section title="Medical Credentials">
            <FieldRow label="License Number" value={organization.licenseNumber || "-"} />
            <FieldRow label="Province of Licensure" value={organization.licenseProvince || "-"} />
            <FieldRow
              label="License Expiry Date"
              value={organization.licenseExpiry ? new Date(organization.licenseExpiry).toLocaleDateString() : "-"}
            />
            <FieldRow label="CV / Resume" value="Download" valueHref={organization.cvUrl || "#"} />
            <FieldRow label="Medical License" value="Download" valueHref={organization.licenseUrl || "#"} />
          </Section>

          <Section title="Legal & Compliance">
            <FieldRow label="Insurance Proof" value="Download" valueHref={organization.insuranceProofUrl || "#"} />
            <FieldRow label="Signed NDA" value="Download" valueHref={organization.ndaUrl || "#"} />
          </Section>
        </div>

        <div className="mt-8 flex gap-3 justify-end">
          <button
            className="px-4 py-1.5 rounded-full border border-cyan-400 text-cyan-400 bg-white hover:bg-cyan-50"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, lineHeight: "100%", fontSize: "14px" }}
          >
            Approve Examiner
          </button>
          <button
            onClick={() => setIsRequestOpen(true)}
            className="px-4 py-1.5 rounded-full border border-blue-700 text-blue-700 bg-white hover:bg-blue-50"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, lineHeight: "100%", fontSize: "14px" }}
          >
            Request More Info
          </button>
          <button
            className="px-4 py-1.5 rounded-full text-white bg-red-700 hover:bg-red-800"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, lineHeight: "100%", fontSize: "14px" }}
          >
            Reject Examiner
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
  );
};

export default OrganizationDetailPage;
