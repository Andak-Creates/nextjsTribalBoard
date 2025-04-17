import FundabilityDisplay from "@/app/ui-comps/fundabilityDisplay";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <h2 className="linkCrumbs">
        <Link href="/fundability-test">Fundability Test</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <span className="text-[--primaryGreen]">Fundability Details</span>
      </h2>

      <div>
        <FundabilityDisplay linkValue="/fundability-test/fundability-details/document-review" />
      </div>
    </div>
  );
}
