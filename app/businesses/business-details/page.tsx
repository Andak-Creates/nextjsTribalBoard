import BusisnessDispaly from "@/app/ui-comps/businessDisplay";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <h2 className="flex  mb-4 items-center gap-3 ">
        <Link href="/businesses">Businesses</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link
          href="/businesses/business-details"
          className="text-[--primaryGreen]"
        >
          Business Details
        </Link>
      </h2>

      <div>
        <BusisnessDispaly />
      </div>
    </div>
  );
}
