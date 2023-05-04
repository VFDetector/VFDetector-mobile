import React, { useState, createContext, useEffect } from "react";
import { get_storage_data, set_storage_data } from "src/utils/asyncStorage";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [mode, setMode] = useState(true);
  const [userData, setUserData] = useState(null);
  const updateUserData = async (data) => {
    setUserData(data);
    set_storage_data("user-data", JSON.stringify(data));
  };
  const switchMode = (value) => {
    setMode(value);
    set_storage_data("user-mode", value);
  };
  const clearUserData = async () => {
    setMode(true);
    updateUserData(null);
  };
  const initUser = async () => {
    const storageData = await get_storage_data("user-data");
    if (storageData) {
      setMode(await get_storage_data("user-mode"));
      setUserData(JSON.parse(storageData));
    }
  };
  const value = {
    mode,
    switchMode,
    userData,
    updateUserData,
    clearUserData,
    initUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserState = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useModelState must be used within a ModelProvider");
  }
  return context;
};

export { UserProvider, useUserState };
