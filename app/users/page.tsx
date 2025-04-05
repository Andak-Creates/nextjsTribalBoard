"use client";

import { FaUserCircle } from "react-icons/fa";
import UserTable from "../ui-comps/userTable";

export default function page() {
  return (
    <div className="px-2">
      <h2 className="flex font-bold mb-4 items-center gap-3">
        <span className="text-[--greyText]">
          <FaUserCircle />
        </span>{" "}
        Users
      </h2>
      <UserTable sliceValue={16} />
    </div>
  );
}
