"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";

export default function ProposalDispaly() {
  const [userDetails, setUserDetails] = useState<any[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("clickedUserDetails");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setUserDetails(Array.isArray(parsedData) ? parsedData : [parsedData]);
    }
  }, []);

  if (userDetails.length === 0) return <p>Checking for Data</p>;

  return (
    <>
      {userDetails.map((user: any) => (
        <div key={user.id}>
          <div>
            {/* Business Name and Status holder */}
            <div className="flex items-center justify-between mt-[20px]">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-[--primaryGreen] w-fit p-3 rounded-[50%] text-[40px]">
                  <MdBusinessCenter />
                </div>

                <div>
                  <h1 className="text-[25px]">{user.businessDetails.name}</h1>
                  <small
                    className={clsx(
                      `p-2 overflow-hidden h-[20px] w-fit flex items-center rounded-[3px]`,
                      {
                        "text-[--rose] bg-red-50":
                          user.status === "Score Too Low",
                        "text-yellow-500 bg-yellow-50":
                          user.status === "Awaiting Proposal",

                        "text-[--primaryGreen] bg-green-50":
                          user.status === "Funded",
                        "text-orange-500 bg-orange-50":
                          user.status === "Pending Response",
                      }
                    )}
                  >
                    {user.status}
                  </small>
                </div>
              </div>
            </div>

            {/* Business OverView */}
            <div className="mt-[40px]">
              <h2 className="font-bold flex items-center gap-1 mb-3 mt[10px]">
                <span className="text-[--greyText]">
                  <MdBusinessCenter />{" "}
                </span>
                Proposal Details
              </h2>
              {userDetails.map((user: any) => (
                <div
                  key={user.id}
                  className="border-[1px] border-[--borderColor] grid grid-cols-2 md:grid-cols-3 p-4 pr-10 gap-4 rounded-[8px] mt-[8px]"
                >
                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Investor
                    </small>
                    <p className=" text-[14px] text-[--primaryGreen]">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Email
                    </small>
                    <p className=" text-[14px]">{user.email}</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Phone Number
                    </small>
                    <p className=" text-[14px]">{user.phoneNumber}</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Date
                    </small>
                    <p className=" text-[14px]">{user.dateJoined}</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Location
                    </small>
                    <p className="text-[14px]">{user.location}</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Proposed Amount
                    </small>
                    <p className=" text-[14px] flex items-center">
                      <FaNairaSign />
                      {user.businessDetails.proposalAmount}
                    </p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Status
                    </small>
                    <p
                      className={clsx(
                        ` overflow-hidden w-fit flex  rounded-[3px]  text-[14px]`,
                        {
                          "text-[--rose] bg-red-50":
                            user.status === "Score Too Low",
                          "text-yellow-500 bg-yellow-50":
                            user.status === "Awaiting Proposal",
                          "text-[--primaryGreen] bg-green-50":
                            user.status === "Funded",
                          "text-orange-500 bg-orange-50":
                            user.status === "Pending Response",
                        }
                      )}
                    >
                      {user.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
