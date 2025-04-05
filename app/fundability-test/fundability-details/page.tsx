import FundabilityDisplay from "@/app/ui-comps/fundabilityDisplay";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function page() {
  return (
    <div className="p-5">
      <h2 className="flex  mb-4 items-center gap-3 ">
        <Link href="/fundability-test">Fundability Test</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <span className="text-[--primaryGreen]">Fundability Details</span>
      </h2>

      <div>
        <FundabilityDisplay />
      </div>
    </div>
  );
}
