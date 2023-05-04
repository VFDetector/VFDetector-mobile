import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import config from "src/utils/models/config";
import screen from "src/utils/screen";

export default ({ data }) => {
  const navigation = useNavigation();
  const styles = useStyle();
  const { colors } = useTheme();
  const coverImagePath = config.localDir.asset(data?.type[0]?.name);
  return (
    <Shadow
      startColor={`rgba(180, 180, 180, 0.2)`}
      containerStyle={styles.container}
    >
      <TouchableOpacity
        style={styles.tagContainer}
        onPress={() => navigation.navigate("dish-detail", { data })}
      >
        <Image style={styles.coverImage} source={{ uri: coverImagePath }} />
        <View style={styles.contentContainer}>
          <Text style={styles.dishName}>{data?.name}</Text>
          <Text style={styles.dishTag}>Vietnamese food</Text>
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
      alignSelf: "center",
    },
    tagContainer: {
      width: screen.width - 24,
      height: 80,
      borderRadius: 8,
      flexDirection: "row",
    },
    coverImage: {
      width: 64,
      height: 64,
      borderRadius: 4,
      marginLeft: 8,
      alignSelf: "center",
    },
    contentContainer: {
      flex: 1,
      padding: 8,
    },
    dishName: {
      fontWeight: "bold",
    },
    dishTag: {
      color: colors.gray,
      fontSize: 12,
    },
  });
};
