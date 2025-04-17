"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import ProgressCircle from "./progressCircle";
import { useRouter } from "next/navigation";

interface BusinessProps {
  sliceValue?: number;
}

export default function BusinessTable({ sliceValue = 10 }: BusinessProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
    <div className="table-wrapper">
      <table className="tableElement">
        <thead>
          <tr className="grid grid-cols-7 bg-gray-200 text-[10px] p-2 font-bold border-b border-gray-300">
            <th className="p-2 text-left">Business Name</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Owner</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Documents</th>
            <th className="p-2 text-left">Fundability Score</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.slice(0, sliceValue).map((user) => (
            <tr
              key={user.id}
              className="grid grid-cols-7 items-center border border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                storeUserDetails(user);
                router.push("/businesses/business-details");
              }}
            >
              <td className="p-2 overflow-hidden flex-nowrap">
                {user.businessDetails.name}
              </td>

              <td className="p-2 overflow-hidden flex-nowrap">
                {user.businessDetails.type}
              </td>

              <td className="p-2 overflow-hidden">
                {user.firstName} {user.lastName}
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

              <td className="p-2 overflow-hidden flex items-center gap-2 text-[15px]">
                <span className="text-[--primaryGreen] cursor-pointer">
                  <FaCheckCircle />
                </span>
                <span className="text-red-600 cursor-pointer">
                  <GiCancel />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
