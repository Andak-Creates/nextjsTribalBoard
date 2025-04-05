"use client";
import ProgressCircle from "@/app/ui-comps/progressCircle";
import Proposals from "@/app/ui-comps/proposals";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";
import EditBusinessModal from "../form-comps/editBusinessModal";
import { MessageModal } from "../form-comps/editUserModal";

export default function UserBusisnessDispaly() {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState<string>(""); // Message content
  const [messageType, setMessageType] = useState<"error" | "success">("error"); // Error or Success type
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem("clickedUserDetails");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setUserDetails(Array.isArray(parsedData) ? parsedData : [parsedData]);
    }
  }, []);

  const updateBusinessDetails = async (updatedUser: any) => {
    try {
      const res = await fetch(
        "https://api.jsonbin.io/v3/b/67ec02e88a456b79668097d3/latest",
        {
          headers: {
            "X-Master-Key":
              "$2a$10$v6RehC0t7dKcrEwKi3m5H.16bI8P8MsFWnuvu32.boDlOD5OlUWWW",
          },
        }
      );

      const data = await res.json();
      const updatedUsers = data.record.map((user: any) =>
        user.id === updatedUser.id ? updatedUser : user
      );

      const updateRes = await fetch(
        "https://api.jsonbin.io/v3/b/67ec02e88a456b79668097d3",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$v6RehC0t7dKcrEwKi3m5H.16bI8P8MsFWnuvu32.boDlOD5OlUWWW",
          },
          body: JSON.stringify(updatedUsers),
        }
      );

      if (!updateRes.ok) throw new Error("Failed to update user");
      // Success Message
      setMessage("User updated successfully!");
      setMessageType("success");
      setIsMessageModalOpen(true);
      setUserDetails([updatedUser]);
    } catch (error) {
      setMessage("Error updating user. Please try again.");
      setMessageType("error");
      setIsMessageModalOpen(true);
    }
  };

  if (userDetails.length === 0) return <p>Checking for Data</p>;

  const handleEditBusiness = (user: any) => {
    setShowEditModal(true); // Show the modal for editing business details
  };

  return (
    <>
      {userDetails.map((user: any) => (
        <div key={user.id}>
          <div>
            {/* Business Name and Status holder */}
            <div className="flex items-center justify-between">
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

              <div>
                <button
                  className="px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]"
                  onClick={() => handleEditBusiness(user)}
                >
                  Edit
                </button>
              </div>
            </div>

            <p className="text-[12px] text-[--greyText] w-[80%] my-[20px]">
              {user.businessDetails.companyDescription}
            </p>

            {/* Modal for editing business details */}
            {showEditModal && (
              <EditBusinessModal
                user={user}
                onClose={() => setShowEditModal(false)}
                onSave={updateBusinessDetails}
              />
            )}

            {isMessageModalOpen && (
              <MessageModal
                message={message}
                type={messageType}
                onClose={() => setIsMessageModalOpen(false)} // Close the modal onClose
              />
            )}

            {/* Business OverView */}
            <div>
              <h2 className="font-bold flex items-center gap-1 mb-3 mt[10px]">
                <span className="text-[--greyText]">
                  <MdBusinessCenter />{" "}
                </span>
                Business Overview
              </h2>
              {userDetails.map((user: any) => (
                <div
                  key={user.id}
                  className="border-[1px] border-[--borderColor] grid grid-cols-3 p-4 gap-4 rounded-[8px] mt-[8px]"
                >
                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Owner
                    </small>
                    <p className="font-bold text-[14px] text-[--primaryGreen]">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Email
                    </small>
                    <p className="font-bold text-[14px]">{user.email}</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Phone Number
                    </small>
                    <p className="font-bold text-[14px]">{user.phoneNumber}</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Location
                    </small>
                    <p className="font-bold text-[14px]">{user.location}</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Industry
                    </small>
                    <p className="font-bold text-[14px]">
                      {user.businessDetails.industry}
                    </p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Established
                    </small>
                    <p className="font-bold text-[14px]">{user.dateJoined}</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Ownership Type
                    </small>
                    <p className="font-bold text-[14px]">
                      {user.businessDetails.ownershipType}
                    </p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Verification Status
                    </small>
                    <p
                      className={clsx(
                        ` overflow-hidden w-fit flex  rounded-[3px] font-bold text-[14px]`,
                        {
                          "text-[--rose] ": user.status === "Score Too Low",
                          "text-yellow-500 0":
                            user.status === "Awaiting Proposal",
                          "text-[--primaryGreen] ": user.status === "Funded",
                        }
                      )}
                    >
                      {user.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Fundability Score */}
            <div className="mt-[40px]">
              <h2 className="font-bold flex items-center gap-1 mb-3">
                <span className="text-[--greyText]">
                  <RiFundsFill />{" "}
                </span>
                Fundability Score
              </h2>

              <div className="flex items-center justify-between">
                <div>
                  <ProgressCircle
                    value={user.fundabilityScore}
                    inside
                    color="#41b27c"
                    size={70}
                    strokeWidth={8}
                  />
                </div>

                <div className="flex h-fit gap-5">
                  <button className=" px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]">
                    <Link
                      href={
                        "/users/user-details/business-details/fundability-details"
                      }
                    >
                      View Fundability Details
                    </Link>
                  </button>
                  <button className="px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]">
                    Update Score
                  </button>
                </div>
              </div>
            </div>

            {/* Valuation Report */}
            <div className="mt-[40px] ">
              <h2 className="font-bold flex items-center gap-1 ">
                <span className="text-[--greyText]">
                  <IoDocumentText />{" "}
                </span>
                Valuation Report
              </h2>
              <p>Prepared Thursday {user.dateJoined}</p>

              <div className="border-[1px] border-[borderColor] rounded-[8px] p-5 mt-[18px]">
                <p className="text-[14px] text-[--primaryGreen]">
                  Valuation Summary
                </p>

                <div className="grid grid-cols-3 pb-6 border-b border-[borderColor]">
                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Valuation Range
                    </small>
                    <p className=" text-[14px] flex items-center gap-1">
                      <FaNairaSign /> {user.businessDetails.proposalAmount}
                    </p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Current Fundability Score
                    </small>
                    <p className=" text-[14px]">{user.fundabilityScore}%</p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Investment Potential
                    </small>
                    <p className=" text-[14px]">
                      Summary of investor interest level if applicable
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="pt-6">
                  <p className="text-[14px] text-[--primaryGreen]">
                    Key Valuation Metrics
                  </p>
                  <div className="grid grid-cols-3  ">
                    <div>
                      <small className="text-[12px] text-[--greyText]">
                        Annual Revenue
                      </small>
                      <p className=" text-[14px] flex items-center gap-1">
                        <FaNairaSign />
                        {user.businessDetails.proposalAmount}
                      </p>
                    </div>

                    <div>
                      <small className="text-[12px] text-[--greyText]">
                        EBITDA
                      </small>
                      <p className=" text-[14px] flex items-center gap-1">
                        <FaNairaSign />
                        {user.businessDetails.proposalAmount}
                      </p>
                    </div>

                    <div>
                      <small className="text-[12px] text-[--greyText]">
                        Net Profit Margin
                      </small>
                      <p className=" text-[14px]">Percentage here</p>
                    </div>

                    <div>
                      <small className="text-[12px] text-[--greyText]">
                        Growth Rate
                      </small>
                      <p className=" text-[14px]">
                        {user.businessDetails.growthRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proposals Recieved */}
            <div className="mt-[40px]">
              <Proposals
                sliceValue={3}
                linkValue="users/user-details/business-details/proposals"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
