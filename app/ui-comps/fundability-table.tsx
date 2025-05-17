"use client";

import { useEffect } from "react";

import ProgressCircle from "./progressCircle";
import { GiCancel } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { RiFundsFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

import { useUserStore } from "../stores/userStore";

interface FundabilityTableProps {
  sliceValue?: number;
  linkValue?: string | null;
}

export default function FundabilityTable({
  sliceValue = 16,
  linkValue = "/",
}: FundabilityTableProps) {
  const { users, loading, error, fetchUsers, setSelectedUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-2">
      <h2 className="flex font-bold mb-4 items-center gap-3">
        <span className="text-[--greyText]">
          <RiFundsFill />
        </span>{" "}
        Fundability Tests
      </h2>

      <div className="table-wrapper">
        <table className="tableElement">
          <thead>
            <tr className="bg-gray-200 text-[10px] font-bold border-b border-gray-300">
              <th className="p-2">Name</th>
              <th className="p-2">Business Name</th>
              <th className="p-2">Business Type</th>
              <th className="p-2">Email</th>
              <th className="p-2">Docs</th>
              <th className="p-2">Fundability Score</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.slice(0, sliceValue).map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 border-b items-center border-gray-300 cursor-pointer"
                  onClick={() => {
                    setSelectedUser(user);
                    router.push(linkValue || "/");
                  }}
                >
                  <td className="p-2 overflow-hidden whitespace-nowrap">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-2 overflow-hidden whitespace-nowrap">
                    {user.hasBusiness ? user.businessDetails?.name : "N/A"}
                  </td>
                  <td className="p-2 overflow-hidden">
                    {user.hasBusiness ? user.businessDetails?.type : "N/A"}
                  </td>
                  <td className="p-2 overflow-hidden">{user.email}</td>
                  <td className="p-2 overflow-hidden">{user.documents}</td>
                  <td className="p-2 overflow-hidden">
                    <ProgressCircle
                      value={user.fundabilityScore}
                      size={25}
                      strokeWidth={4}
                      color="#41b27c"
                    />
                  </td>
                  <td className="p-2 overflow-hidden">
                    <div className="flex items-center gap-2 text-[15px]">
                      <span className="text-[--primaryGreen]">
                        <FaCheckCircle />
                      </span>
                      <span className="text-red-600">
                        <GiCancel />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
