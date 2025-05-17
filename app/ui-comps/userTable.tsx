"use client";

import { useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useUserStore } from "../stores/userStore";

interface UserTableProps {
  sliceValue?: number;
}

export default function UserTable({ sliceValue = 10 }: UserTableProps) {
  const { users, loading, error, fetchUsers, setSelectedUser } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const router = useRouter();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="table-wrapper">
      <table className="tableElement">
        {/* Table Header */}
        <thead className="bg-gray-200 text-[10px] font-bold border-b border-gray-300">
          <tr className="grid grid-cols-7 p-2">
            <th className="p-2 text-left">First Name</th>
            <th className="p-2 text-left">Last Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Company Name</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Date Joined</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        {/* Table Content */}
        <tbody>
          {Array.isArray(users) &&
            users.slice(0, sliceValue).map((user: any) => (
              <tr
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  router.push("users/user-details");
                }}
                className="grid grid-cols-7 border items-center border-gray-300 text-[12px] hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-2 overflow-hidden flex-nowrap">
                  {user.firstName}
                </td>
                <td className="p-2 overflow-hidden flex-nowrap">
                  {user.lastName}
                </td>
                <td className="p-2 overflow-hidden">{user.email}</td>
                <td className="p-2 overflow-hidden">
                  {user.hasBusiness ? user.businessDetails?.name : "N/A"}
                </td>
                <td className="p-2 overflow-hidden">{user.location}</td>
                <td className="p-2 overflow-hidden">{user.dateJoined}</td>
                <td className="p-2 overflow-hidden flex items-center gap-2 text-[18px]">
                  <span
                    className="text-[--greyText] cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit handler here if needed
                    }}
                  >
                    <MdModeEdit />
                  </span>
                  <span
                    className="text-red-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete handler here if needed
                    }}
                  >
                    <MdDelete />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
