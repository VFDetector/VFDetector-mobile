import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Text, useTheme } from "react-native-paper";

const SafeLayout = ({
  children,
  style,
  contentStyle,
  edges,
  title,
  popback,
  popbackColor,
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ ...style, flex: 1 }} edges={edges || ["top"]}>
      {(popback || title) && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Icon
              name="chevron-left"
              size={32}
              color={popbackColor || colors.primary}
            />
          </TouchableOpacity>
          {title && (
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
          )}
        </View>
      )}
      <View style={{ ...contentStyle, flex: 1 }}>{children}</View>
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
