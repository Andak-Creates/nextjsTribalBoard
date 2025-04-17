"use client";

import { FaUserCircle } from "react-icons/fa";
import UserTable from "../ui-comps/userTable";

export default function page() {
  return (
    <div className="px-2">
      <h1 className="linkCrumbs ">
        <span className="text-[--greyText]">
          <FaUserCircle />
        </span>{" "}
        Users
      </h1>
      <UserTable sliceValue={16} />
    </div>
  );
}
