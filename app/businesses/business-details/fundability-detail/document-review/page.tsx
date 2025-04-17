import DocumentPreview from "@/app/ui-comps/documentPreview";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <div>
        <h2 className="linkCrumbs">
          <Link href="/businesses">Businesses</Link>
          <span className="text-[25px]">
            <IoIosArrowForward />
          </span>{" "}
          <Link href="/businesses/business-details">Business Details</Link>
          <span className="text-[25px]">
            <IoIosArrowForward />
          </span>{" "}
          <Link href="/businesses/business-details/fundability-detail">
            Fundability Details
          </Link>
          <span className="text-[25px]">
            <IoIosArrowForward />
          </span>{" "}
          <span className="text-[--primaryGreen] cursor-pointer">
            Document Review
          </span>
        </h2>
      </div>
      <h1 className="text-[30px] mt-[10px]">Certificate of Incorporation</h1>

      <DocumentPreview />
    </div>
  );
}
