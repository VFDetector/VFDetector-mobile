import React, { useState, createContext } from "react";

const ModelContext = createContext();

const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);
  const [metadata, updateMetadata] = useState(null);
  const value = { model, setModel, metadata, updateMetadata };

  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
};

const useModelState = () => {
  const context = React.useContext(ModelContext);
  if (context === undefined) {
    throw new Error("useModelState must be used within a ModelProvider");
  }
  return context;
};

export { ModelProvider, useModelState, ModelContext };
