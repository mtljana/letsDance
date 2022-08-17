import React, { useState, createContext } from "react";

export const DanceClassContext = createContext();

export const DanceClassProvider = ({ children }) => {
  const [danceclasses, setDanceClasses] = useState([]);
  const [newComment, setNewComment] = useState(false);

  return (
    <DanceClassContext.Provider
      value={{ danceclasses, setDanceClasses, newComment, setNewComment }}
    >
      {children}
    </DanceClassContext.Provider>
  );
};
