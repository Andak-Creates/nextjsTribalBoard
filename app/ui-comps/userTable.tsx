"use client";

import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

interface UserTableProps {
  sliceValue?: number;
}

export default function UserTable({ sliceValue = 10 }: UserTableProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/67ec02e88a456b79668097d3",
          {
            headers: {
              "X-Master-Key":
                "$2a$10$v6RehC0t7dKcrEwKi3m5H.16bI8P8MsFWnuvu32.boDlOD5OlUWWW ",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUsers(data.record);
      } catch (err) {
        setError("Error fetching users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const storeUserDetails = (user: any) => {
    // Make sure the user object is valid
    if (user && user.id) {
      // Store user details in sessionStorage
      sessionStorage.setItem("clickedUserDetails", JSON.stringify(user));
    } else {
      console.error("Invalid user data");
    }
  };

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
          {users.slice(0, sliceValue).map((user: any) => (
            <tr
              key={user.id}
              onClick={() => {
                storeUserDetails(user);
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
