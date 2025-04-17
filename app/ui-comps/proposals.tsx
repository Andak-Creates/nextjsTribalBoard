"use client";

import { useEffect, useState } from "react";
import ProgressCircle from "./progressCircle";
import clsx from "clsx";
import { FaNairaSign } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProposalProps {
  sliceValue?: number;
  linkValue?: string;
}

export default function Proposals({
  sliceValue = 10,
  linkValue,
}: ProposalProps) {
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

  const router = useRouter();

  return (
    <div className="table-wrapper">
      <table className="tableElement">
        <thead>
          <tr className="bg-gray-200 text-[10px] font-bold border-b border-gray-300">
            <th className="p-2">Date</th>
            <th className="p-2">Business Name</th>
            <th className="p-2">Industry</th>
            <th className="p-2">Proposed Amount</th>
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
                storeUserDetails(user);
                router.push(`/${linkValue}`);
              }}
            >
              <td className="p-2 whitespace-nowrap">{user.dateJoined}</td>
              <td className="p-2 whitespace-nowrap">
                {user.businessDetails.name}
              </td>
              <td className="p-2 whitespace-nowrap">
                {user.businessDetails.industry}
              </td>
              <td className="p-2 whitespace-nowrap flex items-center gap-1">
                <FaNairaSign />
                {user.businessDetails.proposalAmount}
              </td>
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
