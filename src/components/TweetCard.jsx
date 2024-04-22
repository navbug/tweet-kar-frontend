import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  FaRegMessage,
  FaRegTrashCan,
  FaRetweet,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  deleteTweet,
  dislikeTweet,
  getUserInfo,
  likeTweet,
  retweet,
} from "../api";
import { Context } from "../context/Context";
import ReplyTweetModal from "./ReplyTweetModal";
import { Link, useNavigate } from "react-router-dom";

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const TweetCard = ({ data, onTweetChange }) => {
  const isLikedInitial = data?.likes?.some(
    (like) => like?._id === data?.tweetedBy?._id
  );
  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [likesCount, setLikesCount] = useState(data?.likes?.length);

  const [tweetUser, setTweetUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } =
    useContext(Context);
  const navigate = useNavigate();

  const handleLikeDislikeTweet = async (id) => {
    if (isLiked) {
      const response = await dislikeTweet(id);
      setIsLiked(false);
      setLikesCount(likesCount - 1);

      toast.success("Tweet disliked");
      onTweetChange();
    } else {
      const response = await likeTweet(id);
      setIsLiked(true);
      setLikesCount(likesCount + 1);

      toast.success("Tweet liked");
      onTweetChange();
    }
  };

  const handleDeleteTweet = async (id) => {
    deleteTweet(id);
    toast.success("Tweet deleted successfully");
    onTweetChange();
  };

  const handleRetweet = async (id) => {
    await retweet(id);
    toast.success("Retweeted");
    onTweetChange();
  };

  const handleGetUserInfo = async (id) => {
    const fetchedUser = await getUserInfo(id);
    setTweetUser(fetchedUser);
  };

  const getUsername = async (id) => {
    if (!tweetUser) {
      await handleGetUserInfo(id);
    }
    return tweetUser ? tweetUser : "Loading...";
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getUsername(data?.reTweetedBy[data.reTweetedBy.length - 1]);
  }, []);

  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden w-full flex hover:bg-blue-50 cursor-pointer">
      <div className="w-14 h-14 rounded-full pt-10 px-2">
        <img
          src={
            data?.tweetedBy?.profilePicture
              ? data.tweetedBy.profilePicture
              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSajBGaxmLXDuMT23LOv41vdsBiLAZp3UgDKPWfyWnqw&s`
          }
          alt=""
          className="rounded-full w-10 h-10"
        />
      </div>

      {data && (
        <div className="flex flex-col flex-1 gap-1">
          {data.reTweetedBy.length > 0 && (
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <FaRetweet /> Retweeted by{" "}
              {typeof data.reTweetedBy[data.reTweetedBy.length - 1] === "string" ? tweetUser?.name : data.reTweetedBy[data.reTweetedBy.length - 1].name}
            </span>
          )}
          <div className="flex justify-between items-center">
            <div>
              <Link
                to={`/profile/${data.tweetedBy._id}`}
                className="font-semibold hover:underline"
              >
                @{data.tweetedBy.username}{" "}
              </Link>
              -
              <span className="text-gray-500">
                {` `}
                {formatDate(data.createdAt)}
              </span>
            </div>

            {data.tweetedBy._id === user._id && (
              <div
                onClick={() => handleDeleteTweet(data._id)}
                className="m-1 p-2 hover:bg-blue-200 rounded-md"
              >
                <FaRegTrashCan />
              </div>
            )}
          </div>
          <div onClick={() => navigate(`/tweet/${data._id}`)} className="">
            {data.content}
          </div>
          {data.image && (
            <img
              src={data.image}
              alt=""
              className="w-full h-full max-h-[300px] max-w-[90%] mb-2"
              loading="lazy"
            />
          )}
          <div className="flex gap-3 mb-3">
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleLikeDislikeTweet(data._id);
              }}
              className="flex items-center gap-1 cursor-pointer py-1 px-2 hover:bg-blue-200 rounded-md"
            >
              {likesCount > 0 ? (
                <FaHeart
                  color="red"
                />
              ) : (
                <FaRegHeart
                  color="red"
                />
              )}
              {likesCount}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
              className="flex items-center gap-1 py-1 px-2 hover:bg-blue-200 rounded-md"
            >
              <FaRegMessage color="blue" />
              {`${data?.replies?.length === 0 ? "0" : data?.replies?.length}`}
            </span>
            <ReplyTweetModal
              tweetId={data._id}
              isOpen={modalOpen}
              onClose={handleCloseModal}
              onSave={onTweetChange}
            />
            <span
              onClick={() => handleRetweet(data._id)}
              className="flex items-center gap-1 py-1 px-2 hover:bg-blue-200 rounded-md"
            >
              <FaRetweet color="green" />
              {`${
                data?.reTweetedBy?.length === 0
                  ? "0"
                  : data?.reTweetedBy?.length
              }`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetCard;
