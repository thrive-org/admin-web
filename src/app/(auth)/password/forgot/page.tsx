import ForgotPassword from "@/containers/ForgotPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Thrive Admin",
  description: "Forgot Password on Thrive Admin",
};
const Page = () => <ForgotPassword />;

export default Page;
