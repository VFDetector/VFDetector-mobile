import React from "react";
import { TouchableOpacity, View, Linking } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import screen from "src/utils/screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default ({ title, url }) => {
  const { colors } = useTheme();
  return (
    <Shadow
      startColor={`rgba(100, 100, 100, 0.1)`}
      containerStyle={{
        marginVertical: 4,
      }}
    >
      <TouchableOpacity
        style={{
          width: screen.width - 36,
          backgroundColor: "white",
          borderRadius: 4,
          padding: 8,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.primary }}>{title}</Text>
          <Text numberOfLines={1} style={{ color: "gray", marginTop: 4 }}>
            {url}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => Linking.openURL(url)}
        >
          <Icon name="map-legend" size={28} color={colors.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Shadow>
  );
};
