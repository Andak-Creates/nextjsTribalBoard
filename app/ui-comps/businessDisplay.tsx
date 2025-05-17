"use client";
import ProgressCircle from "@/app/ui-comps/progressCircle";
import Proposals from "@/app/ui-comps/proposals";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";
import EditBusinessModal from "@/app/form-comps/editBusinessModal";
import { MessageModal } from "../form-comps/editUserModal";
import EditFundabilityModal from "../form-comps/editFundability";
import { FundabilityUpdate, User } from "../types/user";
import { useBusinessStore } from "../stores/businessStore";

export default function BusisnessDispaly() {
  const { selectedUser } = useBusinessStore();
  const updateUser = useBusinessStore((state) => state.updateUser);
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState<string>(""); // Message content
  const [messageType, setMessageType] = useState<"error" | "success">("error"); // Error or Success type
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [showEditFundability, setShowEditFundability] = useState(false);

  const updateBusinessInFirestore = async (updatedUser: User) => {
    try {
      const res = await fetch(`/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      updateUser(updatedUser); // Update the user in the store
      // Success Message
      setMessage("User updated successfully!");
      setMessageType("success");
      setIsMessageModalOpen(true);
    } catch (error) {
      setMessage("Error updating user. Please try again.");
      setMessageType("error");
      setIsMessageModalOpen(true);
    }
  };

  const updateFundabilityInFireStore = async (updatedUser: User) => {
    try {
      const res = await fetch(`/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      updateUser(updatedUser); // Update the user in the store
      // Success Message
      setMessage("User updated successfully!");
      setMessageType("success");
      setIsMessageModalOpen(true);
    } catch (error) {
      setMessage(`Error updating fundability: ${error}`);
      setMessageType("error");
      setIsMessageModalOpen(true);
    }
  };

  if (!selectedUser) return <p>No user selected</p>;

  const handleSaveFundability = (updatedFundability: FundabilityUpdate) => {
    // Merge the updated fundability into the selectedUser object
    if (!selectedUser) return;
    const updatedUser = {
      ...selectedUser,
      fundabilityScore: updatedFundability.fundabilityScore,
      // Add other fundability fields if needed
    };
    updateFundabilityInFireStore(updatedUser);
  };

  // Function to handle saving the updated user

  const handleSaveUser = (updatedUser: User) => {
    updateBusinessInFirestore(updatedUser);
  };

  const handleEditBusiness = (user: User) => {
    if (user) {
      setShowEditModal(true);
    } // Show the modal for editing business details
  };

  return (
    <>
      <div>
        <div>
          {/* Business Name and Status holder */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-[--primaryGreen] w-fit p-3 rounded-[50%] text-[40px]">
                <MdBusinessCenter />
              </div>

              <div>
                <h1 className="text-[25px]">
                  {selectedUser.businessDetails?.name}
                </h1>
                <small
                  className={clsx(
                    `p-2 overflow-hidden h-[20px] w-fit flex items-center rounded-[3px]`,
                    {
                      "text-[--rose] bg-red-50":
                        selectedUser.status === "Score Too Low",
                      "text-yellow-500 bg-yellow-50":
                        selectedUser.status === "Awaiting Proposal",

                      "text-[--primaryGreen] bg-green-50":
                        selectedUser.status === "Funded",
                      "text-orange-500 bg-orange-50":
                        selectedUser.status === "Pending Response",
                    }
                  )}
                >
                  {selectedUser.status}
                </small>
              </div>
            </div>

            <div>
              <button
                className="px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]"
                onClick={() => handleEditBusiness(selectedUser)}
              >
                Edit
              </button>
            </div>
          </div>

          <p className="text-[12px] text-[--greyText] w-[80%] my-[20px]">
            {selectedUser.businessDetails?.companyDescription}
          </p>

          {showEditFundability && (
            <EditFundabilityModal
              user={selectedUser}
              onClose={() => setShowEditFundability(false)}
              onSave={handleSaveFundability}
            />
          )}

          {/* Modal for editing business details */}
          {showEditModal && (
            <EditBusinessModal
              user={selectedUser}
              onClose={() => setShowEditModal(false)}
              onSave={handleSaveUser}
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

            <div
              key={selectedUser.id}
              className="border-[1px] border-[--borderColor] grid dataTab   rounded-[8px] mt-[8px]"
            >
              <div>
                <small className="text-[12px] text-[--greyText]">Owner</small>
                <p className="font-bold text-[14px] text-[--primaryGreen]">
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">Email</small>
                <p className="font-bold text-[14px]">{selectedUser.email}</p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Phone Number
                </small>
                <p className="font-bold text-[14px]">
                  {selectedUser.phoneNumber}
                </p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Location
                </small>
                <p className="font-bold text-[14px]">{selectedUser.location}</p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Industry
                </small>
                <p className="font-bold text-[14px]">
                  {selectedUser.businessDetails?.industry}
                </p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Established
                </small>
                <p className="font-bold text-[14px]">
                  {selectedUser.dateJoined}
                </p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Ownership Type
                </small>
                <p className="font-bold text-[14px]">
                  {selectedUser.businessDetails?.ownershipType}
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
                      "text-[--rose] ": selectedUser.status === "Score Too Low",
                      "text-yellow-500 0":
                        selectedUser.status === "Awaiting Proposal",
                      "text-[--primaryGreen] ":
                        selectedUser.status === "Funded",
                    }
                  )}
                >
                  {selectedUser.status}
                </p>
              </div>
            </div>
          </div>

          {/* Fundability Score */}
          <div className="mt-[40px]">
            <h2 className="font-bold flex items-center gap-1 mb-3">
              <span className="text-[--greyText]">
                <RiFundsFill />{" "}
              </span>
              Fundability Score
            </h2>

            <div className="flex flex-col md:flex-row gap-4 items-start justify-start md:items-center md:justify-between">
              <div className="w-fit">
                <ProgressCircle
                  value={selectedUser.fundabilityScore}
                  inside
                  color="#41b27c"
                  size={70}
                  strokeWidth={8}
                />
              </div>

              <div className="flex h-fit gap-5">
                <button className="px-2 md:px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]">
                  <Link
                    href={"/businesses/business-details/fundability-detail"}
                  >
                    View Fundability Details
                  </Link>
                </button>
                <button
                  className="px-2 md:px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]"
                  onClick={() => setShowEditFundability(true)}
                >
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
            <p>Prepared Thursday {selectedUser.dateJoined}</p>

            <div className="border-[1px] border-[borderColor] rounded-[8px] p-5 mt-[18px]">
              <p className="text-[14px] text-[--primaryGreen]">
                Valuation Summary
              </p>

              <div className="grid dataTab pb-6 border-b border-[borderColor]">
                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Valuation Range
                  </small>
                  <p className=" text-[14px] flex items-center gap-1">
                    <FaNairaSign />{" "}
                    {selectedUser.businessDetails?.proposalAmount}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Current Fundability Score
                  </small>
                  <p className=" text-[14px]">
                    {selectedUser.fundabilityScore}%
                  </p>
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
                <div className="grid dataTab  ">
                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      Annual Revenue
                    </small>
                    <p className=" text-[14px] flex items-center gap-1">
                      <FaNairaSign />
                      {selectedUser.businessDetails?.proposalAmount}
                    </p>
                  </div>

                  <div>
                    <small className="text-[12px] text-[--greyText]">
                      EBITDA
                    </small>
                    <p className=" text-[14px] flex items-center gap-1">
                      <FaNairaSign />
                      {selectedUser.businessDetails?.proposalAmount}
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
                      {selectedUser.businessDetails?.growthRate}%
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
              linkValue="businesses/business-details/proposal-details"
            />
          </div>
        </div>
      </div>
    </>
  );
}
