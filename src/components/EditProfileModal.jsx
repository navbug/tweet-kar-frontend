import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { updateUserDetails } from '../api';

function EditProfileModal({ isOpen, onClose, userDetails, onSave }) {
  const [name, setName] = useState(userDetails?.name || '');
  const [location, setLocation] = useState(userDetails?.location || '');
  const [dob, setDob] = useState(userDetails?.dob || '');

  console.log(userDetails);

  const handleSave = async (userId) => {
    try {
      const updatedDetails = {
        name,
        location,
        dob
      };
      console.log(updatedDetails);
      const response = await updateUserDetails(userId, updatedDetails);
      console.log(response);
      toast.success("Profile Updated Successfully");
      onSave(updatedDetails);
      onClose();
    } catch (error) {
      toast.error("Failed to update profile");
      console.error('Error updating profile:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-center mb-4">Edit Profile</h2>
        <label htmlFor='name' className='block text-gray-700 text-sm font-bold px-1 pb-1'>Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Name"
          id='name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor='location' className='block text-gray-700 text-sm font-bold px-1 pb-1'>Location</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Location"
          id='location'
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <label htmlFor='dob' className='block text-gray-700 text-sm font-bold px-1 pb-1'>DOB</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Date of Birth"
          id='dob'
          value={dob}
          onChange={e => setDob(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={() => handleSave(userDetails._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
