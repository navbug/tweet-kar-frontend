import React, { useState } from "react";
import { createTweet } from "../api";
import { toast } from "react-toastify";

function NewTweetModal({ isOpen, onClose, onSave }) {
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState(null);

  const handleTweetChange = (e) => setTweet(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleCreateTweet = async (e) => {
    const formData = new FormData();
    formData.append("content", tweet);
    if (image) {
      formData.append("image", image);
    }
    const tweeted = await createTweet(formData);
    onSave();
    onClose();
    setTweet("");
    setImage(null);

    tweeted && toast.success("Tweet Created Successfully");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg relative">
        <button
          onClick={() => {
            setTweet("");
            setImage(null);
            onClose();
          }}
          className="absolute top-2 right-2 text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-center mb-4">New Tweet</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="What's happening?"
          value={tweet}
          required
          onChange={handleTweetChange}
        />
        <input
          type="file"
          accept=".jpeg,.jpg,.png"
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
        <div className="flex justify-between mt-2">
          <button
            onClick={() => {
              setTweet("");
              setImage(null);
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleCreateTweet}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTweetModal;
