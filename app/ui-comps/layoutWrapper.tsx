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
    <div>
      <div className="flex-1 ml-0 m-4 mt-[100px] w-full lg:w-[80%]  px-[15px] lg:mt-[80px]  lg:ml-64 md:p-5">
        {children}
      </div>
    </div>
  );
}
