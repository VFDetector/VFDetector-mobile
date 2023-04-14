import React, { useState, createContext } from "react";

const LocalDBContext = createContext();

const LocalDBProvider = ({ children }) => {
  const [database, setDatabase] = useState(null);
  const value = { database, updateDatabase: setDatabase };

  return (
    <LocalDBContext.Provider value={value}>{children}</LocalDBContext.Provider>
  );
};

const useLocalDatabase = () => {
  const context = React.useContext(LocalDBContext);
  if (context === undefined) {
    throw new Error("useLocalDatabase must be used within a LocalDBProvider");
  }
  return context;
};

export { LocalDBProvider, useLocalDatabase, LocalDBContext };
