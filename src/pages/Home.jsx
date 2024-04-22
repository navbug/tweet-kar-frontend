import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import Sidebar from "../components/Sidebar";
import TweetCard from "../components/TweetCard";
import { getTweets } from "../api";
import NewTweetModal from "../components/NewTweetModal";
import MainSpinner from "../components/MainSpinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { user, setUser, tweets, setTweets, toggle, setToggle } =
    useContext(Context);

  const handleGetTweets = async () => {
    setLoading(true);
    let fetchedTweets = await getTweets();
    setTweets(fetchedTweets);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    handleGetTweets();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [toggle]);

  return (
    <div className="max-w-[1100px] mx-auto h-full">
      <div className="grid grid-cols-7">
        <div className="col-span-2">
          <Sidebar />
        </div>

        <div className="col-span-5 p-4 border-2">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-800 text-lg">Home</span>
            <div
              onClick={() => setModalOpen(true)}
              className="w-[120px] py-1 bg-blue-500 text-white flex justify-center items-center text-lg font-semibold rounded-md cursor-pointer"
            >
              Tweet
            </div>
            <NewTweetModal
              isOpen={modalOpen}
              onClose={handleCloseModal}
              onSave={() => setToggle((prev) => !prev)}
            />
          </div>

          {loading ? (
            <MainSpinner />
          ) : (
            <div className="w-full h-[87vh] overflow-y-auto">
              {/* TweetCard */}
              {user && tweets && (
                <div key={Date.now()}>
                  {tweets.map((tweet, index) => (
                    <div
                      className={`border-t-2 border-r-2 border-l-2 ${
                        index === tweets.length - 1 && "border-b-2"
                      }`}
                    >
                      <TweetCard
                        key={index}
                        data={tweet}
                        onTweetChange={async () => {
                          await handleGetTweets();
                          setToggle((prev) => !prev);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
