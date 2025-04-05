"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import ProgressCircle from "./progressCircle";
import Link from "next/link";

interface BusinessProps {
  sliceValue?: number;
}

export default function BusinessTable({ sliceValue = 10 }: BusinessProps) {
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
    if (user && user.id) {
      sessionStorage.setItem("clickedUserDetails", JSON.stringify(user));
    } else {
      console.log("invalid user Data");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredUsers = users.filter((user) => user.hasBusiness);

  return (
    <div className="border-[1px] border-[--borderColor] rounded-[8px] overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-7 bg-gray-200 text-[10px] p-2 font-bold border-b border-gray-300">
        <div className="p-2">Business Name</div>
        <div className="p-2">Type</div>
        <div className="p-2">Owner</div>
        <div className="p-2">Email</div>
        <div className="p-2">Documents</div>
        <div className="p-2">Fundability Score</div>
        <div className="p-2">Action</div>
      </div>

      {/* Table Content */}
      {filteredUsers.slice(0, sliceValue).map((user) => (
        <Link href="/businesses/business-details" key={user.id}>
          <div
            className="grid grid-cols-7 text-[12px] border border-gray-300 hover:bg-gray-100"
            onClick={() => storeUserDetails(user)}
          >
            <div className="p-2  overflow-hidden flex-nowrap">
              {user.businessDetails.name}
            </div>

            <div className="p-2 overflow-hidden flex-nowrap">
              {user.businessDetails.type}
            </div>
            <div className="p-2 overflow-hidden">
              {user.firstName} {user.lastName}
            </div>
            <div className="p-2 overflow-hidden">{user.email}</div>
            <div className="p-2 overflow-hidden">{user.documents}</div>
            <div className="p-2 overflow-hidden">
              <ProgressCircle
                value={user.fundabilityScore}
                size={25}
                strokeWidth={4}
                color="#41b27c"
              />
            </div>
            <div className="p-2 overflow-hidden flex items-center gap-2 text-[15px]">
              <span className="text-[--primaryGreen] cursor-pointer">
                <FaCheckCircle />
              </span>
              <span className="text-red-600 cursor-pointer">
                <GiCancel />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
