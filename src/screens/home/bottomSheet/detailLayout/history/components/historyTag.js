import React from "react";
import { Text, useTheme } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import screen from "src/utils/screen";
import { useModelState } from "src/contexts/modelContext";
import config from "src/utils/models/config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import datetime from "src/utils/datetime";

export default ({ dishes, data }) => {
  const styles = useStyle();
  const { colors } = useTheme();
  const dishesData = dishes[data?.prediction];
  const coverImage = dishesData?.type[0];
  const coverUri = config.localDir.asset(coverImage?.name);
  return (
    <Shadow
      startColor={`rgba(180, 180, 180, 0.2)`}
      containerStyle={styles.container}
    >
      <TouchableOpacity style={styles.tagContainer}>
        <Image
          source={{ uri: coverUri }}
          style={styles.coverImage}
          resizeMode="contain"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.dishName}>{dishesData?.name}</Text>
          <Text style={styles.dishTime}>
            {datetime.fromNow(data?.detect_time)}
          </Text>
        </View>
        <Icon
          style={{ alignSelf: "center" }}
          name="chevron-right"
          size={32}
          color={colors.primary}
        />
      </TouchableOpacity>
    </Shadow>
  );
};

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      marginTop: 8,
    },
    tagContainer: {
      height: 80,
      width: screen.width - 20,
      backgroundColor: colors.white,
      borderRadius: 4,
      flexDirection: "row",
      paddingHorizontal: 6,
    },
    coverImage: {
      width: 68,
      height: 68,
      alignSelf: "center",
      borderRadius: 4,
    },
    contentContainer: {
      flex: 1,
      padding: 6,
      justifyContent: "space-between",
    },
    dishName: {
      fontWeight: "bold",
    },
    dishTime: {
      color: colors.gray,
      fontSize: 12,
    },
  });
};
