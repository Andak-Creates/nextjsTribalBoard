import { MdBusinessCenter } from "react-icons/md";
import BusinessTable from "../ui-comps/businessTable";

export default function Page() {
  return (
    <div>
      <h2 className="linkCrumbs">
        <span className="text-[--greyText]">
          <MdBusinessCenter />
        </span>{" "}
        Businesses
      </h2>
      <BusinessTable sliceValue={16} />
    </div>
  );
}
