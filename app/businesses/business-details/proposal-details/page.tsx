"use client";
import ProposalDispaly from "@/app/ui-comps/proposalDisplay";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface UserDetails {
  firstName: string;
  lastName: string;
  // Add other relevant fields here
}

export default function Page() {
  const [userDetails, setUserDetails] = useState<UserDetails[]>([]);

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
      <h2 className="linkCrumbs">
        <Link href="/businesses">Businesses</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link href="/businesses/business-details">Businesses Details</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link
          href="/businesses/business-details/proposal-details"
          className="text-[--primaryGreen]"
        >
          Proposal Details
        </Link>
      </h2>

      <div>
        <ProposalDispaly />
      </div>
    </div>
  );
}
