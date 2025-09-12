"use client";
import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useSidebar } from "@/providers/Sidebar";
import Searchbar from "./SearchBar";
import ProfileDropdown from "./ProfileDropDown";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

const PageOptions = [
  {
    name: "dashboard",
    label: "Dashboard",
    search: false,
  },
  {
    name: "ime-referral",
    label: "New IME Referral Request",
    search: false,
  },
  { name: "organization", label: "Organization", search: false },

];

const Header = () => {
  const { data: session } = useSession();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const currentPath = usePathname();

  const pathSegment = currentPath.split("/")[1];

  const currentPage =
    PageOptions.find((page) => page.name === pathSegment) ||
    PageOptions[0];

  const showGreeting = (session: Session | null) => {
    const name = session?.user?.name || "User";
    return (
      <span className="text-[#000000]">
        Welcome, <span className="text-[#000093]">{name}</span> from Desjardins!
      </span>
    );
  };

  const renderTitle = () => {
    if (currentPage.name === "dashboard") {
      return showGreeting(session);
    }
  };

  return (
    <header className="px-8">
      <div className="relative flex w-full flex-col gap-4 p-4">
        {/* Mobile Header Row */}
        <div className="flex items-center justify-between md:hidden">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {/* Title for mobile */}
          <h1 className="flex-1 text-center text-xl font-semibold text-[#000000]">
            {renderTitle()}
          </h1>

          {/* Profile for mobile */}
          {session && <ProfileDropdown isMobile={true} session={session} />}
        </div>

        {/* Desktop Header Row */}
        <div className="hidden md:flex md:items-center md:justify-between md:gap-4">
          {/* Title Section for desktop */}
          <div className="text-left">
            <h1 className="text-xl font-semibold text-[#000000] md:text-2xl lg:text-3xl">
              {renderTitle()}
            </h1>
          </div>

          {/* Search Section for desktop */}
          {currentPage?.search && (
            <Searchbar currentPage={currentPage} isMobile={false} />
          )}

          {/* Profile Section for desktop */}
          {session && <ProfileDropdown isMobile={false} session={session} />}
        </div>

        {/* Mobile Search Section */}
        {currentPage?.search && (
          <Searchbar currentPage={currentPage} isMobile={true} />
        )}
      </div>
    </header>
  );
};

export default Header;