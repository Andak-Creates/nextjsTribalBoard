"use client";

import { useEffect, useState } from "react";

import ProgressCircle from "./progressCircle";
import { GiCancel } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { RiFundsFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface BusinessDetails {
  name: string;
  type: string;
  industry: string;
  companyDescription: string;
  ownershipType: string;
  netProfit: number;
  growthRate: number;
  proposalAmount: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  dateJoined: string;
  hasBusiness: boolean;
  businessDetails?: BusinessDetails;
  documents: number;
  fundabilityScore: number;
  status: string;
}

interface FundabilityTableProps {
  sliceValue?: number;
  linkValue?: string | null;
}

export default function FundabilityTable({
  sliceValue = 16,
  linkValue = "/",
}: FundabilityTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(`${businesses}, ${investors}`);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/67ec02e88a456b79668097d3",
          {
            headers: {
              "X-Master-Key":
                "$2a$10$v6RehC0t7dKcrEwKi3m5H.16bI8P8MsFWnuvu32.boDlOD5OlUWWW",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUsers(data.record);
        const filteredBusinesses = data.record.filter(
          (user: any) => user.hasBusiness === true
        );
        setBusinesses(filteredBusinesses); // Filter users with businesses
        setInvestors(
          data.record.filter((user: any) => user.status === "Investor")
        );
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
    <div className="p-2">
      <h2 className="flex font-bold mb-4 items-center gap-3">
        <span className="text-[--greyText]">
          <RiFundsFill />
        </span>{" "}
        Fundability Tests
      </h2>

      <div className="border-[1px] border-[--borderColor] rounded-[8px] overflow-hidden">
        <table className="w-full text-[12px] text-left border-collapse">
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
            {users.slice(0, sliceValue).map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 border-b items-center border-gray-300 cursor-pointer"
                onClick={() => {
                  storeUserDetails(user);
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
