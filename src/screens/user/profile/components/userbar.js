import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import assets from "src/assets";
import screen from "src/utils/screen";

const Userbar = ({}) => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <Shadow startColor={`rgba(180, 180, 180, 0.1)`}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={assets.appIcon}
            style={styles.imageSize}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Shadow>
      <Text style={styles.nameTitle}>Admin</Text>
    </View>
  );
};
export default Userbar;

const useStyle = () => {
  const { colors } = useTheme();
  const avatar_SIZE = screen.width / 4;
  return StyleSheet.create({
    container: {
      alignItems: "center",
      height: screen.width / 2,
      justifyContent: "center",
    },
    avatarContainer: {
      width: avatar_SIZE,
      height: avatar_SIZE,
      borderRadius: avatar_SIZE,
      backgroundColor: colors.white,
      justifyContent: "center",
      alignItems: "center",
    },
    imageSize: {
      width: avatar_SIZE / 2,
      height: avatar_SIZE / 2,
    },
    nameTitle: {
      fontWeight: "bold",
      marginTop: 10,
    },
    editButton: {
      fontWeight: "bold",
    },
  });
};
