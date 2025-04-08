import DocumentPreview from "@/app/ui-comps/documentPreview";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <div>
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
          <Link href="/users/user-details/business-details/fundability-details">
            Fundability Details
          </Link>
          <span className="text-[25px]">
            <IoIosArrowForward />
          </span>{" "}
          <span className="text-[--primaryGreen]">Document Preview</span>
        </h2>
      </div>
      <h1 className="text-[30px] mt-[10px]">Certificate of Incorporation</h1>

      <DocumentPreview />
    </div>
  );
}
