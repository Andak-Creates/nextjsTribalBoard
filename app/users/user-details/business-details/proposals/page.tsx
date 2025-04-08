"use client";
import ProposalDispaly from "@/app/ui-comps/proposalDisplay";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  const [userDetails, setUserDetails] = useState<any[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("clickedUserDetails");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setUserDetails(Array.isArray(parsedData) ? parsedData : [parsedData]);
    }
  }, []);

  if (userDetails.length === 0) return <p>Checking for Data</p>;

  return (
    <div className="p-5">
      <h2 className="flex  mb-4 items-center gap-3 ">
        <Link href="users">Users</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link href="/users/user-details">User Details</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link href="/users/user-details/business-details">
          Businesses Details
        </Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link
          href="/users/user-details/business-details/proposals"
          className="text-[--primaryGreen]"
        >
          Proposals
        </Link>
      </h2>

      <div>
        <ProposalDispaly />
      </div>
    </div>
  );
}
