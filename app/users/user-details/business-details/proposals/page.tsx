"use client";

import ProposalDispaly from "@/app/ui-comps/proposalDisplay";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <h1 className="linkCrumbs">
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
      </h1>

      <div>
        <ProposalDispaly />
      </div>
    </div>
  );
}
