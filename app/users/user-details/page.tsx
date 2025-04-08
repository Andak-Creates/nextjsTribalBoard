"use client";
import EditUserModal, { MessageModal } from "@/app/form-comps/editUserModal";
import Businessstat from "@/app/ui-comps/businessStat";
import Proposals from "@/app/ui-comps/proposals";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdBusinessCenter } from "react-icons/md";

export default function Page() {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState<string>(""); // Message content
  const [messageType, setMessageType] = useState<"error" | "success">("error"); // Error or Success type
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve the stored item from sessionStorage
    const storedData = sessionStorage.getItem("clickedUserDetails");

    if (storedData) {
      // Parse the stored JSON to get the original data
      const parsedData = JSON.parse(storedData);

      // If you have a list of users (array), you would store them like this:
      // sessionStorage.setItem("userList", JSON.stringify(users));

      setUserDetails(Array.isArray(parsedData) ? parsedData : [parsedData]); // Store the user details or list in the state
    }
  }, []);

  const updateUserInJsonBin = async (updatedUser: any) => {
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

  const handleSaveUser = (updatedUser: any) => {
    updateUserInJsonBin(updatedUser);
  };

  if (userDetails.length === 0) return <p>Checking For data</p>;

  return (
    <div className="p-5">
      <h2 className="flex  mb-4 items-center gap-3 ">
        <Link href="/users">Users</Link>
        <span className="text-[25px]">
          <IoIosArrowForward />
        </span>{" "}
        <span className="text-[--primaryGreen]">User Details</span>
      </h2>

      <div className="flex mt-[30px] items-center justify-between ">
        <div className="flex gap-5">
          <Image
            src="/images/tribalAvatar.jpeg"
            alt="Avatar"
            height={50}
            width={60}
            className="rounded-[50%]"
          />
          {userDetails.map((user: any) => (
            <div key={user.id}>
              <h1 className="flex flex-col text-[25px]">
                {user.firstName} {user.lastName}
                <small className="text-[14px] text-[--greyText]">
                  {user.location}
                </small>
              </h1>
            </div>
          ))}
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
          {userDetails.map((user: any) => (
            <div
              key={user.id}
              className="border-[1px] border-[--borderColor] grid grid-cols-3 p-4 gap-4 rounded-[8px] mt-[8px]"
            >
              {/* Modal */}
              {showEditModal && (
                <EditUserModal
                  user={user}
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
                <p className="font-bold text-[14px]">{user.firstName}</p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">
                  Last Name
                </small>
                <p className="font-bold text-[14px]">{user.lastName}</p>
              </div>

              <div>
                <small className="text-[12px] text-[--greyText]">Email</small>
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
                  Date Joined
                </small>
                <p className="font-bold text-[14px]">{user.dateJoined}</p>
              </div>
            </div>
          ))}
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
