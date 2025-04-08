"use client";

import { useEffect, useState } from "react";
import Overview from "./overview";

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
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [investors, setInvestors] = useState<any[]>([]);
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

  console.log(`${loading} and ${error}`);

  return (
    <div className="flex pl-2 flex-wrap justify-between">
      <Overview data={users} type={"users"} />
      <Overview data={businesses} type={"businesses"} />
      <Overview data={investors} type={"investors"} />
    </div>
  );
}
