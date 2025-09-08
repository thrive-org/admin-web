"use client";
import React from "react";
import SessionProvider from "./Session";
import SearchProvider from "./Search";
import SidebarProvider from "./Sidebar";
import ThemeProvider from "./Theme";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SessionProvider>
        <SearchProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </SearchProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
