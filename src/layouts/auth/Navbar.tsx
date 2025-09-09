import Link from "next/link";
import Image from "next/image";
import { URLS } from "@/constants/page";
import { getCurrentUser } from "@/domains/auth/server/session";

const Navbar = async () => {
  const user = await getCurrentUser();
  const href = user ? URLS.DASHBOARD : URLS.LOGIN;

  return (
    <nav className="h-[5rem] md:h-[7.5rem] bg-white shadow-sm z-50 shadow-sm">
      <div className="flex h-full items-center justify-center">
        <Link href={href}>
          <Image
            src="/images/thriveLogo.png"
            alt="Thrive"
            sizes="(max-width: 768px) 100vw, 50vw"
            width={120}
            height={120}
            className="h-[3.5rem] md:h-[4.5rem] w-auto"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
