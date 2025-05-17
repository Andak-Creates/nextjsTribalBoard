"use client";

import ProgressCircle from "./progressCircle";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useBusinessStore } from "../stores/businessStore";
import { useEffect } from "react";

interface BusinessProps {
  sliceValue?: number;
}

export default function Businessstat({ sliceValue = 10 }: BusinessProps) {
  const { users, loading, error, fetchUsers, setSelectedUser } =
    useBusinessStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredUsers = users.filter((user) => user.hasBusiness);

  const router = useRouter();

  return (
    <div className="table-wrapper">
      <table className="tableElement">
        <thead>
          <tr className="bg-gray-200 text-[10px] font-bold border-b border-gray-300">
            <th className="p-2">Business Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Industry</th>
            <th className="p-2">Email</th>
            <th className="p-2">Documents</th>
            <th className="p-2">Fundability Score</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.slice(0, sliceValue).map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
              onClick={() => {
                setSelectedUser(user);
                router.push("/users/user-details/business-details");
              }}
            >
              <td className="p-2 whitespace-nowrap">
                {user.businessDetails?.name}
              </td>
              <td className="p-2 whitespace-nowrap">
                {user.businessDetails?.type}
              </td>
              <td className="p-2 whitespace-nowrap">
                {user.businessDetails?.industry}
              </td>
              <td className="p-2 whitespace-nowrap">{user.email}</td>
              <td className="p-2 whitespace-nowrap">{user.documents}</td>
              <td className="p-2 whitespace-nowrap">
                <ProgressCircle
                  value={user.fundabilityScore}
                  size={25}
                  strokeWidth={4}
                  color="#41b27c"
                />
              </td>
              <td className="p-2 whitespace-nowrap">
                <p
                  className={clsx(
                    `p-2 h-[20px] w-fit flex items-center rounded-[3px]`,
                    {
                      "text-[--rose] bg-red-50":
                        user.status === "Score Too Low",
                      "text-yellow-500 bg-yellow-50":
                        user.status === "Awaiting Proposal",
                      "text-[--primaryGreen] bg-green-50":
                        user.status === "Funded",
                    }
                  )}
                >
                  {user.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
