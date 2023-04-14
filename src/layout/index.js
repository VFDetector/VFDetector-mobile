import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeLayout = ({ children, style, edges }) => {
  return (
    <SafeAreaView
      style={{
        ...style,
        flex: 1,
        // backgroundColor: style?.backgroundColor || 'white',
      }}
      edges={edges || ["top"]}
    >
      {children}
    </SafeAreaView>
  );
};

export { SafeLayout };
