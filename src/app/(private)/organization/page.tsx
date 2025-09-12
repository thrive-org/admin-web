import { Organization } from "@/domains/organization";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization | Thrive Admin",
  description: "Organization",
};

// Let the page itself be async
export default function Page() {
  return <Organization />;
}
