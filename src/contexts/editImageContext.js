import React, { useState, createContext } from "react";
import { View } from "react-native";
import screen from "src/utils/screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { Button } from "react-native-paper";
import { ImageManipulator } from "expo-image-crop-fixed";

const EditImageContext = createContext();

const EditImageProvider = ({ children }) => {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(true);
  const editImage = async (uri) => {
    if (uri) setVisible(true);
  };

  const value = { editImage };
  return (
    <EditImageContext.Provider value={value}>
      
      {children}
    </EditImageContext.Provider>
  );
};

const useEditImage = () => {
  const context = React.useContext(EditImageContext);
  if (context === undefined) {
    throw new Error("useEditImage must be used within a EditImageProvider");
  }
  return context;
};

export { EditImageProvider, useEditImage };
