"use client";

import { useEffect, useState } from "react";
import Overview from "./overview";
import { Business } from "../types/user";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  dateJoined: string;
  hasBusiness: boolean;

  documents: number;
  fundabilityScore: number;
  status: string;
}

export default function FetchingComp() {
  const [users, setUsers] = useState<User[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [investors, setInvestors] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const userArray: User[] = data.users ?? data.record ?? [];

        if (!Array.isArray(userArray)) {
          throw new Error("User data is not an array");
        }

        setUsers(userArray);
        const filteredBusinesses = userArray
          .filter((user: any) => user.hasBusiness === true)
          .map((user: any) => ({
            // Map User to Business type; adjust property mapping as needed
            id: user.id,
            name: user.businessName ?? "", // Replace with actual property if available
            type: user.businessType ?? "", // Replace with actual property if available
            industry: user.businessIndustry ?? "", // Replace with actual property if available
            ownerId: user.id,
            // Add other Business properties if required
          }));
        setBusinesses(filteredBusinesses); // Filter users with businesses
        setInvestors(
          userArray.filter((user: User) => user.status === "Investor")
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

  console.log(`${loading} and ${error}`);

  return (
    <div className="flex pl-2 flex-wrap justify-between">
      <Overview data={users} type={"users"} />
      <Overview data={businesses} type={"businesses"} />
      <Overview data={investors} type={"investors"} />
    </div>
  );
}
