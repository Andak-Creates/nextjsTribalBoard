"use client";

import { useState } from "react";

interface FundabilityScore {
  id: number;
  fundabilityScore: number;
}

interface EditFundabilityModalProps {
  user: FundabilityScore;
  onClose: () => void;
  onSave: (updatedFundability: FundabilityScore, reason?: string) => void;
}

const EditFundabilityModal: React.FC<EditFundabilityModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  // Ensure the default values are not undefined or null
  const [formData, setFormData] = useState<FundabilityScore>({
    fundabilityScore: user.fundabilityScore, // Default to 0 if score is undefined
    id: user.id,
  });

  const [reason, setReason] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fundabilityScore") {
      setFormData((prev) => ({
        ...prev,
        fundabilityScore: Number(value), // Convert to number directly
      }));
    } else if (name === "reason") {
      setReason(value);
    }
  };

  const handleSubmit = () => {
    onSave(formData, reason); // Save the updated score and reason
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Fundability Score</h2>

        <div className="space-y-4">
          <input
            type="number"
            name="fundabilityScore"
            value={formData.fundabilityScore}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Score"
            max={100}
          />

          <input
            type="text"
            name="reason"
            value={reason}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Reason for update (internal only)"
          />
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
            Update Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFundabilityModal;
