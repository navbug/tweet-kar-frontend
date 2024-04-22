import React, { useState } from "react";
import { postReply } from "../api";
import { toast } from "react-toastify";

function ReplyTweetModal({ tweetId, isOpen, onClose, onSave }) {
  const [reply, setReply] = useState("");

  const handleChange = (e) => setReply(e.target.value);

  const handleReplyTweet = async (e) => {
    const formData = new FormData();
    formData.append("content", reply);
    
    await postReply(tweetId, formData);
    toast.success("Tweet Replied Successfully");
    onSave();
    onClose();
    setReply("");
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
        <h2 className="text-lg font-semibold text-center mb-4">Tweet your reply</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Add reply"
          value={reply}
          required
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleReplyTweet}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReplyTweetModal;
