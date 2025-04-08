"use client";

import { useState } from "react";

interface EditBusinessModalProps {
  user: any;
  onClose: () => void;
  onSave: (updatedUser: any) => void;
}

const EditBusinessModal: React.FC<EditBusinessModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    businessName: user.businessDetails.name,
    location: user.location,
    industry: user.businessDetails.industry,
    established: user.dateJoined,
    ownerType: user.businessDetails.ownershipType,
    type: user.businessDetails.type,
  });

  const ownershipType = [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company",
    "Corporation",
    "Cooperative",
  ];

  const businessType = ["SME", "Startup"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedFields: any = {};

    if (formData.businessName !== user.businessDetails.name) {
      updatedFields.businessDetails = {
        ...updatedFields.businessDetails,
        name: formData.businessName,
      };
    }

    if (formData.industry !== user.businessDetails.industry) {
      updatedFields.businessDetails = {
        ...updatedFields.businessDetails,
        industry: formData.industry,
      };
    }

    if (formData.established !== user.dateJoined) {
      updatedFields.dateJoined = formData.established;
    }

    if (formData.ownerType !== user.businessDetails.ownershipType) {
      updatedFields.businessDetails = {
        ...updatedFields.businessDetails,
        ownershipType: formData.ownerType,
      };
    }

    if (formData.type !== user.businessDetails.type) {
      updatedFields.businessDetails = {
        ...updatedFields.businessDetails,
        type: formData.type,
      };
    }

    if (formData.location !== user.location) {
      updatedFields.location = formData.location;
    }

    const updatedUser = {
      ...user,
      ...updatedFields,
      businessDetails: {
        ...user.businessDetails,
        ...updatedFields.businessDetails,
      },
    };

    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Business</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="businessName" className="text-sm">
              Business Name
            </label>
            <input
              id="businessName"
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter business name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter location"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="industry" className="text-sm">
              Industry
            </label>
            <input
              id="industry"
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter industry"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="established" className="text-sm">
              Established Date
            </label>
            <input
              id="established"
              type="date"
              name="established"
              value={formData.established}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ownerType" className="text-sm">
              Ownership Type
            </label>
            <select
              id="ownerType"
              name="ownerType"
              value={formData.ownerType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {ownershipType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="businessType" className="text-sm">
              Business Type
            </label>
            <select
              id="businessType"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {businessType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
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

export default EditBusinessModal;
