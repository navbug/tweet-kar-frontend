import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [toggle, setToggle] = useState(false);

  return (
    <Context.Provider value={{ user, setUser, tweets, setTweets, toggle, setToggle }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
