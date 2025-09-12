"use client";
import { useState } from "react";
import { OrganizationRow } from "./columns";
import OrganizationTable from "./OrganizationTable";

interface OrganizationTableClientProps {
  data: OrganizationRow[];
}

const OrganizationTableClient = ({ data }: OrganizationTableClientProps) => {
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
      <div className="flex justify-end mb-8">
        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-6 py-4 rounded-lg border border-gray-300 w-2/4 focus:outline-none focus:ring-2 focus:ring-blue-200"
          style={{ fontFamily: 'Poppins, system-ui', fontSize: '18px' }}
        />
      </div>
      <OrganizationTable data={filteredData} />
    </div>
  );
};

export default OrganizationTableClient;
