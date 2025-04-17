import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";

type OverviewProps = {
  data: any[];
  type: string;
};

export default function Overview({ data = [], type }: OverviewProps) {
  const safeType = type || "default";
  return (
    <div className="inline-block items-center space-x-2 w-full md:w-[300px] border-2 cursor-pointer border-gray-100 px-4 py-4 rounded-[8px] mb-5 ">
      <div className="flex justify-between text-[15px] ">
        <div>
          {safeType === "users" ? (
            <div className="flex items-center gap-2 ">
              <span className="text-[20px] text-[--greyText]">
                <FaUserCircle />
              </span>
              {safeType}
            </div>
          ) : (
            ""
          )}
          {safeType === "businesses" ? (
            <div className="flex items-center gap-2">
              <span className="text-[20px] text-[--greyText]">
                <MdBusinessCenter />
              </span>
              {safeType}{" "}
            </div>
          ) : (
            ""
          )}
          {safeType === "investors" ? (
            <div className="flex items-center gap-2">
              <span className="text-[20px] text-[--greyText]">
                <MdBusinessCenter />
              </span>
              {safeType}{" "}
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          <span className="text-[--primaryGreen] cursor-pointer">
            {" "}
            <Link href={`/${safeType}`}>View All</Link>{" "}
          </span>
        </div>
      </div>

      <span className="text-[35px] text-[--primaryPurple]">{data.length}</span>
    </div>
  );
}
