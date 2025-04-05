"use client";
import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
}

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <div className="space-y-4">
          {["firstName", "lastName", "email", "phoneNumber", "location"].map(
            (field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder={field}
              />
            )
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

// Message Modal Component
interface MessageModalProps {
  message: string;
  type: "error" | "success" | ""; // Type of message (error or success)
  onClose: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  message,
  type,
  onClose,
}) => {
  const icon = type === "error" ? "❌" : "✅";
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className={`bg-white p-6 rounded-lg w-full max-w-md shadow-lg `}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit User</h2>
          <button onClick={onClose} className="text-xl font-bold">
            <MdOutlineClose />
          </button>
        </div>
        <div className="mt-[30px] ">
          <p>
            {icon} {message}
          </p>
        </div>
      </div>
    </div>
  );
};
