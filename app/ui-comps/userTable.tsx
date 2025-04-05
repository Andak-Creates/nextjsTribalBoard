"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";

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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="border-[1px] border-[--borderColor] rounded-[8px] overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-7 bg-gray-200 text-[10px] p-2 font-bold border-b border-gray-300 ">
        <div className="p-2">First Name</div>
        <div className="p-2">Last Name</div>
        <div className="p-2">Email</div>
        <div className="p-2">Company Name</div>
        <div className="p-2">Location</div>
        <div className="p-2">Date Joined</div>
        <div className="p-2">Action</div>
      </div>

      {/* Table Content */}
      {users.slice(0, sliceValue).map((user) => (
        <Link href="users/user-details" key={user.id}>
          <div
            className="grid grid-cols-7 border border-gray-300 text-[12px] hover:bg-gray-100"
            onClick={() => storeUserDetails(user)}
          >
            {/*  */}
            <div className="p-2  overflow-hidden flex-nowrap">
              {user.firstName}
            </div>

            <div className="p-2 overflow-hidden flex-nowrap">
              {user.lastName}
            </div>
            <div className="p-2 overflow-hidden">{user.email}</div>
            <div className="p-2 overflow-hidden">
              {user.hasBusiness ? user.businessDetails?.name : "N/A"}
            </div>
            <div className="p-2 overflow-hidden">{user.location}</div>
            <div className="p-2 overflow-hidden">{user.dateJoined}</div>
            <div className="p-2 overflow-hidden flex items-center gap-2 text-[18px]">
              <span className="text-[--greyText] cursor-pointer">
                <MdModeEdit />
              </span>
              <span className="text-red-600 cursor-pointer">
                <MdDelete />
              </span>
            </div>
            {/*  */}
          </div>
        </Link>
      ))}
    </div>
  );
}
