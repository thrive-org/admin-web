import Login from "@/containers/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Thrive Admin",
  description: "Login yourself on Thrive Admin",
};
const Page = () => <Login />;

export default Page;
