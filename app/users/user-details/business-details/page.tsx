import UserBusisnessDispaly from "@/app/ui-comps/userBusinessDisplay";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function page() {
  return (
    <div className="p-5">
      <h2 className="flex  mb-4 items-center gap-3 ">
        <Link href="/users">Users</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <Link href="/users/user-details">User Details</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>
        <span className="text-[--primaryGreen]">Business Details</span>
      </h2>

      <div>
        <UserBusisnessDispaly />
      </div>
    </div>
  );
}
