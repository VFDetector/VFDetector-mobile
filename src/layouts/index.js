import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

const SafeLayout = ({ children, style, edges, popback }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ ...style, flex: 1 }} edges={edges || ["top"]}>
      {popback && (
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            borderRadius: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.pop()}
        >
          <Icon name="chevron-left" size={40} color={colors.primary} />
        </TouchableOpacity>
      )}
      {children}
    </SafeAreaView>
  );
};

const SafeLayoutHeader = ({ children, style, edges }) => {
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

export { SafeLayout, SafeLayoutHeader };
