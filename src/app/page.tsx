import { getUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import { URLS } from "@/constants/page";

const Page = async () => {
  const user = await getUser();

  if (!user) {
    redirect(URLS.LOGIN);
  }

  redirect(URLS.DASHBOARD);
};

export default Page;
