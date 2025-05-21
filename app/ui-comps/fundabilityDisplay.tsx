"use client";

import { useState } from "react";
import ProgressCircle from "./progressCircle";
import { RiFundsFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { FaNairaSign } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import DocumentComp from "./documentComp";
import { MessageModal } from "../form-comps/editUserModal";
import EditFundabilityModal from "../form-comps/editFundability";
import Link from "next/link";
import { FundabilityUpdate, User } from "../types/user";

import { useUserStore } from "../stores/userStore";

interface linkProp {
  linkValue?: string;
}

export default function FundabilityDisplay({ linkValue }: linkProp) {
  const { selectedUser, updateUser } = useUserStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

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
      updateUser(updatedUser);

      setMessage("Fundability updated successfully!");
      setMessageType("success");
      setIsMessageModalOpen(true);
    } catch (error) {
      setMessage(`Error updating fundability: ${error}`);
      setMessageType("error");
      setIsMessageModalOpen(true);
    }
  };

  if (selectedUser === null) return <p>Error collecting user details</p>;

  const handleSaveFundability = (updatedFundability: FundabilityUpdate) => {
    if (!selectedUser) return;
    const updatedUser = {
      ...selectedUser,
      fundabilityScore: updatedFundability.fundabilityScore,
    };

    updateFundabilityInFireStore(updatedUser);
  };

  return (
    <div>
      <div>
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
                value={selectedUser.fundabilityScore}
                inside
                color="#41b27c"
                size={80}
                strokeWidth={8}
              />
            </div>

            <div className="flex h-fit ">
              <button
                className="px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]"
                onClick={() => setShowEditModal(true)}
              >
                Update Score
              </button>
            </div>
          </div>
        </div>

        {/* Business OverView */}
        <div className="mt-[30px]">
          <h2 className="font-bold flex items-center gap-1 mb-3 mt[10px]">
            <span className="text-[--greyText]">
              <MdBusinessCenter />{" "}
            </span>
            Business Overview
          </h2>

          {showEditModal && (
            <EditFundabilityModal
              user={selectedUser}
              onClose={() => setShowEditModal(false)}
              onSave={handleSaveFundability}
            />
          )}

          {isMessageModalOpen && (
            <MessageModal
              message={message}
              type={messageType}
              onClose={() => setIsMessageModalOpen(false)}
            />
          )}

          <div
            key={selectedUser.id}
            className="border-[1px] border-[--borderColor] grid dataTab rounded-[8px] mt-[8px]"
          >
            <div>
              <small className="text-[12px] text-[--greyText]">
                Business Name
              </small>
              <p className="font-bold text-[14px] text-[--primaryGreen]">
                {selectedUser.businessDetails?.name}
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
                Business Owner
              </small>
              <p className="font-bold text-[14px] text-[--primaryGreen]">
                {selectedUser.firstName} {selectedUser.lastName}
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
              <small className="text-[12px] text-[--greyText]">Location</small>
              <p className="font-bold text-[14px]">{selectedUser.dateJoined}</p>
            </div>

            <div>
              <small className="text-[12px] text-[--greyText]">Industry</small>
              <p className="font-bold text-[14px]">
                {selectedUser.businessDetails?.industry}
              </p>
            </div>

            <div>
              <small className="text-[12px] text-[--greyText]">Address</small>
              <p className="overflow-hidden w-fit flex  rounded-[3px] font-bold text-[14px]">
                {selectedUser.location}
              </p>
            </div>

            <div>
              <small className="text-[12px] text-[--greyText]">
                Established
              </small>
              <p className="overflow-hidden w-fit flex  rounded-[3px] font-bold text-[14px]">
                Thursday {selectedUser.dateJoined}
              </p>
            </div>
          </div>
        </div>

        {/* Valuation Report */}
        <div className="mt-[40px] ">
          <h2 className="font-bold flex items-center gap-1 ">
            <span className="text-[--greyText]">
              <RiMoneyDollarCircleFill />{" "}
            </span>
            Financial Details
          </h2>

          <div className="border-[1px] border-[borderColor] rounded-[8px] p-5 mt-[18px]">
            <p className="text-[14px] text-[--primaryGreen]">
              Valuation Summary
            </p>

            <div className="grid dataTab gap-y-6">
              <div>
                <small className="text-[12px] text-[--greyText]">
                  Average Monthly Salary
                </small>
                <p className=" text-[14px] flex items-center gap-1">
                  <FaNairaSign /> {selectedUser.businessDetails?.proposalAmount}
                </p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Last Reported Yearly Sales
                </small>
                <p className=" text-[14px] flex items-center gap-1">
                  <FaNairaSign /> {selectedUser.businessDetails?.proposalAmount}
                </p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  EBITDA/Operating Profit Margin Percentage
                </small>
                <p className=" text-[14px]">{selectedUser.fundabilityScore}%</p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Total Asset Valuation
                </small>
                <p className=" text-[14px]">
                  {selectedUser.businessDetails?.proposalAmount}
                </p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Tentative Business Selling Price
                </small>
                <p className=" text-[14px]">
                  {selectedUser.businessDetails?.proposalAmount}
                </p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Reason For Sale
                </small>
                <p className=" text-[14px]">Cashing Out</p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Section */}
      </div>

      <div className="mt-[30px]">
        <h2 className="font-bold flex items-center gap-1 mb-5 ">
          <span className="text-[--greyText]">
            <IoDocumentText />{" "}
          </span>
          Business Documents
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`${linkValue}`}>
            <DocumentComp />
          </Link>

          <Link href={`${linkValue}`}>
            <DocumentComp />
          </Link>
        </div>
      </div>
    </div>
  );
}
