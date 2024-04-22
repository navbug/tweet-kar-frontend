import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendar, FaBirthdayCake } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  followUser,
  getTweets,
  getUserInfo,
  unfollowUser,
} from "../api";
import { Context } from "../context/Context";
import Sidebar from "../components/Sidebar";
import TweetCard, { formatDate } from "../components/TweetCard";
import { toast } from "react-toastify";
import EditProfileModal from "../components/EditProfileModal";
import { FaLocationDot } from "react-icons/fa6";
import ProfilePicModal from "../components/ProfilePicModal";

const Profile = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isProfilePicModalOpen, setProfilePicModalOpen] = useState(false);

  const { user, setUser, tweets, setTweets, toggle, setToggle } = useContext(Context);
  const { id } = useParams();

  const handleGetUserInfo = async (id) => {
    const fetchedUser = await getUserInfo(id);
    setProfileUser(fetchedUser);
  };

  const handleGetUserTweets = async () => {
    const fetchedTweets = await getTweets();
    setTweets(fetchedTweets);
  };

  const filteredTweets = tweets.filter((tweet) => tweet.tweetedBy._id === id);

  const handleFollowUnfollowUser = async (id) => {
    try {
      const isFollowing = profileUser.followers.includes(user._id);
      if (isFollowing) {
        await unfollowUser(profileUser._id);
        toast.success("Unfollowed user successfully");
        setProfileUser({
          ...profileUser,
          followers: profileUser.followers.filter(
            (followerId) => followerId !== user._id
          ),
        });
      } else {
        await followUser(profileUser._id);
        toast.success("Followed user successfully");
        setProfileUser({
          ...profileUser,
          followers: [...profileUser.followers, user._id],
        });
      }
    } catch (error) {
      console.error("Failed to toggle follow state:", error);
    }
  };

  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  const toggleProfilePicModal = () => {
    setProfilePicModalOpen(!isProfilePicModalOpen);
  };

  useEffect(() => {
    handleGetUserInfo(id);
    handleGetUserTweets();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [id, toggle]);

  return (
    <div className="max-w-[1100px] mx-auto h-full">
      <div className="grid grid-cols-7">
        <div className="col-span-2">
          <Sidebar />
        </div>

        <div className="col-span-5 p-4 border-2">
          {loading ? (
            <MainSpinner />
          ) : (
            <div className="w-full h-[87vh] border-0 overflow-y-auto">
              {profileUser && tweets && (
                <div className="w-full">
                  <div className="w-full h-36 bg-blue-400" />
                  <div className="">
                    <div className="flex justify-end relative">
                      <img
                        src={
                          profileUser?.profilePicture
                            ? profileUser.profilePicture
                            : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSajBGaxmLXDuMT23LOv41vdsBiLAZp3UgDKPWfyWnqw&s`
                        }
                        alt=""
                        loading="lazy"
                        className="rounded-full absolute -top-16 left-5 w-[120px] h-[130px]"
                      />

                      {user._id === profileUser._id ? (
                        <div className="flex gap-2">
                          <span
                            onClick={toggleProfilePicModal}
                            className="px-3 py-1 font-semibold text-blue-950 border-2 border-blue-800 bg-white mr-2 mt-2 rounded-md cursor-pointer hover:bg-blue-950 hover:text-white transition-all duration-100"
                          >
                            Upload Profile Photo
                          </span>
                          <ProfilePicModal
                            isOpen={isProfilePicModalOpen}
                            onClose={toggleProfilePicModal}
                            userId={user._id}
                            onSave={() => {
                              setToggle(prev => !prev);
                            }}
                          />

                          <span
                            onClick={toggleEditModal}
                            className="px-3 py-1 font-semibold text-gray-950 border-2 border-gray-800 bg-white mr-2 mt-2 rounded-md cursor-pointer hover:bg-gray-950 hover:text-white transition-all duration-100"
                          >
                            Edit
                          </span>
                          <EditProfileModal
                            isOpen={isEditModalOpen}
                            onClose={toggleEditModal}
                            userDetails={profileUser || {}}
                            onSave={(updatedDetails) =>
                              setProfileUser((prevState) => {
                                return {
                                  ...prevState,
                                  ...updatedDetails,
                                };
                              })
                            }
                          />
                        </div>
                      ) : (
                        <span
                          onClick={() =>
                            handleFollowUnfollowUser(profileUser._id)
                          }
                          className="px-3 py-1 text-white bg-blue-950 mr-2 mt-2 rounded-md cursor-pointer"
                        >
                          {profileUser?.followers?.includes(user._id)
                            ? "Unfollow"
                            : "Follow"}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col mt-16">
                      <span className="font-semibold text-[18px] my-2">{profileUser.name}</span>
                      <span className="text-gray-700 mb-3">@{profileUser.username}</span>
                      <div className="flex gap-14 items-center text-gray-700 mb-1">
                        {profileUser.dob && (
                          <span className="flex gap-2 items-center">
                            <FaBirthdayCake /> Dob {formatDate(profileUser.dob)}
                          </span>
                        )}
                        {profileUser.location && (
                          <span className="flex gap-2 items-center">
                            <FaLocationDot /> {profileUser.location}
                          </span>
                        )}
                      </div>
                      <span className="flex gap-1 items-center text-gray-700">
                        <FaRegCalendar /> Joined{" "}
                        {formatDate(profileUser.createdAt)}
                      </span>
                      <div className="flex gap-3 font-semibold mt-5">
                        <span>
                          {profileUser?.following?.length
                            ? profileUser.following.length
                            : 0}{" "}
                          Following
                        </span>
                        <span>
                          {profileUser?.followers?.length
                            ? profileUser.followers.length
                            : 0}{" "}
                          Followers
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="flex justify-center mt-6 mb-4 font-semibold">
                    Tweets and Replies
                  </span>
                  <div>
                    {filteredTweets.map((tweet, index) => (
                      <div
                        className={`border-t-2 border-r-2 border-l-2 ${
                          index === tweet.replies.length - 1 && "border-b-2"
                        }`}
                      >
                        <TweetCard
                          key={index}
                          username={tweet.tweetedBy?.username}
                          userID={profileUser._id}
                          data={tweet}
                          imageSrc={
                            tweet?.tweetedBy?.profilePicture
                              ? tweet.tweetedBy.profilePicture
                              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSajBGaxmLXDuMT23LOv41vdsBiLAZp3UgDKPWfyWnqw&s`
                          }
                          onTweetChange={() => {
                            setToggle(prev => !prev)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
