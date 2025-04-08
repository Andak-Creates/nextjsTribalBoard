import FundabilityDisplay from "@/app/ui-comps/fundabilityDisplay";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <h2 className="flex  mb-4 items-center gap-3 ">
        <Link href="/users">User</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link href="/users/user-details">User Details</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link href="/users/user-details/business-details">
          Business Details
        </Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <span className="text-[--primaryGreen] cursor-pointer">
          Fundability Details
        </span>
      </h2>

      <div>
        <FundabilityDisplay linkValue="/users/user-details/business-details/fundability-details/document-review" />
      </div>
    </div>
  );
}
