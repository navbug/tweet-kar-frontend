import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import Sidebar from "../components/Sidebar";
import TweetCard from "../components/TweetCard";
import { getTweet } from "../api";
import MainSpinner from "../components/MainSpinner";
import { useParams } from "react-router-dom";

const TweetDetails = () => {
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser, toggle, setToggle } = useContext(Context);

  const { id } = useParams();

  const handleGetTweetDetails = async (id) => {
    setLoading(true);
    let fetchedTweet = await getTweet(id);
    setTweet(fetchedTweet);
    setLoading(false);
  };

  useEffect(() => {
    handleGetTweetDetails(id);
  }, [id, toggle]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto h-full">
      <div className="grid grid-cols-7">
        <div className="col-span-2">
          <Sidebar />
        </div>

        <div className="col-span-5 p-4 border-2">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-800 text-lg">Tweet</span>
          </div>

          {loading ? (
            <MainSpinner />
          ) : (
            <div className="w-full h-[87vh] border-0 overflow-y-auto">
              {user && tweet && (
                <div>
                  <TweetCard
                    key={tweet._id}
                    data={tweet}
                    onTweetChange={() => {
                      setToggle(prev => !prev)
                    }}
                  />
                  <div className="font-semibold px-2 py-1">Replies</div>
                  {tweet?.replies?.length > 0 &&
                    tweet.replies.map((reply, index) => (
                      <div className={`border-t-2 border-r-2 border-l-2 ${index === tweet.replies.length-1 && "border-b-2"}`}>
                        <TweetCard
                          key={index}
                          data={reply}
                          onTweetChange={() => {
                            setToggle(prev => !prev)
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

export default TweetDetails;
