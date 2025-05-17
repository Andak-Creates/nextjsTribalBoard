"use client";
import EditUserModal, { MessageModal } from "@/app/form-comps/editUserModal";
import { useUserStore } from "@/app/stores/userStore";
import { User } from "@/app/types/user";

import Businessstat from "@/app/ui-comps/businessStat";
import Proposals from "@/app/ui-comps/proposals";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdBusinessCenter } from "react-icons/md";

export default function Page() {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState<string>(""); // Message content
  const [messageType, setMessageType] = useState<"error" | "success">("error"); // Error or Success type
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

  const updateUserInFirestore = async (updatedUser: User) => {
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

  const handleSaveUser = (updatedUser: User) => {
    updateUserInFirestore(updatedUser);
  };

  if (selectedUser === null) return <p>sorry no user selected</p>;

  return (
    <div className="p-5">
      <h1 className="linkCrumbs">
        <Link href="/users">Users</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <span className="text-[--primaryGreen]">User Details</span>
      </h1>

      <div className="flex flex-col md:flex-row mt-[30px] items-start md:items-center md:justify-between gap-y-5 mb-10 ">
        <div className="flex gap-5">
          <Image
            src="/images/tribalAvatar.jpeg"
            alt="Avatar"
            height={50}
            width={60}
            className="rounded-[50%]"
          />

          <div>
            <h1 className="flex flex-col text-[25px]">
              {selectedUser.firstName} {selectedUser.lastName}
              <small className="text-[14px] text-[--greyText]">
                {selectedUser.location}
              </small>
            </h1>
          </div>
        </div>

        <div className="flex gap-5">
          <button
            className="px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>
          <button className="px-5 py-1 bg-[--primaryRed] rounded-[8px] text-white">
            Suspend User
          </button>
        </div>
      </div>

      <div className="mt-[20px]">
        <div className="flex items-center gap-2">
          <span className="text-[--greyText]">
            <FaUserCircle />
          </span>{" "}
          <h2 className="font-bold">Personal Information</h2>
        </div>

        <div>
          <div className="border-[1px] border-[--borderColor] grid grid-cols-2 md:grid-cols-3 p-4 gap-x-[80px] gap-y-6 rounded-[8px] mt-[8px] ">
            {/* Modal */}
            {showEditModal && (
              <EditUserModal
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
            <div>
              <small className="text-[12px] text-[--greyText]">
                First Name
              </small>
              <p className="font-bold text-[14px]">{selectedUser.firstName}</p>
            </div>

            <div>
              <small className="text-[12px] text-[--greyText]">Last Name</small>
              <p className="font-bold text-[14px]">{selectedUser.lastName}</p>
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
              <small className="text-[12px] text-[--greyText]">Location</small>
              <p className="font-bold text-[14px]">{selectedUser.location}</p>
            </div>

            <div>
              <small className="text-[12px] text-[--greyText]">
                Date Joined
              </small>
              <p className="font-bold text-[14px]">{selectedUser.dateJoined}</p>
            </div>
          </div>
        </div>

        <div className="mt-[40px]">
          <div className=" flex items-center gap-2 mb-[10px]">
            <span className="text-[--greyText]">
              <MdBusinessCenter />
            </span>
            <h2 className="font-bold">Businesses</h2>
          </div>
          <Businessstat sliceValue={4} />
        </div>

        <div className="mt-[40px]">
          <div className=" flex items-center gap-2 mb-[10px]">
            <span className="text-[--greyText]">
              <MdBusinessCenter />
            </span>
            <h2 className="font-bold">Proposals Sent</h2>
          </div>
          <Proposals
            sliceValue={3}
            linkValue={"users/user-details/business-details/proposals"}
          />
        </div>
      </div>
    </div>
  );
}
