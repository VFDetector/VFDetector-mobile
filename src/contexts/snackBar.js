import React, { useState, createContext } from "react";
import { Snackbar } from "react-native-paper";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snacktext, setSnacktext] = useState(null);
  const showSnack = (text, mode) => {
    setSnacktext(text);
    console.log(text);
  };
  const value = { showSnack };

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar
        visible={!!snacktext}
        onDismiss={() => setSnacktext(null)}
        duration={1000}
      >
        {snacktext}
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export { SnackbarProvider, useSnackbar };
