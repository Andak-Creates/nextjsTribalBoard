"use client";

import { useState } from "react";
import SideNav from "./SideNav";
import TopBar from "./topBar";
import LayoutWrapper from "./layoutWrapper";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <div>
      <SideNav isOpen={isSideNavOpen} setIsOpen={setIsSideNavOpen} />

      <LayoutWrapper>
        <TopBar
          isOpen={isSideNavOpen}
          toggleNav={() => setIsSideNavOpen((prev) => !prev)}
        />
        {children}
      </LayoutWrapper>
    </div>
  );
}
