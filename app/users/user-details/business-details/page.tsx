import UserBusisnessDispaly from "@/app/ui-comps/userBusinessDisplay";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="p-5">
      <h1 className="linkCrumbs">
        <Link href="/users">Users</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link href="/users/user-details">User Details</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>
        <span className="text-[--primaryGreen]">Business Details</span>
      </h1>

      <div>
        <UserBusisnessDispaly />
      </div>
    </div>
  );
}
