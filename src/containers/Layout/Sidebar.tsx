"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Building, Home, LifeBuoy, LogOut, UserPlus } from "lucide-react";
import { signOut } from "next-auth/react";

export const medicalExaminerSidebarRoutes = [
  { icon: Home, label: "Dashboard", href: "/dashboard", index: 0 },
	{
		icon: Building,
		label: "Organization",
		href: "/dashboard/organization",
		index: 1,
	},
  {
    icon: UserPlus,
    label: "Referrals",
    href: "/dashboard/referrals",
    index: 2,
  },
  { icon: LifeBuoy, label: "Support", href: "/dashboard/support", index: 3 },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = ({ isMobileOpen = false, onMobileClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedBtn, setSelectedBtn] = useState<number | null>(null);

  const isValidSidebarIndex = (index: string | null) => {
    return index && !isNaN(Number(index)) && Number(index) >= 0;
  };

  const setSelectedSidebarIndex = (index: number) => {
    setSelectedBtn(index);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedSidebarIndex", index.toString());
    }
  };

  const initializeSelectedSidebarIndex = () => {
    if (typeof window === "undefined") {
      return;
    }
    const storedSelectedBtn = localStorage.getItem("selectedSidebarIndex");
    if (!isValidSidebarIndex(storedSelectedBtn)) {
      setSelectedSidebarIndex(-1);
      return;
    }
    setSelectedSidebarIndex(Number(storedSelectedBtn));
  };

  useEffect(() => {
    initializeSelectedSidebarIndex();
  }, []);

  const checkIsPartOfSidebar = (pathname: string, href: string) => {
    return (
      pathname === href || (pathname.startsWith(href) && href !== "/dashboard")
    );
  };

  useEffect(() => {
    if (typeof window === "undefined" || !pathname) {
      return;
    }

    const matchedItem = medicalExaminerSidebarRoutes.find((item) =>
      checkIsPartOfSidebar(pathname, item.href)
    );

    if (matchedItem) {
      setSelectedSidebarIndex(matchedItem.index);
    }
  }, [pathname]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleNewReferral = () => {
    router.push("/dashboard/ime-referral");
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href);

  const handleLinkClick = (item: (typeof medicalExaminerSidebarRoutes)[0]) => {
    setSelectedSidebarIndex(item.index);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    // Sidebar.tsx  (style-only changes)
    <aside
      className={`fixed top-0 left-0 z-50 flex h-screen w-[280px] transform-gpu flex-col
              bg-white rounded-r-[28px] shadow-[0_6px_30px_rgba(16,24,40,0.06)]
              transition-transform duration-300 ${
                isMobileOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
              border-r border-gray-200`}
    >
      <div className="relative flex h-full min-h-0 w-full flex-col">
        {/* close btn unchanged */}

        {/* Logo */}
        <div className="mb-2 flex items-center justify-center p-6">
          <Image
            src="/images/thriveLogo.png"
            alt="Thrive"
            width={160}
            height={80}
            className="h-10 w-auto"
            priority
          />
        </div>

        {/* Nav */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <nav className="flex-1 space-y-4 overflow-y-auto px-6">
            {medicalExaminerSidebarRoutes.map((item) => {
              const itemIsActive = isActive(item.href);
              const isSelected = selectedBtn === item.index;
              const Icon = item.icon;

              const active = itemIsActive || isSelected;

              return (
                <Link
                  key={item.index}
                  href={item.href}
                  onClick={() => handleLinkClick(item)}
                  title={item.label}
                  className={`mb-2 flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition-all
                ${
                  active
                    ? "bg-gradient-to-r from-[#01F4C8] to-[#00A8FF] text-white shadow-sm"
                    : "bg-[#EEF1F3] text-[#7B8B91] hover:bg-[#E7EBEE] hover:text-[#000093]"
                }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full
                   ${
                     active
                       ? "bg-white/30 text-white"
                       : "bg-[#E0E6E9] text-[#A3ADB3]"
                   }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className={`${active ? "text-white" : "text-inherit"}`}>
                    {item.label}
                  </span>
                  {/* optional chevron area can go here */}
                </Link>
              );
            })}
          </nav>

          {/* Subitems example */}
          {/* <div className="mt-[-8px] px-12 space-y-2">
          <button className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#000093]">
            <Settings size={16} /> Invoices
          </button>
          ...
        </div> */}

          {/* Logout */}
          <div className="flex-shrink-0 p-6">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#000093] px-6 py-3 text-white font-semibold shadow-lg hover:bg-[#000093]/90"
            >
              <LogOut size={20} className="text-white" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
