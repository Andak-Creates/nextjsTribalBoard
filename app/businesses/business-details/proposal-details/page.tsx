"use client";
import { useBusinessStore } from "@/app/stores/businessStore";
import ProposalDispaly from "@/app/ui-comps/proposalDisplay";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  const selectedUser = useBusinessStore((state) => state.selectedUser);

  if (!selectedUser) return <p>No Data Found</p>;

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
