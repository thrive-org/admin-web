import { OrganizationDetail, organizationHandlers } from "@/domains/organization";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const org = await organizationHandlers.getOrganizationById(params.id);
  if (!org) return notFound();
  return <OrganizationDetail organization={org} />;
};

export default Page;
