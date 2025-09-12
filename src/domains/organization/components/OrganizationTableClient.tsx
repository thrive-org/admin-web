"use client";
import { useState } from "react";
import { OrganizationListTable, OrganizationRow } from "./OrganizationListTable";

interface OrganizationTableClientProps {
  data: OrganizationRow[];
}

export default function OrganizationTableClient({ data }: OrganizationTableClientProps) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(org =>
    org.name?.toLowerCase().includes(search.toLowerCase()) ||
    org.website?.toLowerCase().includes(search.toLowerCase()) ||
    org.status?.toLowerCase().includes(search.toLowerCase()) ||
    org.typeName?.toLowerCase().includes(search.toLowerCase()) ||
    org.address?.toLowerCase().includes(search.toLowerCase()) ||
    org.managerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          style={{ fontFamily: 'Poppins, system-ui', fontSize: '14px', width: '240px' }}
        />
      </div>
      <OrganizationListTable data={filteredData} />
    </div>
  );
}
