import FundabilityDisplay from "@/app/ui-comps/fundabilityDisplay";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <h2 className="linkCrumbs">
        <Link href="/businesses">Businesses</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link href="/businesses/business-details">Business Details</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <span className="text-[--primaryGreen] cursor-pointer">
          Fundability Details
        </span>
      </h2>

      <div>
        <FundabilityDisplay linkValue="/businesses/business-details/fundability-detail/document-review" />
      </div>
    </div>
  );
}
