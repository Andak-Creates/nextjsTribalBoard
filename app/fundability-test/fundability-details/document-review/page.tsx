import DocumentPreview from "@/app/ui-comps/documentPreview";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <div>
        <h2 className="linkCrumbs">
          <Link href="/fundability-test">Fundability Test</Link>
          <span className="text-[25px]">
            <IoIosArrowForward />
          </span>{" "}
          <Link href="/fundability-test/fundability-details">
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
