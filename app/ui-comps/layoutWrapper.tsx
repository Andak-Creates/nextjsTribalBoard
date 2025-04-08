"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./Loading";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // Minimum loader time

    return () => clearTimeout(timer);
  }, [pathname]); // runs on every route change

  if (loading) return <Loading text="Loading..." />;

  return (
    <>
      <div>{children}</div>
    </>
  );
}
