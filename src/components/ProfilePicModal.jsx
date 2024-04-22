import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateProfilePicture } from "../api";

function ProfilePicModal({ isOpen, onClose, userId, onSave }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateProfilePic = async () => {
    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", image);

    try {
      const response = await updateProfilePicture(userId, formData);
      onSave();
      toast.success("Profile picture uploaded successfully");
      onClose();
      setImage(null);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg relative">
        <button
          onClick={() => {
            setImage(null);
            onClose();
          }}
          className="absolute top-2 right-2 text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-center mb-4">
          Update Profile Picture
        </h2>
        <input
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {image && (
          <div className="w-full flex justify-center items-center">
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="h-[220px] object-contain"
            />
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setImage(null);
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleUpdateProfilePic}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicModal;
