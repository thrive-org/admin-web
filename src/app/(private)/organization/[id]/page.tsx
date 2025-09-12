import OrganizationDetailPage from "@/domains/organization/components/Detail/OrganizationDetail";
import getOrganizationById from "@/domains/organization/server/handlers/getOrganizationById";
import { notFound } from "next/navigation";

export default async function OrganizationDetail({ params }: { params: { id: string } }) {
  const org = await getOrganizationById(params.id);
  if (!org) return notFound();
  return <OrganizationDetailPage organization={org} />;
}
