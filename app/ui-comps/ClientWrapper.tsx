"use client";

import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import TopBar from "./topBar";
import LayoutWrapper from "./layoutWrapper";
import { useUserStore } from "../stores/userStore";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const setUsers = useUserStore((state) => state.setUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data.record); // Populate Zustand store
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUsers();
  }, [setUsers]);

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
